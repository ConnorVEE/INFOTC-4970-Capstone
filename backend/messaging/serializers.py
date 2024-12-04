from rest_framework import serializers
from .models import Conversation, Message
from users.serializers import UserSerializer
from listings.serializers import ListingSerializer
        
class ConversationSerializer(serializers.ModelSerializer):
    # Include listing and user details
    listing = ListingSerializer()
    participants = UserSerializer(many=True)
    last_message = serializers.SerializerMethodField()
    
    class Meta:
        model = Conversation
        fields = ['id', 'listing', 'participants', 'last_message', 'created_at']
        
    def get_last_message(self, obj):
        # Fetch most recent message from conversation
        last_message = obj.messages.order_by('-created_at').first()
        if last_message:
            return {
                'content': last_message.content,
                'sender': last_message.sender.username,
                'created_at': last_message.created_at
            }
        return None
class MessageSerializer(serializers.ModelSerializer):
    # Get the sender and receiver details
    sender = UserSerializer(read_only=True)
    recipient = UserSerializer(read_only=True)
    
    class Meta:
        model = Message
        fields = ['id', 'sender', 'recipient', 'content', 'created_at']
        read_only_fields = ['id', 'date_created']    