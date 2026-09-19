from rest_framework import serializers

from .models import Post, Like, Comment


class PostSerializer(serializers.ModelSerializer):

    author_name = serializers.CharField(
        source="author.username",
        read_only=True
    )

    community_name = serializers.CharField(
        source="community.name",
        read_only=True
    )

    like_count = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()

    class Meta:
        model = Post

        fields = [
            "id",
            "community",
            "community_name",
            "author",
            "author_name",
            "content",
            "post_type",
            "image",
            "is_pinned",
            "like_count",
            "comment_count",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "author",
            "author_name",
            "community_name",
            "is_pinned",
            "like_count",
            "comment_count",
            "created_at",
            "updated_at",
            'community',
        ]

    def get_like_count(self, obj):
        return obj.likes.count()

    def get_comment_count(self, obj):
        return obj.comments.count()


class CommentSerializer(serializers.ModelSerializer):

    user_name = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:
        model = Comment

        fields = [
            "id",
            "post",
            "user",
            "user_name",
            "content",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "post",
            "user",
            "user_name",
            "created_at",
            "updated_at",
        ]