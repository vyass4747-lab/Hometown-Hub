from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from .models import Post, Like, Comment
from .serializers import PostSerializer, CommentSerializer

from communities.models import Community


class CommunityPostListCreateView(generics.ListCreateAPIView):

    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        community = generics.get_object_or_404(
            Community,
            id=self.kwargs["community_id"],
            is_approved=True
        )

        if not community.members.filter(
            id=self.request.user.id
        ).exists():

            raise PermissionDenied(
                "You must be a member of this community."
            )

        return Post.objects.filter(
            community=community
        ).order_by("-is_pinned", "-created_at")

    def perform_create(self, serializer):

        community = generics.get_object_or_404(
            Community,
            id=self.kwargs["community_id"],
            is_approved=True
        )

        if not community.members.filter(
            id=self.request.user.id
        ).exists():

            raise PermissionDenied(
                "You must be a member of this community."
            )

        serializer.save(
            author=self.request.user,
            community=community
        )


class PostDetailView(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        community = generics.get_object_or_404(
            Community,
            id=self.kwargs["community_id"],
            is_approved=True
        )

        if not community.members.filter(
            id=self.request.user.id
        ).exists():

            raise PermissionDenied(
                "You must be a member of this community."
            )

        return Post.objects.filter(
            community=community
        )

    def perform_update(self, serializer):

        post = self.get_object()

        if post.author != self.request.user:
            raise PermissionDenied(
                "You can only edit your own posts."
            )

        serializer.save()

    def perform_destroy(self, instance):

        if instance.author != self.request.user:
            raise PermissionDenied(
                "You can only delete your own posts."
            )

        instance.delete()


class LikePostView(generics.GenericAPIView):

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):

        post = generics.get_object_or_404(
            Post,
            id=pk
        )

        if not post.community.members.filter(
            id=request.user.id
        ).exists():

            raise PermissionDenied(
                "You must be a community member."
            )

        like, created = Like.objects.get_or_create(
            user=request.user,
            post=post
        )

        if not created:

            like.delete()

            return Response({
                "liked": False,
                "like_count": post.likes.count()
            })

        return Response({
            "liked": True,
            "like_count": post.likes.count()
        })


class CommentListCreateView(generics.ListCreateAPIView):

    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        post = generics.get_object_or_404(
            Post,
            id=self.kwargs["post_id"]
        )

        if not post.community.members.filter(
            id=self.request.user.id
        ).exists():

            raise PermissionDenied(
                "You must be a member of this community."
            )

        return Comment.objects.filter(
            post=post
        ).order_by("created_at")

    def perform_create(self, serializer):

        post = generics.get_object_or_404(
            Post,
            id=self.kwargs["post_id"]
        )

        if not post.community.members.filter(
            id=self.request.user.id
        ).exists():

            raise PermissionDenied(
                "You must be a member of this community."
            )

        serializer.save(
            user=self.request.user,
            post=post
        )