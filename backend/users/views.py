# Third-party imports from installed packages
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

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

        except Exception as e:
            print(f"Invalid credentials for username: {request.data.get('username')}")
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        # Extract tokens
        refresh_token = serializer.validated_data.get('refresh')
        access_token = serializer.validated_data.get('access')

        # Create response
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


