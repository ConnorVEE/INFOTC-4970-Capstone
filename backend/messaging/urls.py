# messaging/urls.py
from django.urls import path
from .views import ConversationView, MessageView

urlpatterns = [
    # URL for listing all conversations and creating a new one
    path('', ConversationView.as_view(), name='conversation-list'),
    
    # URL for listing all messages in a conversation
    path('<int:conversation_id>/messages/', MessageView.as_view(), name='conversation-messages')
]