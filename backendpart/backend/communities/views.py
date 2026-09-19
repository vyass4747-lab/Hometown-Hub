from rest_framework import generics, permissions, serializers
from rest_framework.response import Response
from rest_framework import status

from .models import Community, JoinRequest
from .serializers import CommunitySerializer, JoinRequestSerializer



class CommunityListCreateView(generics.ListCreateAPIView):
    serializer_class = CommunitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Community.objects.filter(is_approved=True)

    def perform_create(self, serializer):
        community = serializer.save(created_by=self.request.user)
        community.members.add(self.request.user)


class CommunityDetailView(generics.RetrieveAPIView):
    queryset = Community.objects.filter(is_approved=True)
    serializer_class = CommunitySerializer
    permission_classes = [permissions.IsAuthenticated]


class JoinCommunityView(generics.CreateAPIView):
    serializer_class = JoinRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        community = generics.get_object_or_404(
            Community,
            id=kwargs["pk"],
            is_approved=True
        )

        if community.members.filter(id=request.user.id).exists():
            return Response(
                {"detail": "You are already a member of this community."},
                status=status.HTTP_400_BAD_REQUEST
            )

        existing_request = JoinRequest.objects.filter(
            user=request.user,
            community=community
        ).first()

        if existing_request:
            return Response(
                {"detail": f"Join request already {existing_request.status}."},
                status=status.HTTP_400_BAD_REQUEST
            )

        join_request = JoinRequest.objects.create(
            user=request.user,
            community=community
        )

        serializer = self.get_serializer(join_request)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )



class ManageJoinRequestView(generics.UpdateAPIView):
    serializer_class = JoinRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return JoinRequest.objects.filter(
            community__created_by=self.request.user
        )

    def perform_update(self, serializer):
        join_request = serializer.instance
        new_status = self.request.data.get("status")

        if new_status not in ["approved", "rejected"]:
            raise serializers.ValidationError(
                {"status": "Status must be approved or rejected."}
            )

        serializer.save(status=new_status)

        if new_status == "approved":
            join_request.community.members.add(join_request.user)
