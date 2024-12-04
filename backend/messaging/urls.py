# messaging/urls.py
from django.urls import path
from .views import ConversationListView, ConversationMessageView, StartConversationView

urlpatterns = [
    # URL for listing all conversations and creating a new one
    path('', ConversationListView.as_view(), name='conversation-list-create'),
    
    # URL for listing all messages in a conversation and creating a new message
    path('<int:conversation_id>/messages/', ConversationMessageView.as_view(), name='conversation-messages'),
    
    # URL for starting a new conversation
    path('start/', StartConversationView.as_view(), name='start-conversation')
]