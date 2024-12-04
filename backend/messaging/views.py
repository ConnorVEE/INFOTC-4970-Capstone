from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer
from listings.models import Listing

class ConversationListView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # List all conversations that the current user is a participant in
        conversations = Conversation.objects.filter(participants=request.user)
        serializer = ConversationSerializer(conversations, many=True)
        
        return Response(serializer.data)
    
    def post(self, request):
        # Retrieve listing ID and check to make sure it exists
        listing_id = request.data.get('listing')
        try:
            listing = Listing.objects.get(id=listing_id)
        except Listing.DoesNotExist:
            # Return 404 error if listing doesn't exist
            return Response({"error": "Listing not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if converation already exists
        existing_conversation = Conversation.objects.filter(
            listing=listing, participants=request.user
        ).filter(participants=listing.user).first()
        
        if existing_conversation:
            serializer = ConversationSerializer(existing_conversation)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # Create a new conversation
        conversation = Conversation.objects.create(listing=listing)
        conversation.participants.add(request.user, listing.user)
        serializer = ConversationSerializer(conversation)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class MessageView(APIView):
    permission_classes = [IsAuthenticated]
    
    # List all messages in the conversation
    def get(self, request, conversation_id):
        try:
            conversation = Conversation.objects.get(id=conversation_id, participants=request.user)
        except Conversation.DoesNotExist:
            return Response({"error": "Conversation not found"}, status=status.HTTP_404_NOT_FOUND)
        
        messages = conversation.messages.all()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
    
    # Create a new message in the conversation
    def post(self, request, conversation_id):
        try:
            conversation = Conversation.objects.get(id=conversation_id, participants=request.user)
        except Conversation.DoesNotExist:
            return Response({"error": "Conversation not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Query for recipient id, check to ensure recipient exists
        recipient = conversation.participants.exclude(id=request.user.id).first()
        if not recipient:
            return Response({"error": "Recipient not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = MessageSerializer(data=request.data)
        
        # Create the message
        if serializer.is_valid():
            serializer.save(sender=request.user, recipient=recipient, conversation=conversation)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)