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
    category = models.CharField(max_length=100, blank=True, null=True)  
    
    def __str__(self):
        return self.title


class ListingImage(models.Model):
    listing = models.ForeignKey(Listing, related_name='images', on_delete=models.CASCADE)
    # Images will be stored in the media/listings folders
    image = models.ImageField(upload_to='listings/')  

    def __str__(self):
        return f"Image for {self.listing.title}"

