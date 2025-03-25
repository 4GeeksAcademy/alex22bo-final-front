"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Posts, Medias, Comments, Followers, Characters, Planets, PlanetsFavorites, CharacterFavorites
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
@api.route('/login', methods=['POST'])
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


@api.route("/signup", methods=['POST'])
def signup():
    response_body = {}
    data = request.json
    email = data.get("email")
    first_name = data.get("first_name")    
    password = data.get("password")

    if not email or not password:
        response_body['message'] = 'Email or password are required'
        return response_body, 400
    
    user_register = db.session.execute(db.select(Users).where(Users.email == email)).scalar()
    if user_register:
        response_body["message"] = "User alredy exists"
        return response_body, 400
    
    row = Users(email=data.get('email'),
                password=data.get('password'),
                first_name=data.get('first_name'),
                is_active=True)
    db.session.add(row)
    db.session.commit()
    user = row.serialize()
    claims = {"user_id": user["id"],
              "first_name": user["first_name"],
              "is_active": user["is_active"]}
    access_token = create_access_token(identity=email, additional_claims=claims)
    response_body["access_token"] = access_token
    response_body["message"] = "User register"
    response_body["results"] = user
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
    rows = db.session.execute(db.select(Characters)).scalars().all()
    if rows:
        response_body['message'] = 'Datos obtenidos desde la base de datos'
        response_body['results'] = [row.serialize() for row in rows]
        return response_body, 200
    response_body['results'] = []
    url = 'https://swapi.tech/api/people'
    response = requests.get(url)
    if response.status_code != 200:
            response_body['message'] = 'Error al conectar con la API externa de Star Wars'
            return response_body, 500
    data = response.json()
    for row in data['results']:
        character_list = requests.get(row['url'])
        if character_list.status_code == 200:
            character_data = character_list.json()
            character_properties = character_data['result']['properties']
            character = Characters(name = character_properties.get('name'),
                					height = character_properties.get('height'),
               						mass = character_properties.get('mass'),
                					hair_color = character_properties.get('hair_color'),
                					skin_color = character_properties.get('skin_color'),
                					eye_color = character_properties.get('eye_color'),
                					birth_year = character_properties.get('birth_year'),
                					gender = character_properties.get('gender')
            						)
            db.session.add(character)
            db.session.commit()
            response_body['results'].append(character.serialize())            
    response_body['message'] = 'Datos obtenidos desde la API Star Wars'
    return response_body, 200


@api.route('/character/<int:character_id>', methods=['GET'])
def character(character_id):
    response_body = {}
    row = db.session.execute(db.select(Characters).where(Characters.id == character_id)).scalar()
    if row:
        response_body['message'] = 'Personaje obtenido desde la base de datos'
        response_body['results'] = row.serialize()
        return response_body, 200
    url = f'https://www.swapi.tech/api/people/{character_id}'
    response = requests.get(url)
    if response.status_code != 200:
        response_body['message'] = f'Personaje con ID {character_id} no encontrado'
        return response_body, 404
    character_data = response.json()
    properties = character_data['result']['properties']
    new_character = Characters(id=character_id,
        						name=properties.get('name'),
        						height=properties.get('height'),
        						mass=properties.get('mass'),
        						hair_color=properties.get('hair_color'),
        						skin_color=properties.get('skin_color'),
        						eye_color=properties.get('eye_color'),
        						birth_year=properties.get('birth_year'),
        						gender=properties.get('gender')
    							)
    db.session.add(new_character)
    db.session.commit()
    response_body['message'] = 'Personaje obtenido desde la API y guardado en la base de datos'
    response_body['results'] = new_character.serialize()
    return response_body, 200
    

@api.route('/planets', methods=['GET'])
def planets():
    response_body = {}
    rows = db.session.execute(db.select(Planets)).scalars().all()
    if rows:
        response_body['message'] = 'Datos obtenidos desde la base de datos'
        response_body['results'] = [row.serialize() for row in rows]
        return response_body, 200    
    response_body['results'] = []
    url = 'https://swapi.tech/api/planets'
    response = requests.get(url)
    if response.status_code != 200:
        response_body['message'] = 'Error al conectar con la API de Star Wars'
        return response_body, 500
    data = response.json()
    for row in data['results']:
        planet_list = requests.get(row['url'])
        if planet_list.status_code == 200:
            planet_data = planet_list.json()
            planet_properties = planet_data['result']['properties']
            planet = Planets(name = planet_properties.get('name'),
               				diameter = planet_properties.get('diameter'),
               				rotation_period = planet_properties.get('rotation_period'),
               				orbital_period = planet_properties.get('orbital_period'),
               				gravity = planet_properties.get('gravity'),
               				population = planet_properties.get('population'),
               				climate = planet_properties.get('climate'),
               				terrain = planet_properties.get('terrain')
							)
            db.session.add(planet)
            db.session.commit()
            response_body['results'].append(planet.serialize())
    response_body['message'] = 'Datos obtenidos desde la API Star Wars'
    return response_body, 200
    

