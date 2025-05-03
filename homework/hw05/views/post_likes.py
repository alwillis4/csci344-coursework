import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.like_post import LikePost
from models.post import Post
from models.following import Following

class PostLikesListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def post(self):
        body = request.get_json()
        post_id = body.get("post_id")

        # Check if post exists
        post = Post.query.get(post_id)
        if not post:
            return Response(
                json.dumps({"message": "Post not found."}),
                mimetype="application/json",
                status=404,
            )

        # Check if user follows the post's author
        if post.user_id != self.current_user.id:
            follows = Following.query.filter_by(
                user_id=self.current_user.id,
                following_id=post.user_id
            ).first()
            if not follows:
                return Response(
                    json.dumps({"message": "Not authorized to like this post."}),
                    mimetype="application/json",
                    status=404,
                )

        # Check if like already exists
        existing_like = LikePost.query.filter_by(
            user_id=self.current_user.id,
            post_id=post_id
        ).first()

        if existing_like:
            return Response(
                json.dumps({"message": "Already liked this post."}),
                mimetype="application/json",
                status=400,
            )

        # Create new like
        new_like = LikePost(
            user_id=self.current_user.id,
            post_id=post_id
        )
        db.session.add(new_like)
        db.session.commit()

        return Response(
            json.dumps({
                "id": new_like.id,
                "user_id": new_like.user_id,
                "post_id": new_like.post_id,
            }),
            mimetype="application/json",
            status=201,
        )


class PostLikesDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def delete(self, id):
        # Check if like with given ID exists
        like = LikePost.query.get(id)
        if like is None:
            return Response(
                json.dumps({"message": "Like not found."}),
                mimetype="application/json",
                status=404,
            )

        # Check that the current user is the owner of the like
        if like.user_id != self.current_user.id:
            return Response(
                json.dumps({"message": "You do not have permission to delete this like."}),
                mimetype="application/json",
                status=404,
            )

        # All checks passed – delete like
        db.session.delete(like)
        db.session.commit()

        return Response(
            json.dumps({}),
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        PostLikesListEndpoint,
        "/api/likes",
        "/api/likes/",
        resource_class_kwargs={"current_user": current_user},
    )

    api.add_resource(
        PostLikesDetailEndpoint,
        "/api/likes/<int:id>",
        "/api/likes/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )
