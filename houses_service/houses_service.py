#!/usr/bin/python3
'''
    This module contains the routes for the visitor service
'''
from datetime import datetime
from flask import Flask, jsonify, request, abort
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
    ip = {"ip": request.remote_addr}

    return jsonify(ip)

@app.route('/join_tour/<house_id>/<time>')
def join_tour(house_id, time):
    """
        ip joins a tour
    """
    try:
        test = datetime.strptime(time, "%Y-%m-%dT%H:%M:%S")
    except Exception as e:
        print(e)
        abort(400, "date time format: %Y-%m-%dT%H:%M:%S")
    ip = request.remote_addr
    res = {"time": models.storage.join_tour(house_id, time, ip)}
    if res["time"] is not None:
        models.storage.save()
        return jsonify(res)
    else:
        return jsonify({"error": "house not found"})

@app.route('/leave_tour/<house_id>/<time>')
def leave_tour(house_id, time):
    """
        ip leaves a tour
    """
    try:
        test = datetime.strptime(time, "%Y-%m-%dT%H:%M:%S")
    except:
        abort(400, "date time format: %Y-%m-%dT%H:%M:%S")
    ip = request.remote_addr
    res = {"time": models.storage.leave_tour(house_id, time, ip)}
    if res["time"] is not None:
        models.storage.save()
        return jsonify(res)
    else:
        return jsonify({"error": "house or schedule not found"})


@app.after_request
def handle_cors(response):
    # allow access from other domains
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


if __name__ == "__main__":
    app.run(port=7000, threaded=True)