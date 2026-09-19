from django.urls import path

from .views import (
    CommunityEventListCreateView,
    EventDetailView,
    JoinEventView,
)


urlpatterns = [

    path(
        "communities/<int:community_id>/events/",
        CommunityEventListCreateView.as_view(),
        name="community-events"
    ),

    path(
        "communities/<int:community_id>/events/<int:pk>/",
        EventDetailView.as_view(),
        name="event-detail"
    ),

    path(
        "events/<int:pk>/join/",
        JoinEventView.as_view(),
        name="event-join"
    ),
]