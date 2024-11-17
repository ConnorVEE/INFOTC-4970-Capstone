from rest_framework import serializers
from .models import Listing, ListingImage
from rest_framework.exceptions import ValidationError

# Serializer for Images
class ListingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingImage
        fields = ['id', 'listing', 'image']
        read_only_fields = ['id']

    def validate(self, data):
        # Ensure the listing exists and belongs to the authenticated user (if required)
        listing = data.get('listing')

        if listing.status == 'INACTIVE':
            raise ValidationError("Cannot upload images to an inactive listing.")
        
        return data
    
# class ListingImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ListingImage
#         fields = ['id', 'listing', 'image']
#         read_only_fields = ['id']

# Serializer for entire Listing model
class ListingSerializer(serializers.ModelSerializer):
    images = ListingImageSerializer(many=True, read_only=True)

    class Meta:
        model = Listing
        fields = [
            'id', 'title', 'description', 'price', 'date_created', 
            'user', 'category', 'status', 'images'
        ]
        read_only_fields = ['id', 'date_created', 'user', 'status']