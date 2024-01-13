import requests
from importlib import resources
from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)


class Disaster_Data(Resource):
    def get(self):

        # Get the disaster type from the user's request (e.g., as a query parameter)
        disaster_type = request.args.get('type')

        if disaster_type is None:
            return {'error': 'Please specify a disaster type.'}, 400
        
        valid_disaster_types = ['Wildfires', 'Volcanoes', 'Severe Storms']
        if disaster_type not in valid_disaster_types:
            return {
                'error': (
                    f'Invalid disaster type specified. Valid disaster types are the following: '
                    f'{", ".join(valid_disaster_types)}'
                )
            }, 400

        url = "https://eonet.gsfc.nasa.gov/api/v2.1/events"
        res = requests.request("GET", url)

        if res.status_code == 200:
            return res.json()['events']
        return {'error': 'Error making data request to NASA'}, 500


