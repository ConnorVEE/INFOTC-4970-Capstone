from rest_framework import serializers
from .models import Conversation, Message
from users.serializers import UserSerializer

class MessageSerializer(serializers.ModelSerializer):
    
    # Get the sender and receiver details
    sender = UserSerializer(read_only=True)
    recipient = UserSerializer(read_only=True)
    
    class Meta:
        model = Message
        fields = ['id', 'sender', 'recipient', 'content', 'date_created']
        read_only_fields = ['id', 'date_created']
        
class ConversationSerializer(serializers.ModelSerializer):
    
    # Get the participants of the conversation
    participants = UserSerializer(many=True, read_only=True)
    # Get all messages included in the conversation
    messages = MessageSerializer(many=True, read_only=True)
    
    # Custom field, loads the last message into the conversation
    last_message = serializers.SerializerMethodField()
    
    # Method to get the last message
    def get_last_message(self, obj): 
        last_message = obj.messages.order_by('-date_created').first()
        return MessageSerializer(last_message).data if last_message else None
    
    class Meta:
        model = Conversation
        fields = ['id', 'participants', 'listing', 'messages', 'last_message', 'date_created']
        read_only_fields = ['id', 'date_created']    