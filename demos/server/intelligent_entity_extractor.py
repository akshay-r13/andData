from flask import Flask, render_template
from flask_socketio import SocketIO
import spacy
import re
from nltk.stem import WordNetLemmatizer

lemmatizer = WordNetLemmatizer()

def search_terms_to_entities(search_items):
    search_items = search_items.lower() # convert to lower case
    search_items = re.sub('[^a-z ]+', '', search_items)
    # print(search_items)
    search_items = re.sub('\s+', ' ', search_items)
    # print(search_items)
    search_terms = search_items.split(' ')
    # print(search_terms)
    search_terms = [lemmatizer.lemmatize(search_term) for search_term in search_terms]
    # print(search_terms)
    mapping = {
        'person': 'PERSON',
        'people': 'PERSON',
        'place': 'GPE',
        'location': 'GPE',
        'date': 'DATE',
        'day': 'DATE',
        'time': 'TIME',
        'percent': 'PERCENT',
        'percentage': 'PERCENT',
        'ratio': 'PERCENT',
        'money': 'MONEY',
        'currency': 'MONEY',
        'cost': 'MONEY',
        'company': 'ORG',
        'organization': 'ORG',
        'business': 'ORG'
    }
    search_entities = set()
    for search_term in search_terms:
        try:
            entity = mapping[search_term]
            search_entities.add(entity)
        except KeyError:
            continue
    
    return search_entities

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

nlp = spacy.load('en_core_web_sm')

@socketio.on('connect')
def connect():
    print('Connected to client!')

@socketio.on('disconnect')
def disconnect():
    print('Disconnected from the client')

@socketio.on('find_entities')
def find_entities(data):
    text = data.get('text')
    search_items = data.get('searchItems')
    search_entities = search_terms_to_entities(search_items)
    print(search_entities)
    doc = nlp(text)
    data = {
        "tokens": [
            {
                "token": token.text,
                "entity_type": token.ent_type_
            } if token.ent_type_ in search_entities 
            else {
                "token": token.text,
                "entity_type": None
            } for token in doc
        ]
    }

    # [f(x) if condition else g(x) for x in sequence]
    print(data)
    socketio.emit('found_entities', data, json=True)


if __name__ == '__main__':
    socketio.run(app, host='localhost', port=5000)