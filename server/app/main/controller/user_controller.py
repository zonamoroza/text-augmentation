from flask import request
from flask_restx import Resource
from app.main.util.decorator import token_required
from app.main.util.decorator import admin_token_required
from app.main.service.auth_helper import Auth
from ..util.dto import UserDto, AuthDto
from ..service.user_service import (
    get_all_following,
    save_new_user,
    get_all_users,
    get_a_user,
    update_user_details,
    delete_a_user,
    follow_a_user,
    get_all_following,
    get_newsfeed,
)
from typing import Dict, Tuple


api = UserDto.api
_user = UserDto.user
_update = UserDto.update
_follower = UserDto.follower


@api.route("/")
class UserList(Resource):
    @api.doc("list_of_registered_users")
    @admin_token_required
    @api.marshal_list_with(_user, envelope="data")
    def get(self):
        """List all registered users"""
        return get_all_users()

    @api.expect(_user, validate=True)
    @api.response(201, "User successfully created.")
    @api.doc("create a new user")
    def post(self) -> Tuple[Dict[str, str], int]:
        """Creates a new User """
        data = request.json
        return save_new_user(data=data)

    @api.doc("delete a user")
    @token_required
    @api.response(404, "User not found.")
    def delete(self):
        """Delete a user profile"""
        return delete_a_user()

    @api.doc("update a user")
    @token_required
    @api.expect(_update, validate=True)
    @api.response(404, "User not found.")
    def put(self):
        """Update a user name"""
        data = request.json
        return update_user_details(data=data)


@api.route("/<public_id>")
@api.param("public_id", "The User identifier")
@api.response(404, "User not found.")
class User(Resource):
    @api.doc("get a user")
    @api.marshal_with(_user)
    def get(self, public_id):
        """get a user given its identifier"""
        user = get_a_user(public_id)
        if not user:
            api.abort(404)
        else:
            return user


@api.route("/<username>/following")
@api.param("username", "My username")
@api.response(404, "User not found.")
class Follow(Resource):
    @api.expect(_follower, validate=True)
    @api.doc("follow a user")
    @token_required
    def patch(self, username):
        """follow another user"""
        data = request.json
        user_to_follow = data["user_to_follow"]
        return follow_a_user(username, user_to_follow)

    # GET /user/{username}/following
    @api.doc("users a user following")
    def get(self, username):
        """Get all users a user following"""
        return get_all_following(username)


# GET /user/{username}/newsfeed
@token_required
@api.route("/<username>/newsfeed")
@api.param("username", "My username")
@api.response(404, "User not found.")
class Newsfeed(Resource):
    @api.doc("newsfeed")
    def get(self, username):
        """List all titles"""
        return get_newsfeed(username)

