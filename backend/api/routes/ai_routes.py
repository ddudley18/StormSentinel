from importlib import resources
from flask import Flask, request
from flask_restful import Resource, Api
from ..services.research_agent import research_tool

app = Flask(__name__)
api = Api(app)


class Research_Disaster(Resource):
    def get(self):

        # Get the disaster type from the user's request (e.g., as a query parameter)
        disaster_title = request.args.get('disaster_title')

        if disaster_title is None:
            return {'error': 'No disaster title provided.'}, 400
        
        output, thread_id = research_tool(disaster_title, None)
        
        return {'body': output, 'thread_id': thread_id}, 200
