from flask import Flask, render_template, abort
import json
import random

app = Flask(__name__)

# --------------------- Load Data ----------------------------
lessons = {
    1: {"text": "The game uses 3 suits for the main part of gameplay", "types": ["million", "stripe", "tong"], "notice": ""},
    2: {"text": "The game uses 2 types of special tiles", "types": ["dragon", "wind"], "notice": "Don't worry about what these mean — just recognize them by color or symbol!"},
    3: {"text": "Flower tiles", "types": ["flower"], "notice": "Flower tiles are bonus tiles in Mahjong that don't belong to any suit but can earn you extra points when revealed."},
    # add more lessons
}

with open("static/learn_data/tile_type_pairs.json") as f:
    tile_type_pairs = json.load(f)

# ---------------------- Home & Main Pages ----------------------
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/learn_tiles/<int:step>')
def learn_tiles(step):
    lesson = lessons.get(step)
    if not lesson:
        abort(404)
    
    return render_template(
        'learn_tiles.html', 
        lesson=lesson, 
        step=step
    )

@app.route('/drag_to_match/<int:step>')
def drag_to_match(step):
    random.seed(step)
    sample = random.sample(tile_type_pairs, 4)
    return render_template('drag_to_match.html', step=step, pairs=sample)

@app.route('/learn_tiles/end')
def learn_tiles_end():
    return render_template('learn_tiles_end.html')


@app.route('/learn_game_proc/<int:lesson_id>')
def learn_game_proc(lesson_id):
    return render_template('learn_game_proc.html', lesson_id=lesson_id)

@app.route('/quiz/<int:question_id>')
def quiz(question_id):
    return render_template('quiz.html', question_id=question_id)

@app.route('/result')
def result():
    return render_template('result.html')




if __name__ == '__main__':
    app.run(debug=True)
