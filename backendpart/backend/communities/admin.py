from django.contrib import admin
from .models import Community, JoinRequest


@admin.register(Community)
class CommunityAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "location",
        "category",
        "created_by",
        "is_approved",
        "created_at",
    )

    list_filter = (
        "is_approved",
        "category",
    )

    search_fields = (
        "name",
        "location",
        "created_by__username",
    )

    list_editable = (
        "is_approved",
    )


@admin.register(JoinRequest)
class JoinRequestAdmin(admin.ModelAdmin):

    list_display = (
        "user",
        "community",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
        "community",
    )

    search_fields = (
        "user__username",
        "community__name",
    )

    def save_model(self, request, obj, form, change):

        old_status = None

        if obj.pk:
            old_status = JoinRequest.objects.get(
                pk=obj.pk
            ).status

        super().save_model(
            request,
            obj,
            form,
            change
        )

        if obj.status == "approved" and old_status != "approved":

            obj.community.members.add(
                obj.user
            )

        elif obj.status == "rejected":

            obj.community.members.remove(
                obj.user
            )