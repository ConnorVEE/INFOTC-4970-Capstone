from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import NotFound, ValidationError

# Local application imports (internal models, serializers, etc.)
from .models import Listing, Favorite
from .serializers import ListingSerializer, ListingImageSerializer, FavoriteSerializer


# Views for listing retrieval, addition, and viewing

class ListingCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Create the listing using the serializer
        serializer = ListingSerializer(data=request.data)
        
        if serializer.is_valid():
            # Assign the authenticated user to the listing
            serializer.save(user=request.user) 

            # Save listing to the database
            serializer.save()  
            return Response({ 
                "message": "Listing created successfully.", 
                "listing": serializer.data},
                status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class ListingListView(ListAPIView):
    """
    Retrieves all listings that are active and visible.
    """
    queryset = Listing.objects.order_by('-date_created')
    serializer_class = ListingSerializer
    permission_classes = [AllowAny]  # No authentication required to view listings


class ListingDetailView(RetrieveAPIView):
    """
    Retrieves a specific listing by ID.
    """
    queryset = Listing.objects
    serializer_class = ListingSerializer
    permission_classes = [AllowAny]  # No authentication required to view listings
    lookup_field = 'id'  # Use 'id' to look up the listing


class ListingImageUploadView(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can upload images
    parser_classes = [MultiPartParser, FormParser]  # Allow handling of file uploads

    def post(self, request):
        serializer = ListingImageSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()  # Save the image and update the associated listing
            return Response(
                {"message": "Image uploaded successfully.", "image": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Views for Bookmarking
class FavoriteListingView(APIView):

    permission_classes = [IsAuthenticated]

    # Bookmark a listing
    def post(self, request, id):

        try:
            listing = Listing.objects.get(id=id)
            
        except Listing.DoesNotExist:
            raise NotFound("Listing not found.")

        # Check if the favorite already exists
        if Favorite.objects.filter(user=request.user, listing=listing).exists():
            raise ValidationError("You have already favorited this listing.")

        # Create the favorite
        favorite = Favorite.objects.create(user=request.user, listing=listing)
        serializer = FavoriteSerializer(favorite)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Remove a bookmark
    def delete(self, request, id):

        try:
            listing = Listing.objects.get(id=id)

        except Listing.DoesNotExist:
            raise NotFound("Listing not found.")

        # Check if the favorite exists
        favorite = Favorite.objects.filter(user=request.user, listing=listing).first()
        if not favorite:
            raise NotFound("Favorite not found.")

        # Delete the favorite
        favorite.delete()
        return Response({"message": "Favorite removed successfully."}, status=status.HTTP_204_NO_CONTENT)