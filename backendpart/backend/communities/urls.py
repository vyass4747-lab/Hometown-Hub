from django.urls import path
from .views import CommunityListCreateView, CommunityDetailView, JoinCommunityView, ManageJoinRequestView


urlpatterns = [
    path("", CommunityListCreateView.as_view()),
    path("<int:pk>/", CommunityDetailView.as_view()),
    path("<int:pk>/join/", JoinCommunityView.as_view()),
    path(
        "join-requests/<int:pk>/",
        ManageJoinRequestView.as_view(),
    ),
]