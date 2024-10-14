from django.db import models
from users.models import User
from listings.models import Listing

class Conversation(models.Model):
    # Participants in the conversation
    participants = models.ManyToManyField(User, related_name='conversations')
    # Reference to Listing model
    listing = models.ForeignKey(Listing, related_name='conversations', on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Conversation for {self.listing.title}"
    
class Message(models.Model):
    # References to both conversation and user
    conversation = models.ForeignKey(Conversation, related_name='messages', on_delete=models.CASCADE)
    sender = models.ForeignKey(User, related_name='messages', on_delete=models.CASCADE)
    content = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Message from {self.sender.username} in {self.conversation}"