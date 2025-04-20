from flask import Flask, render_template, session, request, jsonify, abort
import random
app = Flask(__name__)
app.secret_key = 'secret'
# --------------------- Hardcoded data ----------------------------
lessons = {
    1: {"text": "The game uses 3 suits for the main part of gameplay", "types": ["million", "stripe", "tong"], "notice": ""},
    2: {"text": "The game uses 2 types of special tiles", "types": ["dragon", "wind"], "notice": "Don't worry about what these mean — just recognize them by color or symbol!"},
    3: {"text": "Flower tiles", "types": ["flower"], "notice": "Flower tiles are bonus tiles in Mahjong that don't belong to any suit but can earn you extra points when revealed."},
    # add more lessons
}
CORRECT_ORDER = [ "1_million.png", "2_million.png", "3_million.png",  
                 "1_stripe.png", "1_stripe.png", "1_stripe.png", 
                 "4_stripe.png", "5_stripe.png", "rich.png",  
                 "5_tong.png", "6_tong.png", "7_tong.png",   
                 "west.png", "west.png"    ]

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

# @app.route('/learn_game_proc/<int:lesson_id>')
# def learn_game_proc(lesson_id):
#     return render_template('learn_game_proc.html', lesson_id=lesson_id)

@app.route('/learn_game_proc')
def game_procedure():
    return render_template('learn_game_proc.html')

@app.route('/quiz/<int:question_id>')
def quiz(question_id):
    return render_template('quiz.html', question_id=question_id)

@app.route('/result')
def result():
    return render_template('result.html')

#-------------Game procedure step 1---------------
@app.route("/winning-hands/<int:step>")
def winning_hands(step):
    # Reset tile order only on step 1
    if "tile_order" not in session or step == 1:
        tile_order = CORRECT_ORDER[:]
        random.shuffle(tile_order)
        session["tile_order"] = tile_order
    else:
        tile_order = session["tile_order"]

    return render_template("winning_hands.html", step=step, tile_images=tile_order)

@app.route("/check-tile-order", methods=["POST"])
def check_tile_order():
    data = request.get_json()
    user_order = data["tiles"]
    result = [user_order[i] == CORRECT_ORDER[i] for i in range(len(CORRECT_ORDER))]
    is_correct = all(result)
    return jsonify({"result": result, "valid": is_correct})
#-------------Game procedure step 2---------------
@app.route('/calling-tiles')
def calling_tiles():
    return render_template('calling_tiles.html')
#-------------Game procedure step 3---------------
@app.route('/play-round')
def play_round():
    return render_template('play_round.html')
#-----------------------------------------------
    

if __name__ == '__main__':
    app.run(debug=True)
