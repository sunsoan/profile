from flask import Flask,jsonify
import sqlite3
from os import path

app = Flask(__name__)

click_times = {'education': 0, 'ability': 0, 'experience': 0, 'selfEval': 0}
click_times_from_db = {'education': 0, 'ability': 0, 'experience': 0, 'selfEval': 0}

basedir = path.abspath(path.dirname(__file__))
DATABASE = path.join(basedir,'database.db')



def connect_db():
    return sqlite3.connect(DATABASE)


def init_data():
    dba = connect_db()
    sql_query = "select education,ability,experience,selfEval from status"
    cura = dba.cursor()
    cura.execute(sql_query)
    try:
        click_times['education'], click_times['ability'], click_times['experience'], click_times['selfEval'] = cura.fetchone()
    except TypeError:
        print(TypeError.__str__())
    cura.close()
    dba.close()
init_data()


@app.route('/')
def hello_world():
    return app.send_static_file('index-mine.html')


@app.route('/status/<clicked_id>')
def click_status(clicked_id):
    click_times[clicked_id] += 1
    dbac = connect_db()
    sql_update = "update status set %s = %d "%(clicked_id,click_times[clicked_id])
    dbac.execute(sql_update)
    dbac.commit()
    dbac.close()
    return ('', 204)


@app.route('/get_status_data')
def get_status_data():
    dba = connect_db()
    sql_query= "select education,ability,experience,selfEval from status"
    cura = dba.cursor()
    cura.execute(sql_query)
    try:
        click_times_from_db['education'],click_times_from_db['ability'], click_times_from_db['experience'], click_times_from_db['selfEval'] = cura.fetchone()
    except TypeError:
        pass
    cura.close()
    dba.close()
    return jsonify(click_times_from_db)


if __name__ == '__main__':
    app.run()
