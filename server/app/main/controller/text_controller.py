from flask import request
from flask_restx import Resource, fields
import flask
from app.main.util.decorator import admin_token_required
from ..util.dto import Text
from ..service.user_service import save_new_user, get_all_users, get_a_user
from typing import Dict, Tuple
from app.main.service.text_helper import sql_store_text, sql_retrieve_text

api = Text.api


resource_fields = api.model('text', {
    'title': fields.String, 
    'textBody': fields.String,
})

@api.response(200, 'OK')
@api.response(400, 'Bad request')
@api.route('/<string:username>', methods=['POST', 'GET'])
class PostTextToServer(Resource):

    @api.expect(resource_fields)
    @api.doc(params={'username': 'Username'})
    def post(self, username):
        text = request.get_json(force=True)
        print(text, text["title"])
        sql_store_text(text["title"], username, text["textBody"], True) #title, username, textBody, private(?)
        return 200

   
@api.response(200, 'OK')
@api.response(400, 'Bad request')
@api.route('/<string:username>/<string:text_id>')
class GetTextFromServer(Resource):    

    @api.expect(resource_fields)
    @api.doc(params={'text_id': 'Text ID', 'username': 'Username'})
    def get(self, text_id, username):
        title, body = sql_retrieve_text(text_id, username)
        return flask.jsonify({'title': title,
        'textBody': body})
