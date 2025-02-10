"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Posts, Medias, Comments, Followers, Characters, Planets
import requests
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body ['message']= "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    data=request.json
    email = data.get("email", None)
    password = data.get("password", None)
    row = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    if not row:
        response_body['message'] = 'User not found'
        return response_body, 401       
    user = row.serialize()
    claims = {'user_id': user['id'],
              'is_active': user['is_active']}
    access_token = create_access_token(identity=email, additional_claims=claims)
    response_body['access_token'] = access_token
    response_body['message'] = 'User logged'
    response_body['results'] = user
    return response_body, 200   


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    response_body = {}
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity() # El email
    additional_claims = get_jwt() # Los datos adicionales
    print(current_user)
    print(additional_claims)
    response_body['message'] = 'Token válido'
    return response_body, 200


@api.route('users/<int:id>', methods=['GET'])
@jwt_required()
def user_get(id):
    response_body = {}
    additional_claims = get_jwt()
    print(id)
    print('additional', additional_claims['user_id'])
    if id != additional_claims['user_id']:
        response_body['message'] = 'No tiene autorización para ver este perfil'
        return response_body, 401
    row = db.session.execute(db.select(Users).where(Users.id == id)).scalar()
    response_body['results'] = row.serialize()
    return response_body, 200


# CRUD de Instagram
@api.route('/users', methods=['GET'])
def users():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        result = [ row.serialize() for row in rows ]
        response_body['message'] = 'Listado de Usuarios'
        response_body['results'] = result
        return response_body, 200



@api.route('/posts', methods=['GET', 'POST'])
def posts():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars()
        result = [ row.serialize() for row in rows ]
        response_body['message'] = 'Listado de todas las publicaciones'  
        response_body['results'] = result  
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Posts(title=data.get('title'),
                    description=data.get('description'),
                    body=data.get('body'),
                    image_url=data.get('image_url'),
                    user_id=data.get('user_id'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method}'
        response_body['results'] = row.serialize       
        return response_body, 200
        

@api.route('/posts/<int:id>', methods=['GET','PUT', 'DELETE'])
def post(id):
    response_body = {}
    row = db.session.execute(db.select(Posts).where(Posts.id == id)).scalar()
    if not row:
        response_body['message'] = f'La publicación con id:{id} no existe en nuestro registro'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.title = data['title']
        row.description = data ['descriptcion']
        row.body = data['body']
        row.image_url = data['image_url']
        row.user_id = data['user_id']
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200
    

@api.route('/medias', methods=['GET', 'POST'])
def medias():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Medias)).scalars()
        list_medias = []
        for row in rows:
            list_medias.append(row.serialize())
        response_body['message'] = f'Respuesta desde el {request.method}'  
        response_body['results'] = list_medias  
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Medias(media_type=data.get('media_type'),
                    url=data.get('url'),
                    post_id=data.get('post_id'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method}'
        response_body['results'] = row.serialize  
        return response_body, 200


@api.route('/medias/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def media(id):
    response_body = {}
    row = db.session.execute(db.select(Medias).where(Medias.id == id)).scalar()
    if not row:
        response_body['message'] = f'El archivo media con id:{id} no existe en nuestro registro'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Respuesta desde el {request.method} para el id {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.media_type = data['data_type']
        row.url = data['url']
        row.post_id = data['post_id']
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200     


@api.route('/comments', methods=['GET', 'POST'])
def comments():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Comments)).scalars()
        list_comments = []
        for row in rows:
            list_comments.append(row.serialize())
        response_body['message'] = f'Respuesta desde el {request.method}'  
        response_body['results'] = list_comments  
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Comments(body=data.get('body'),
                       post_id=data.get('post_id'),
                       user_id=data.get('user_id'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method}'
        response_body['results'] = row.serialize     
        return response_body, 200
    

@api.route('/comments/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def comment(id):
    response_body = {}
    row = db.session.execute(db.select(Comments).where(Comments.id == id)).scalar()
    if not row:
        response_body['message'] = f'El comentario con id {id} no existe en nuestro registro'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.body = data['title']
        row.post_id = data['post_id']
        row.user_id = data['user_id']
        db.session.commit()
        response_body['message'] = f'respuesta desde el {request.method} para el comentario con el id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200        
    

@api.route('/followers', methods=['GET', 'POSTS'])
def followers():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Followers)).scalars()
        list_followers = []
        for row in rows:
            list_followers.append(row.serialize())
            response_body['message'] = f'Respuesta desde el {request.method}'  
            response_body['results'] = list_followers
            return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Followers(follower_id=data.get('follower_id'),
                        following_id=data.get('following_id'))
        db.session.ad(row)
        db.session.commit()
        return response_body, 200
    

@api.route('/followers/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def follower():
    response_body = {}
    row = db.session.execute(db.select(Followers).where(Followers.id == id)).scalar()
    if not row:
        response_body['message'] = f'El seguidor con el id:{id} no existe en nuestro registro'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'respuesta desde el {request.methor}para el id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.follower_id = data['follower_id']
        row.following_id = data['following_id']
        db.session.commit()
        response_body['message'] = f'Respuesta desdeel {request.method} para el id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200


# CRUD de Star Wars
@api.route('/characters', methods=['GET'])
def characters():
    response_body = {}
    rows = db.session.execute(db.select(Characters)).scalars()
    if not rows:
        url = 'https://swapi.tech/api/people/'
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            for row in data['results']:
                character_list= requests.get(row['url'])
                if character_list.status_code == 200:
                    character_data = character_list.json()
                    character_properties = character_data['result']['properties']
                    print(character_properties)
                    response_body['results'].append({ "name": character_properties.get('name'),
                                                    "height": character_properties.get('height'),
                                                    "mass": character_properties.get('mass'),
                                                    "hair_color": character_properties.get('hair_color'),
                                                    "skin_color": character_properties.get('skin_color'),
                                                    "eye_color": character_properties.get('eye_color'),
                                                    "birth_year": character_properties.get('birth_year'),
                                                    "gender": character_properties.get('gender')})
                    response_body['message'] = f'Datos obtenidos desde la API Star Wars'
                    return response_body, 200 
            response_body['message'] = f'Respuesta desde el {request.method}'
            response_body['results'] = character_data
    return response_body, 200


@api.route('/planets', methods=['GET'])
def planets():
     response_body = {}
     rows = db.session.execute(db.select(Planets)).scalars()
     if not rows:
         url = 'https://swapi.tech/api/planets/'
         respose = requests.get(url)
         if respose.status_code == 200:
            data = respose.json()
            for row in data['results']:
                planet_list = requests.get(row['url'])
                if planet_list.status_code == 200:
                    planet_data = planet_list.json()
                    planet_properties = planet_data['result']['properties']
                    response_body['results'].append({"name": planet_properties['name'],
                                                    "diameter": planet_properties['diameter'],
                                                    "rotation_period": planet_properties['rotation_period'],
                                                    "orbital_period": planet_properties['orbital_period'],
                                                    "gravity": planet_properties['gravity'],
                                                    "population": planet_properties['population'],
                                                    "climate": planet_properties['climate'],
                                                    "terrain": planet_properties['terrain']})
                    response_body['message'] = 'Datos de los planetas obtenidos de la API de STAR WARS'
                    return jsonify(response_body), 200
            response_body['message'] = f'Respuesta desde el {request.method}'
            response_body['results'] = planet_data
            return response_body, 200            
