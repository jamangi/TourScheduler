#!/usr/bin/python3
'''
    This module contains the routes for the visitor service
'''
from flask import Flask, jsonify, request
from flask_cors import CORS

import models
from models import House

app = Flask(__name__)
app.url_map.strict_slashes = False
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True
cors = CORS(app, resources={r"/*": {"origins": "0.0.0.0"}})

@app.route('/')
def status():
    return jsonify({"status": "OK"})

@app.route('/houses')
def houses():
    """
        get all Houses
    """
    all_houses = models.storage.all()
    to_json = []
    for house in all_houses.values():
        to_json.append(house.to_dict())
    return jsonify(to_json)

@app.route('/count_houses')
def count_houses():
    """
        sum of all houses
    """
    count = models.storage.count()
    return jsonify({"count": count})

@app.route('/get_ip')
def get_ip():
    """
        return ip of user
    """
    pass

@app.route('/join_tour/<house_id>')
def join_tour(house_id):
    """
        ip joins a tour
    """
    pass

@app.route('/leave_tour<house_id>')
def leave_tour(house_id):
    """
        ip leaves a tour
    """
    pass


@app.after_request
def handle_cors(response):
    # allow access from other domains
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


if __name__ == "__main__":
    app.run(port=7000)