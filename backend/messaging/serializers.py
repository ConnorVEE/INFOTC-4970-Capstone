from rest_framework import serializers
from .models import Conversation, Message
from users.serializers import UserSerializer

class MessageSerializer(serializers.ModelSerializer):
    
    sender = UserSerializer(read_only=True)
    
    class Meta:
        model = Message
        fields = ['id', 'sender', 'content', 'date_created']
        read_only_fields = ['id', 'date_created']
        
class ConversationSerializer(serializers.ModelSerializer):
    
    participants = UserSerializer(many=True, read_only=True)
    messages = MessageSerializer(many=True, read_only=True)
    last_message = serializers.SerializerMethodField()
    
    class Meta:
        model = Conversation
        fields = ['id', 'participants', 'listing', 'messages', 'last_message', 'date_created']
        read_only_fields = ['id', 'date_created']
        
    def get_last_message(self, obj):
        last_message = obj.messages.order_by('-date_created').first()
        return MessageSerializer(last_message).data if last_message else None