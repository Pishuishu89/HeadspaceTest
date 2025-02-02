from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Connect to MongoDB (Replace with your MongoDB URL)
client = MongoClient("mongodb+srv://username:password@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority")
db = client["myDatabase"]
collection = db["sensorData"]

@app.route('/esp32', methods=['POST'])
def receive_data():
    data = request.json  # Get JSON data from ESP32
    collection.insert_one(data)  # Insert into MongoDB
    return jsonify({"message": "Data received"}), 200

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
