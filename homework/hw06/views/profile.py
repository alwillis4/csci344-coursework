import json

from flask import Response, request
from flask_restful import Resource
import flask_jwt_extended

def get_path():
    return request.host_url + "api/posts/"


class ProfileDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    @flask_jwt_extended.jwt_required()
    def get(self):

        # Create response dictionary

        return Response(
            json.dumps(self.current_user.to_dict()),
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        ProfileDetailEndpoint,
        "/api/profile",
        "/api/profile/",
        resource_class_kwargs={"current_user": current_user},
    )
