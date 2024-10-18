from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated

# Local application imports (internal models, serializers, etc.)
from .models import Listing
from .serializers import ListingSerializer, ListingImageSerializer


class ListingCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Create the listing using the serializer
        serializer = ListingSerializer(data=request.data)
        
        if serializer.is_valid():
            # Assign the authenticated user to the listing
            serializer.save(user=request.user) 
            # Save listing to the database
            serializer.save()  
            return Response({ "message": "Listing created successfully.", "listing": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)