@api.route('/planet/<int:planet_id>', methods=['GET'])
def planet(planet_id):
    response_body = {}
    row = db.session.execute(db.select(Planets).where(Planets.id == planet_id)).scalar()
    if row:
        response_body['message'] = 'Personaje obtenido desde la base de datos'
        response_body['results'] = row.serialize()
        return response_body, 200
    url = f'https://www.swapi.tech/api/people/{planet_id}'
    response = requests.get(url)
    if response.status_code != 200:
        response_body['message'] = f'Planeta con ID {planet_id} no encontrado'
        return response_body, 404
    planet_data = response.json()
    properties = planet_data['result']['properties']
    new_planet = Planets(id=planet_id,
        				name = properties.get('name'),
        				diameter = properties.get('diameter'),
        				rotation_period = properties.get('rotation_period'),
        				orbital_period = properties.get('orbital_period'),
        				gravity = properties.get('gravity'),
        				population = properties.get('population'),
        				climate = properties.get('climate'),
        				terrain = properties.get('terrain')
    					)
    db.session.add(new_planet)
    db.session.commit()
    response_body['message'] = 'Planeta obtenido desde la API y guardado en la base de datos'
    response_body['results'] = new_planet.serialize()
    return response_body, 200


# Favoritos
@api.route('/user/<int:user_id>/favorites', methods=['GET'])
def get_user_favorites(user_id):
    response_body = {}
    user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
    if not user:
        response_body["message"] = f"Usuario con ID {user_id} no encontrado"
        return response_body, 404
    character_favs = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.user_id == user_id)).scalars().all()
    planet_favs = db.session.execute(db.select(PlanetsFavorites).where(PlanetsFavorites.user_id == user_id)).scalars().all()
    response_body["message"] = f"Favoritos del usuario con ID {user_id}"
    response_body["results"] = {"characters": [fav.serialize() for fav in character_favs],
        						"planets": [fav.serialize() for fav in planet_favs]
    							}
    return response_body, 200
    

@api.route('/user/<int:user_id>/favorite/planet/<int:planet_id>', methods=['POST'])
def add_favorite_planet(user_id, planet_id):
    response_body = {}
    user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
    planet = db.session.execute(db.select(Planets).where(Planets.id == planet_id)).scalar()
    if not user or not planet:
        response_body["message"] = "Usuario o planeta no encontrado"
        return response_body, 404
    favorite = PlanetsFavorites(user_id=user_id, planet_id=planet_id)
    db.session.add(favorite)
    db.session.commit()
    response_body["message"] = "Planeta añadido a favoritos"
    response_body["results"] = favorite.serialize()
    return response_body, 201
    

@api.route('/user/<int:user_id>/favorite/people/<int:people_id>', methods=['POST'])
def add_favorite_people(user_id, people_id):
    response_body = {}
    user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
    character = db.session.execute(db.select(Characters).where(Characters.id == people_id)).scalar()
    if not user or not character:
        response_body["message"] = "Usuario o personaje no encontrado"
        return response_body, 404
    favorite = CharacterFavorites(user_id=user_id, character_id=people_id)
    db.session.add(favorite)
    db.session.commit()
    response_body["message"] = "Personaje añadido a favoritos"
    response_body["results"] = favorite.serialize()
    return response_body, 201


@api.route('/user/<int:user_id>/favorite/<int:favorite_id>/planet', methods=['DELETE'])
def delete_favorite_planet(user_id, favorite_id):
    response_body = {}
    favorite = db.session.execute(
        db.select(PlanetsFavorites).where(PlanetsFavorites.id == favorite_id)).scalar()
    if not favorite:
        response_body["message"] = f"Favorito con ID {favorite_id} no encontrado"
        return response_body, 404
    if favorite.user_id != user_id:
        response_body["message"] = f"El favorito con ID {favorite_id} no pertenece al usuario con ID {user_id}"
        return response_body, 403
    db.session.delete(favorite)
    db.session.commit()
    response_body["message"] = f"Favorito con ID {favorite_id} eliminado correctamente"
    return response_body, 200


@api.route('/user/<int:user_id>/favorite/<int:favorite_id>/people', methods=['DELETE'])
def delete_favorite_character(user_id, favorite_id):
    response_body = {}
    favorite = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.id == favorite_id)).scalar()
    if not favorite:
        response_body["message"] = f"Favorito con ID {favorite_id} no encontrado"
        return response_body, 404
    if favorite.user_id != user_id:
        response_body["message"] = f"El favorito con ID {favorite_id} no pertenece al usuario con ID {user_id}"
        return response_body, 403
    db.session.delete(favorite)
    db.session.commit()
    response_body["message"] = f"Favorito con ID {favorite_id} eliminado correctamente"
    return response_body, 200