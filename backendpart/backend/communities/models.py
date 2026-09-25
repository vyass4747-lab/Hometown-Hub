from django.db import models
from django.conf import settings


class Community(models.Model):

    CATEGORY_CHOICES = [
        ("city", "City"),
        ("village", "Village"),
    ]

    name = models.CharField(max_length=150)
    location = models.CharField(max_length=150)
    description = models.TextField(blank=True)

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES
    )

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="created_communities"
    )

    members = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="communities",
        blank=True
    )

    is_approved = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class JoinRequest(models.Model):

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="join_requests"
    )

    community = models.ForeignKey(
        Community,
        on_delete=models.CASCADE,
        related_name="join_requests"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "community")

    def __str__(self):
        return f"{self.user} → {self.community} ({self.status})"
