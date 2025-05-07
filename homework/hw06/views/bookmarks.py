import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.bookmark import Bookmark
from models.post import Post
from views import get_authorized_user_ids
import flask_jwt_extended


class BookmarksListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user


    @flask_jwt_extended.jwt_required()
    def get(self):
        # get all bookmarks for the current user
        bookmarks = Bookmark.query.filter_by(user_id=self.current_user.id).all()
        data = [bookmark.to_dict() for bookmark in bookmarks]
        return Response(
            json.dumps(data),
            mimetype="application/json",
            status=200
        )
    
    @flask_jwt_extended.jwt_required()
    def post(self):
        body = request.get_json()
        if not body or 'post_id' not in body:
            return Response(
                json.dumps({'message': 'post_id is required'}),
                mimetype="application/json",
                status=400
            )

        try:
            post_id = int(body.get('post_id'))
        except:
            return Response(
                json.dumps({'message': 'post_id must be an integer'}),
                mimetype="application/json",
                status=400
            )

        # Check if post exists
        post = Post.query.get(post_id)
        if post is None:
            return Response(
                json.dumps({'message': 'Post not found'}),
                mimetype="application/json",
                status=404
            )

        # Check if user has access to the post
        authorized_ids = get_authorized_user_ids(self.current_user)
        if post.user_id not in authorized_ids:
            return Response(
                json.dumps({'message': 'Unauthorized to bookmark this post'}),
                mimetype="application/json",
                status=404
            )

        # Check for duplicate bookmarks
        existing = Bookmark.query.filter_by(user_id=self.current_user.id, post_id=post_id).first()
        if existing:
            return Response(
                json.dumps({'message': 'Bookmark already exists'}),
                mimetype="application/json",
                status=400
            )

        # Create the bookmark
        new_bookmark = Bookmark(user_id=self.current_user.id, post_id=post_id)
        db.session.add(new_bookmark)
        db.session.commit()

        return Response(
            json.dumps(new_bookmark.to_dict()),
            mimetype="application/json",
            status=201
        )


class BookmarkDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user


    @flask_jwt_extended.jwt_required()
    def delete(self, id):
        bookmark = Bookmark.query.get(id)
        if bookmark is None:
            return Response(
                json.dumps({"message": "Bookmark not found."}),
                mimetype="application/json",
                status=404
            )

        if bookmark.user_id != self.current_user.id:
            # Even though the bookmark exists, we pretend it doesn't for security:
            return Response(
                json.dumps({"message": "Bookmark not found."}),
                mimetype="application/json",
                status=404
            )

        try:
            db.session.delete(bookmark)
            db.session.commit()
            return Response(
                json.dumps({"message": "Bookmark deleted successfully."}),
                mimetype="application/json",
                status=200  # per assignment: use 200 for valid DELETE
            )
        except Exception as e:
            print("Error while deleting bookmark:", str(e))
            return Response(
                json.dumps({"message": "An unexpected error occurred."}),
                mimetype="application/json",
                status=500
            )



def initialize_routes(api, current_user):
    api.add_resource(
        BookmarksListEndpoint,
        "/api/bookmarks",
        "/api/bookmarks/",
        resource_class_kwargs={"current_user": current_user},
    )

    api.add_resource(
        BookmarkDetailEndpoint,
        "/api/bookmarks/<int:id>",
        "/api/bookmarks/<int:id>",
        resource_class_kwargs={"current_user": current_user},
    )
