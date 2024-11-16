from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import ListAPIView, RetrieveAPIView

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
        


## Testing stuffs


# Listing Retrieval Views
class ListingListView(ListAPIView):
    """
    Retrieves all listings that are active and visible.
    """
    # , is_visible=False
    queryset = Listing.objects.filter(is_active=True).order_by('-date_created')
    serializer_class = ListingSerializer
    permission_classes = [AllowAny]  # No authentication required to view listings


class ListingDetailView(RetrieveAPIView):
    """
    Retrieves a specific listing by ID.
    """
    queryset = Listing.objects.filter(is_active=True, is_visible=True)
    serializer_class = ListingSerializer
    permission_classes = [AllowAny]  # No authentication required to view listings
    lookup_field = 'id'  # Use 'id' to look up the listing
