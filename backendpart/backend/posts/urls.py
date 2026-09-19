from django.urls import path

from .views import (
    CommunityPostListCreateView,
    PostDetailView,
    LikePostView,
    CommentListCreateView,
)


urlpatterns = [

    path(
        "communities/<int:community_id>/posts/",
        CommunityPostListCreateView.as_view(),
        name="community-posts"
    ),

    path(
        "communities/<int:community_id>/posts/<int:pk>/",
        PostDetailView.as_view(),
        name="post-detail"
    ),

    path(
        "posts/<int:pk>/like/",
        LikePostView.as_view(),
        name="post-like"
    ),

    path(
        "posts/<int:post_id>/comments/",
        CommentListCreateView.as_view(),
        name="post-comments"
    ),
]