from django.db import models
from django.conf import settings
from communities.models import Community


class Event(models.Model):

    community = models.ForeignKey(
        Community,
        on_delete=models.CASCADE,
        related_name="events"
    )

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="created_events"
    )

    title = models.CharField(max_length=200)

    description = models.TextField()

    location = models.CharField(max_length=255)

    start_time = models.DateTimeField()

    end_time = models.DateTimeField()

    attendees = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="joined_events",
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title