from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from .models import Event
from .serializers import EventSerializer

from communities.models import Community


class CommunityEventListCreateView(
    generics.ListCreateAPIView
):

    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        community = generics.get_object_or_404(
            Community,
            id=self.kwargs["community_id"],
            is_approved=True
        )

        # Only community members can view events
        if not community.members.filter(
            id=self.request.user.id
        ).exists():

            raise PermissionDenied(
                "You must be a member of this community."
            )

        return Event.objects.filter(
            community=community
        ).order_by("start_time")

    def perform_create(self, serializer):

        community = generics.get_object_or_404(
            Community,
            id=self.kwargs["community_id"],
            is_approved=True
        )

        # Only members can create events
        if not community.members.filter(
            id=self.request.user.id
        ).exists():

            raise PermissionDenied(
                "You must be a member of this community."
            )

        serializer.save(
            created_by=self.request.user,
            community=community
        )


class EventDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        community = generics.get_object_or_404(
            Community,
            id=self.kwargs["community_id"],
            is_approved=True
        )

        # Only community members can view event details
        if not community.members.filter(
            id=self.request.user.id
        ).exists():

            raise PermissionDenied(
                "You must be a member of this community."
            )

        return Event.objects.filter(
            community=community
        )

    def perform_update(self, serializer):

        event = self.get_object()

        if event.created_by != self.request.user:

            raise PermissionDenied(
                "You can only edit your own events."
            )

        serializer.save()

    def perform_destroy(self, instance):

        if instance.created_by != self.request.user:

            raise PermissionDenied(
                "You can only delete your own events."
            )

        instance.delete()


class JoinEventView(
    generics.GenericAPIView
):

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):

        event = generics.get_object_or_404(
            Event,
            id=pk
        )

        # User must belong to the community
        if not event.community.members.filter(
            id=request.user.id
        ).exists():

            raise PermissionDenied(
                "You must be a member of this community."
            )

        if event.attendees.filter(
            id=request.user.id
        ).exists():

            event.attendees.remove(request.user)

            return Response({
                "joined": False,
                "attendee_count": event.attendees.count()
            })

        event.attendees.add(request.user)

        return Response({
            "joined": True,
            "attendee_count": event.attendees.count()
        })