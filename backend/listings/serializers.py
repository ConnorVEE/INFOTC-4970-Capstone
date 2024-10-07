from rest_framework import serializers
from .models import Listing, ListingImage

from rest_framework import serializers
from .models import Listing, ListingImage

# Serializer for Images
class ListingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingImage
        fields = ['id', 'listing', 'image']
        read_only_fields = ['id']

# Serializer for entire Listing model
class ListingSerializer(serializers.ModelSerializer):
    # Associates images with a listing 
    images = ListingImageSerializer(many=True, read_only=True)

    class Meta:
        model = Listing
        fields = ['id', 'title', 'description', 'price', 'date_created', 'user', 'is_active', 'category', 'images']
        read_only_fields = ['id', 'date_created', 'user']
