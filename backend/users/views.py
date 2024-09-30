# Third-party imports from installed packages
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

# Local application imports (internal models, serializers, etc.)
from .models import User
from .serializers import RegistrationSerializer, UserSerializer

# Authentication and security imports
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])
@permission_classes([AllowAny])  # This allows unauthenticated users to access this view
def register_user(request):

    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)

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




