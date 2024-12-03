from rest_framework import serializers
from .models import Listing, ListingImage, Favorite
from rest_framework.exceptions import ValidationError

## HERE FOR TESTING/DEVELOPMENT
from django.conf import settings


# Serializer for Images
class ListingImageSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField() ## HERE FOR TESTING/DEVELOPMENT

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
    

    ## HERE FOR TESTING/DEVELOPMENT
    def get_image(self, obj):
        # Return the full URL for the image
        return f"{settings.MEDIA_URL}{obj.image}"  # This adds '/media/' to the image path


# Serializer for entire Listing model
class ListingSerializer(serializers.ModelSerializer):
    images = ListingImageSerializer(many=True, read_only=True)
    is_favorited = serializers.SerializerMethodField() 

    class Meta:
        model = Listing
        fields = [
            'id', 'title', 'description', 'price', 'date_created', 
            'user', 'category', 'status', 'images', 'is_favorited'
        ]
        read_only_fields = ['id', 'date_created', 'user', 'status']

    def get_is_favorited(self, obj):
        # Check if the current user has favorited the listing
        user = self.context['request'].user
        if user.is_authenticated:
            return Favorite.objects.filter(user=user, listing=obj).exists()
        return False


# Serializer for bookmarking/favoriting
class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ['id', 'user', 'listing', 'created_at']
        read_only_fields = ['id', 'created_at']