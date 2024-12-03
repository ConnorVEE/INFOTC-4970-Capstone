from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import ListingImage

@receiver(post_save, sender=ListingImage)
def update_listing_status(sender, instance, created, **kwargs):
    """
    Updates the status of the listing when new images are added.
    """
    if created:  # Only run logic for newly created images
        listing = instance.listing
        if listing.images.count() >= 2 and listing.status == 'PENDING':
            listing.status = 'ACTIVE'
            listing.save(update_fields=['status'])
