from django.urls import path
from .views import ListingCreateView, ListingListView, ListingDetailView

urlpatterns = [
    path('all/', ListingListView.as_view(), name='listings-list'),  # Retrieve all listings
    path('<int:id>/', ListingDetailView.as_view(), name='listing-detail'),  # Retrieve a specific listing
    path('create/', ListingCreateView.as_view(), name='listing-create'),  # Create a new listing
]

