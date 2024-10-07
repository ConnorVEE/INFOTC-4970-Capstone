from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

# Local application imports (internal models, serializers, etc.)
from .models import Listing
from .serializers import ListingSerializer, ListingImageSerializer


class ListingCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Assign the authenticated user to the listing
        data = request.data.copy()
        data['user'] = request.user.id 
        
        # Create the listing using the serializer
        serializer = ListingSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()  # Save listing to the database
            return Response({ "message": "Listing created successfully.", "listing": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)