# from flask import Flask, send_from_directory
# import random

# app = Flask(__name__)

# # Path for our main Svelte page
# @app.route("/")
# def base():
#     return send_from_directory('client/public', 'index.html')

# # Path for all the static files (compiled JS/CSS, etc.)
# @app.route("/<path:path>")
# def home(path):
#     return send_from_directory('client/public', path)


# @app.route("/rand")
# def hello():
#     return str(random.randint(0, 100))


# if __name__ == "__main__":
#     app.run(debug=True)


from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
from main import getPrediction
from flask_cors import CORS

import os


app = Flask(__name__)
CORS(app)  # Enable CORS for your Flask app

UPLOAD_FOLDER = 'static'
app.secret_key = "secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@app.route('/static', methods=['POST', 'GET'])
def submit_file():
  if request.method == 'POST':
    if 'file' not in request.files:
      return jsonify({'message': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
      return jsonify({'message': 'No selected file'}), 400
    if file:
      filename = secure_filename(file.filename)
      file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
      full_filename = os.path.join(app.config['UPLOAD_FOLDER'], filename)
      label = getPrediction(filename)
      return jsonify({'message': label , 'image' : "/"+filename}), 200



if __name__=='__main__':
    port = int(os.environ.get('PORT', 5173))
    app.run(host='127.0.0.1', port=port, debug=True)
