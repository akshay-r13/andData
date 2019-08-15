import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

# import our OCR function
from ocr_core import ocr_core

# define a folder to store and later serve the images
UPLOAD_FOLDER = '/static/uploads/'

# allow files of a specific type
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

app = Flask(__name__)
CORS(app)

# function to check the file extension
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# route and function to handle the home page
@app.route('/')
def home_page():
    return "Hello"

# route and function to handle the upload page
@app.route('/upload', methods=['POST'])
def upload_page():
    # check if there is a file in the request
    print(request.files)
    print(request.data)
    print(request.form)
    if 'file' not in request.files:
        return jsonify({"status": -1, "message": "No file selected"}), 422
    file = request.files['file']
    # if no file is selected
    if file.filename == '':
        return jsonify({"status": -1, "message": "No file selected"}), 422

    if file and allowed_file(file.filename):

        # call the OCR function on it
        extracted_text, translated_text = ocr_core(file)

        # extract the text and display it
        return jsonify({
            "status": 0,
            "message": "Successfully processed",
            "extracted_text": extracted_text,
            "language_detected": "tamil",
            "translated_text": translated_text
            }), 200
    
if __name__ == '__main__':
    app.run(host='localhost', port=5001, debug=True)