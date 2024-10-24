# Third-party imports from installed packages
from rest_framework import status, serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

# Local application imports (internal models, serializers, etc.)
from .models import User
from .serializers import RegistrationSerializer, UserSerializer, CustomTokenObtainPairSerializer


@api_view(['POST'])
@permission_classes([AllowAny])  # This allows unauthenticated users to access this view
def register_user(request):

    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


# Views handling login, giving tokens to users, and aquiring tokens upon page/app refresh
class CustomTokenObtainPairView(TokenObtainPairView):

    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        # Print debug info to confirm incoming username/password
        print(f"Login attempt for username: {request.data.get('username')}")

        try:
            serializer.is_valid(raise_exception=True)

        except serializers.ValidationError as e:
            # If the error is due to invalid credentials, return 401
            if "non_field_errors" in e.detail:
                print(f"Invalid credentials for username: {request.data.get('username')}")
                return Response({"error": "Invalid username or password."}, status=status.HTTP_401_UNAUTHORIZED)

            # Handle other validation errors with 400
            print(f"Validation error: {e.detail}")
            return Response({"error": "Validation error", "details": e.detail}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # Handle any unexpected errors
            print(f"Unexpected error: {str(e)}")
            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        refresh_token = serializer.validated_data.get('refresh')
        access_token = serializer.validated_data.get('access')

        response = Response({
            'success': 'Login successful'
        }, status = status.HTTP_200_OK)

        # Set tokens as HttpOnly cookies
        response.set_cookie(
            key = 'access_token',
            value = access_token,
            httponly = True,
            secure = False,  # Set this to False in development but True in production
            samesite = 'Lax',
        )

        response.set_cookie(
            key = 'refresh_token',
            value = refresh_token,
            httponly = True,
            secure = False,  # Set this to False in development but True in production
            samesite = 'Lax',
        )

        return response

# Handles token refresh
class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # Get the refresh token from cookies
        refresh_token = request.COOKIES.get('refresh_token')
        
        if not refresh_token:
            return Response({"error": "No refresh token found in cookies"}, status=400)

        # Inject the token into the request data so that the serializer can process it
        request.data['refresh'] = refresh_token

        # Now process the request as usual
        try:
            return super().post(request, *args, **kwargs)
        except (TokenError, InvalidToken) as e:
            return Response({"error": "Invalid or expired refresh token"}, status=400)
