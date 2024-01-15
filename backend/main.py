from flask import Flask
from flask_restful import Api
from flask_cors import CORS 
from api.routes.disaster_routes import Disaster_Data
from api.routes.ai_routes import Research_Disaster

app = Flask(__name__)
CORS(app) 
api = Api(app)

@app.route("/", defaults={'path':''})
def home(path):
    return {"info": "Hello World!"}

api.add_resource(Disaster_Data, '/disasters')
api.add_resource(Research_Disaster, '/research')

if __name__ == "__main__":
    app.run(debug=True,port=6060)