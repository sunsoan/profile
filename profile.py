from flask import Flask,jsonify
import torndb
app = Flask(__name__)

click_times = {'education': 0, 'ability': 0, 'experience': 0, 'selfEval': 0}
click_times_from_db = {'education': 0, 'ability': 0, 'experience': 0, 'selfEval': 0}
db = torndb.Connection("127.0.0.1:3306", "myprofile", user="yaya", password="123456")

@app.route('/')
def hello_world():
    return app.send_static_file('index-mine.html')


@app.route('/status/<clicked_id>')
def click_status(clicked_id):
    click_times[clicked_id] += 1

    sql_update = "UPDATE status SET click_times = %d WHERE item_name = '%s'"%(click_times[clicked_id],clicked_id)
    db.update(sql_update)

    return ('', 204)


@app.route('/get_status_data')
def get_status_data():
    sql_query= "select * from status"
    results = db.query(sql_query)
    for row in results:
        click_times_from_db[row['item_name']] = row['click_times']
    return jsonify(click_times_from_db)


if __name__ == '__main__':
    app.run()
