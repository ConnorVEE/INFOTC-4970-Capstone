from django.db import models
from users.models import User 

class Listing(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    date_created = models.DateTimeField(auto_now_add=True)
    # Reference to User model 
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    is_active = models.BooleanField(default=True)
    # Determines whether a listing is allowed to be viewed or not. i.e. does it have at least two 
    # images associated with it
    is_visible = models.BooleanField(default=False)
    category = models.CharField(max_length=100, blank=True, null=True)  
    
    def __str__(self):
        return self.title


class ListingImage(models.Model):
    listing = models.ForeignKey(Listing, related_name='images', on_delete=models.CASCADE)
    # Images will be stored in the media/listings folders
    image = models.ImageField(upload_to='listings/')

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        
        # Check the number of images associated with the listing.
        # Set to true if there are at least two
        if self.listing.images.count() >= 2:
            self.listing.is_visible = True
            self.listing.save(update_fields=['is_visible'])  

    def __str__(self):
        return f"Image for {self.listing.title}"

