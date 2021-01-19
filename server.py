import mysql.connector
from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
import jsonpickle


def get_connection_to_database():
    connection = mysql.connector.connect(
        user='root',
        password='Marcingradzik2008',
        host='127.0.0.1',
        database='timeappdb',
        auth_plugin='mysql_native_password')
    return connection


app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)

jsonpickle.set_preferred_backend('json')
jsonpickle.set_encoder_options('json', ensure_ascii=False)

class Task:
    def __init__(self, id_task, content, primary_task, hour, day_num, month_num, year):
        self.id_task = id_task
        self.content = content
        self.primary_task = primary_task
        self.hour = hour
        self.day_num = day_num
        self.month_num = month_num
        self.year = year


@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = []

    try:
        connection = get_connection_to_database()
        cursor = connection.cursor(dictionary=True)
        query = "SELECT id_task, content, primary_task, hour, day_num, month_num, year FROM tasks"
        cursor.execute(query)
        
        for row in cursor:
            tasks.append(Task(row['id_task'], row['content'], row['primary_task'], row['hour'], row['day_num'],row['month_num'], row['year']))
            
        return jsonpickle.encode(tasks, unpicklable=False)

    except mysql.connector.errors.Error as err:
        return jsonify(details=err.msg), 400
    
    finally:
        connection.close()



@app.route('/tasks', methods=['POST'])
def add_task():
    request_data = request.get_json()

    try:
        connection = get_connection_to_database()
        cursor = connection.cursor()
        query = "INSERT INTO tasks(content, primary_task, hour, day_num, month_num, year) VALUES(%(content)s, %(primary_task)s, %(hour)s, %(day_num)s, %(month_num)s, %(year)s)"
        cursor.execute(query, request_data)
        connection.commit()
        
    except mysql.connector.errors.Error as err:
        return jsonify(details=err.msg), 400
        
    finally:
        connection.close()

    return request_data, 201

@app.route('/tasks<id_task>', methods=['PUT'])
def edit_task(id_task):
    request_data = request.get_json()
    request_data["id_task"] = id_task
    try:
        connection = get_connection_to_database()
        cursor = connection.cursor()

        query = "UPDATE tasks SET content=%(content)s, primary_task=%(primary_task)s, hour=%(hour)s, day_num=%(day_num)s, month_num=%(month_num)s, year=%(year)s WHERE id_task=%(id_task)s"
        cursor.execute(query, request_data)
        connection.commit()
        
    except mysql.connector.errors.Error as err:
        return jsonify(details=err.msg), 400
        
    finally:
        connection.close()

    return request_data

@app.route('/tasks/<id_task>', methods=['DELETE'])
def delete_user(id_task):
    request_data = request.get_json()
    request_data = {}
    request_data["id_task"] = id_task
    try:
        connection = get_connection_to_database()
        cursor = connection.cursor()

        query = "DELETE FROM tasks WHERE id_task=%(id_task)s"
        cursor.execute(query, request_data)
        connection.commit()
        
    except mysql.connector.errors.Error as err:
        return jsonify(details=err.msg), 400
        
    finally:
        connection.close()

    return jsonify()
app.run()
