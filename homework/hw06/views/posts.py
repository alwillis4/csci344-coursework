import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.post import Post
from views import get_authorized_user_ids
import flask_jwt_extended

def get_path():
    return request.host_url + "api/posts/"


class PostListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user


    @flask_jwt_extended.jwt_required()
    def get(self):


        '''
        Return the first 20 post in the users feed
        If the users specifies a limit, honor the last
        unless it's above 50
         then return error
        '''
        count = request.args.get("limit")
        if count is None:
            count = 20
        print(count)
        try:
            count = int(count)
        except:
            # user passed a string into
            return Response(json.dumps({"message": " Limit must be and integer"}), 
            mimetype="application/json", 
            status=400)
        if count > 50 or count < 0:
            return Response(json.dumps({"message": " count must between 0 and 50"}), 
            mimetype="application/json", 
            status=400)

        # giving you the beginnings of this code (as this one is a little tricky for beginners):
        ids_for_me_and_my_friends = get_authorized_user_ids(self.current_user)
        # [3, 7, 8, 10, 12]
        posts = (
          Post.query
         .filter(Post.user_id.in_(ids_for_me_and_my_friends))
         .limit(count)
        )
        # TODO: add the ability to handle the "limit" query parameter:

        
        data = [item.to_dict(user=self.current_user) for item in posts.all()]
        return Response(json.dumps(data), 
            mimetype="application/json", 
            status=200)
    @flask_jwt_extended.jwt_required()
    def post(self):
        body = request.get_json()

        if not body:
            return Response(
                json.dumps({"message": "Request body must be JSON."}),
                mimetype="application/json",
                status=400
            )

        image_url = body.get('image_url')
        caption = body.get('caption')
        alt_text = body.get('alt_text')

        if not image_url:
            return Response(
                json.dumps({"message": "image_url is required."}),
                mimetype="application/json",
                status=400
            )

        try:
            post = Post(
                user_id=self.current_user.id,
                image_url=image_url,
                caption=caption,
                alt_text=alt_text
            )
            db.session.add(post)
            db.session.commit()

            return Response(
                json.dumps(post.to_dict(user=self.current_user)),
                mimetype="application/json",
                status=201
            )
        except Exception as e:
            print("Error while creating post:", str(e))
            return Response(
                json.dumps({"message": "An unexpected error occurred."}),
                mimetype="application/json",
                status=500
            )


class PostDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    @flask_jwt_extended.jwt_required()
    def get(self, id):
        post = Post.query.get(id)
        if post is None:
            return Response(
                json.dumps({"message": "Post not found."}),
                mimetype="application/json",
                status=404
            )

        if post.user_id not in get_authorized_user_ids(self.current_user):
            return Response(
                json.dumps({"message": "Unauthorized access."}),
                mimetype="application/json",
                status=404
            )

        return Response(
            json.dumps(post.to_dict(user=self.current_user)),
            mimetype="application/json",
            status=200
        )
    @flask_jwt_extended.jwt_required()
    def patch(self, id):
        post = Post.query.get(id)
        if post is None:
            return Response(
                json.dumps({"message": "Post not found."}),
                mimetype="application/json",
                status=404
            )

        if post.user_id != self.current_user.id:
            return Response(
                json.dumps({"message": "Unauthorized access."}),
                mimetype="application/json",
                status=404
            )

        body = request.get_json()
        if body is None:
            return Response(
                json.dumps({"message": "Request body must be JSON."}),
                mimetype="application/json",
                status=400
            )

        caption = body.get('caption')
        alt_text = body.get('alt_text')
        image_url = body.get('image_url')

        if caption is not None:
            post.caption = caption
        if alt_text is not None:
            post.alt_text = alt_text
        if image_url is not None:
            post.image_url = image_url

        # try:
        db.session.commit()
        return Response(
            json.dumps(post.to_dict(user=self.current_user)),
            mimetype="application/json",
            status=200
        )
        # except Exception as e:
        #     print("Error while updating post:", str(e))
        #     return Response(
        #         json.dumps({"message": "An unexpected error occurred."}),
        #         mimetype="application/json",
        #         status=500
        #     )
    @flask_jwt_extended.jwt_required()
    def delete(self, id):
        post = Post.query.get(id)
        if post is None:
            return Response(
                json.dumps({"message": "Post not found."}),
                mimetype="application/json",
                status=404
            )

        if post.user_id != self.current_user.id:
            return Response(
                json.dumps({"message": "Unauthorized access."}),
                mimetype="application/json",
                status=404
            )

        db.session.delete(post)
        db.session.commit()
        return Response(
            json.dumps({"message": "Post deleted successfully."}),
            mimetype="application/json",
            status=200
        )


def initialize_routes(api, current_user):
    api.add_resource(
        PostListEndpoint,
        "/api/posts",
        "/api/posts/",
        resource_class_kwargs={"current_user": current_user},
    )
    api.add_resource(
        PostDetailEndpoint,
        "/api/posts/<int:id>",
        "/api/posts/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )