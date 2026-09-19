from rest_framework import serializers
from .models import Community, JoinRequest


class CommunitySerializer(serializers.ModelSerializer):
    member_count = serializers.SerializerMethodField()

    class Meta:
        model = Community
        fields = [
            "id",
            "name",
            "location",
            "description",
            "category",
            "created_by",
            "member_count",
            "is_approved",
            "created_at",
        ]

        read_only_fields = [
            "created_by",
            "member_count",
            "is_approved",
            "created_at",
        ]

    def get_member_count(self, obj):
        return obj.members.count()


class JoinRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = JoinRequest
        fields = [
            "id",
            "user",
            "community",
            "status",
            "created_at",
        ]

        read_only_fields = [
            "user",
            "status",
            "created_at",
        ]