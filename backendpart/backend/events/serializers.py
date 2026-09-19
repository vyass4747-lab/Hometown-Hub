from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):

    creator_name = serializers.CharField(
        source="created_by.username",
        read_only=True
    )

    community_name = serializers.CharField(
        source="community.name",
        read_only=True
    )

    attendee_count = serializers.SerializerMethodField()

    class Meta:
        model = Event

        fields = [
            "id",
            "community",
            "community_name",
            "created_by",
            "creator_name",
            "title",
            "description",
            "location",
            "start_time",
            "end_time",
            "attendee_count",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "community",          # ← THIS IS THE IMPORTANT LINE
            "created_by",
            "creator_name",
            "community_name",
            "attendee_count",
            "created_at",
            "updated_at",
        ]

    def get_attendee_count(self, obj):
        return obj.attendees.count()