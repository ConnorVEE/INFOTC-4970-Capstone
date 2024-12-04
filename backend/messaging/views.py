from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from users.models import User
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
        listing_id = request.data.get('listing')
        try:
            listing = Listing.objects.get(id=listing_id)
        except Listing.DoesNotExist:
            return Response({"error": "Listing not found"}, status=status.HTTP_404_NOT_FOUND)

        existing_conversation = Conversation.objects.filter(
            listing=listing, participants=request.user
        ).first()
        if existing_conversation:
            serializer = ConversationSerializer(existing_conversation)
            return Response(serializer.data, status=status.HTTP_200_OK)

        conversation = Conversation.objects.create(listing=listing)
        conversation.participants.add(request.user, listing.user)
        serializer = ConversationSerializer(conversation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class StartConversationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        username = request.data.get('username')
        title = request.data.get('title', '')
        content = request.data.get('content')

        if not username or not content:
            return Response({"error": "Username and content are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            recipient = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"error": "Recipient not found."}, status=status.HTTP_404_NOT_FOUND)

        # Check if a conversation already exists
        conversation = Conversation.objects.filter(participants=request.user).filter(participants=recipient).first()

        if not conversation:
            # Create a new conversation
            conversation = Conversation.objects.create(listing=None)
            conversation.participants.add(request.user, recipient)

        # Create the message
        message = Message.objects.create(
            conversation=conversation,
            sender=request.user,
            recipient=recipient,
            content=content,
        )

        return Response(
            {"conversation_id": conversation.id, "message_id": message.id},
            status=status.HTTP_201_CREATED
        )

class ConversationMessageView(APIView):
    permission_classes = [IsAuthenticated]
    
    # List all messages in the conversation
    def get(self, request, conversation_id):
        try:
            conversation = Conversation.objects.get(id=conversation_id, participants=request.user)
        except Conversation.DoesNotExist:
            return Response({"error": "Conversation not found"}, status=status.HTTP_404_NOT_FOUND)
        
        messages = Message.objects.filter(conversation=conversation).order_by('date_created') # retrieve all messages ordered by most recent
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