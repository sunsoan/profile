from flask import Flask,jsonify

app = Flask(__name__)

click_times = {'education': 0, 'ability': 0, 'experience': 0, 'selfEval': 0}


@app.route('/')
def hello_world():
    return app.send_static_file('index-mine.html')


@app.route('/status/<clicked_id>')
def click_status(clicked_id):
    click_times[clicked_id] += 1
    return ('', 204)


@app.route('/get_status_data')
def get_status_data():
    return jsonify(click_times)


if __name__ == '__main__':
    app.run()
