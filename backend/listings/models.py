from django.db import models
from users.models import User 
from django.db.models.signals import post_save

STATUS_CHOICES = [
    ('ACTIVE', 'Active'),            
    ('INACTIVE', 'Inactive'),        
    ('PENDING', 'Pending Approval'), 
    ('EXPIRED', 'Expired'),          
]

# Basic Listing model
class Listing(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    date_created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    category = models.CharField(max_length=100, blank=True, null=True)  
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    
    def __str__(self):
        return self.title

# Images model
class ListingImage(models.Model):
    listing = models.ForeignKey(Listing, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='listings/')

    def __str__(self):
        return f"Image for {self.listing.title}"

def update_listing_status(sender, instance, **kwargs):
    listing = instance.listing
    
    if listing.images.count() >= 2 and listing.status == 'PENDING':
        listing.status = 'ACTIVE'
        listing.save(update_fields=['status'])

post_save.connect(update_listing_status, sender=ListingImage)

# Bookmarking model
class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="favorites")
    listing = models.ForeignKey('Listing', on_delete=models.CASCADE, related_name="favorited_by")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'listing')  # Prevent duplicate favorites for the same user-listing pair
        ordering = ['-created_at']  # Newest favorites first

    def __str__(self):
        return f"{self.user.username} favorited {self.listing.title}"

