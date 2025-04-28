from flask import Flask, render_template, session, request, jsonify, abort, redirect, url_for
import json
import random

app = Flask(__name__)
app.secret_key = 'secret'
# --------------------- Load Data ----------------------------
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

CALLING_TILES_HAND = [ "1_million.png", "2_million.png", "3_million.png",  
                    "1_stripe.png", "1_stripe.png", "1_stripe.png", 
                    "4_stripe.png", "5_stripe.png", "6_stripe.png",
                    "5_tong.png", "6_tong.png", "7_tong.png",   
                    "west.png", "west.png"    ]

CALLING_TILES_ANSWER_MAP = {
    1: 'DoIt',
    2: 'Pass',
    3: 'DoIt',
    4: 'DoIt',
}

CALLING_TILES_FEEDBACK = {
    1: {
        'correct': "Nice! You made a straight with a Chi call!.",
        'incorrect': "CHI it! You can form a straight by taking the discarded tile. "
    },
    2: {
        'correct': "Nice pass—you knew when not to Chi.",
        'incorrect': "Not quite—To CHI, remeber you need to form a straight with the discarded tile."
    },
    3: {
        'correct': "Perfect—you spotted the Chi opportunity! However, it didn't increase the number of melds so might not help you win",
        'incorrect': "Great Pass! It forms a stright but it didn't increase the number of melds so might not help you win."
    },
    4: {
        'correct': "Excellent—your final choice was spot on.",
        'incorrect': "You can Pong the discarded tile to complete a triplet"
    }
}

CALLING_TILES_CORRECT_HANDS = { 
    1: ["1_million.png", "2_million.png", "3_million.png",  
        "1_stripe.png", "1_stripe.png", "1_stripe.png", 
        "4_stripe.png", "5_stripe.png", "6_stripe.png",
        "5_tong.png", "6_tong.png", "7_tong.png",   
        "west.png", "west.png"],
    2: ["1_million.png", "2_million.png", "3_million.png",  
        "1_stripe.png", "1_stripe.png", "1_stripe.png", 
        "4_stripe.png", "5_stripe.png", "6_stripe.png",
        "5_tong.png", "6_tong.png", "7_tong.png",   
        "west.png", "west.png"],
    3: ["1_million.png", "2_million.png", "3_million.png",  
        "4_million.png", "1_stripe.png", "1_stripe.png", 
        "4_stripe.png", "5_stripe.png", "6_stripe.png",
        "5_tong.png", "6_tong.png", "7_tong.png",   
        "west.png", "west.png"],
    4: ["1_million.png", "2_million.png", "3_million.png",  
        "1_stripe.png", "1_stripe.png", "1_stripe.png", 
        "4_stripe.png", "5_stripe.png", "6_stripe.png",
        "5_tong.png", "6_tong.png", "7_tong.png",   
        "west.png", "west.png"],}



with open("static/learn_data/tile_type_pairs.json") as f:
    tile_type_pairs = json.load(f)

with open("static/learn_data/play_round.json") as f:
    play_round_data = json.load(f)

with open("static/learn_data/drag2match_resp.json") as f:
    tile_description_data = json.load(f)

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

@app.route('/learn_game_proc')
def game_procedure():
    return render_template('learn_game_proc.html')

# ---------------------- Drag to Match Game ----------------------
@app.route('/drag_to_match/<int:step>')
def drag_to_match(step):
    random.seed(step)

    # Group tiles by type
    type_to_tiles = {}
    for pair in tile_type_pairs:
        if pair['type'] not in type_to_tiles:
            type_to_tiles[pair['type']] = []
        type_to_tiles[pair['type']].append(pair)

    # Pick 4 unique types
    all_types = list(type_to_tiles.keys())
    if len(all_types) >= 4:
        selected_types = random.sample(all_types, 4)
    else:
        selected_types = all_types  # if fewer types

    # Pick 1 tile per type
    sample = []
    for t in selected_types:
        sample.append(random.choice(type_to_tiles[t]))

    return render_template('drag_to_match.html', step=step, pairs=sample, tile_descriptions=tile_description_data)

# ---------------------- Learn Tiles ----------------------
@app.route('/learn_tiles/end')
def learn_tiles_end():
    return render_template('learn_tiles_end.html')

# ---------------------- Quiz ----------------------
@app.route('/quiz/<int:question_id>')
def quiz(question_id):
    return render_template('quiz.html', question_id=question_id)

@app.route("/quiz/<int:question_id>/results", methods=["POST", "GET"])
def quiz_results(question_id):
    if request.method == "POST":
        data = request.get_json()
        session["score"] = data.get("score", 0)
        session["max_score"] = data.get("max_score", 0)
        return "", 204

    score = session.pop("score", 0)
    max_score = session.pop("max_score", 0)
    return render_template("quiz_result.html", score=score, max_score=max_score)


#-------------Game procedure step 1---------------
@app.route("/winning-hands/<int:step>")
def winning_hands(step):
    if step == 1:
        # Shuffle on first visit
        tile_order = CORRECT_ORDER[:]
        random.shuffle(tile_order)
        session["tile_order"] = tile_order
        return render_template("winning_hands.html", step=step, tile_images=tile_order)

    elif step == 2:
        # Fixed correct order for teaching overlays
        return render_template("winning_hands.html", step=step, tile_images=CORRECT_ORDER)

    else:
        return render_template("winning_hands.html", step=step, tile_images=[])

@app.route("/check-tile-order", methods=["POST"])
def check_tile_order():
    data = request.get_json()
    user_order = data["tiles"]
    result = [user_order[i] == CORRECT_ORDER[i] for i in range(len(CORRECT_ORDER))]
    is_correct = all(result)
    return jsonify({"result": result, "valid": is_correct})
#------------- Game procedure step 2: Calling Tiles ---------------

@app.route('/calling-tiles/')
def calling_tiles_root():
    # redirect bare URL to step 1
    return redirect(url_for('calling_tiles', step=1))


@app.route('/calling-tiles/<int:step>')
def calling_tiles(step):
    # constrain step into 1..4
    # if step < 1 or step > 4:
    #     abort(404)


    order = CALLING_TILES_HAND[:]
    # use ordered hands in every step
    # Step 1: Chi Question
    if step == 1:
        discard = order.pop(7)
        order.insert(7, "Empty.png")


    # Step 2: 
    if step == 2:
        order.pop(2)
        discard = "9_million.png"
        order.insert(2, "Empty.png")
        
    

    # Step 3: 
    if step == 3:
        order.pop(3)
        discard = "4_million.png"
        order.insert(3, "Empty.png")

    if step == 4:
        discard = order.pop(4)
        order.insert(3, "Empty.png")
    # on step 1 (or first ever), shuffle and store the "hand"
    # if step == 1 or 'calling_tiles_order' not in session:
    #     order = CORRECT_ORDER[:]          # use your existing CORRECT_ORDER
    #     #random.shuffle(order)
    #     session['calling_tiles_order'] = order
    # else:
    #     order = session['calling_tiles_order']

    # # pop off one tile as the discarded tile
    # if order:
    #     discard = order.pop(5)
    #     session['calling_tiles_order'] = order
    # else:
    #     discard = CORRECT_ORDER[-1]



    # render with exactly the same context your template expects:
    return render_template(
        'calling_tiles.html',
        step=step,
        hand_tiles=order,
        discard_tile=discard,
        placeholder_index=len(order),    # dashed slot at end of hand
        progress=step * (100 / 4),       # 25%, 50%, 75%, 100%
        disable_next=(step == 1)         # NEXT disabled on step 1
    )

@app.route('/check-calling-tiles', methods=['POST'])
def check_calling_tiles():
    data   = request.get_json()
    step   = data.get('step')
    action = data.get('action')

    is_correct = (action == CALLING_TILES_ANSWER_MAP.get(step))

    # on correct, send full list to client
    # new_hand = CALLING_TILES_HAND[:] if is_correct else data.get('current_hand', [])
    if is_correct:
        new_hand = CALLING_TILES_CORRECT_HANDS.get(step, [])
    else:
        new_hand = data.get('current_hand', [])

    messages = CALLING_TILES_FEEDBACK.get(step, {})
    msg = messages['correct'] if is_correct else messages['incorrect']

    return jsonify({
        'valid': is_correct,
        'new_hand': new_hand,
        'feedback': msg
    })



#-------------Game procedure step 3---------------
@app.route('/play-round-start')
def play_round_start():
    return render_template('play_round_start.html')

@app.route('/play_round/<int:step>', methods=['GET', 'POST'])
def play_round(step):
    round = play_round_data.get(str(step))
    return render_template('play_round.html', step=step, round=round)

@app.route('/play_round_end', methods=['POST'])
def play_round_end():
    return render_template('play_round_end.html')


#-----------------------------------------------
    

if __name__ == '__main__':
    app.run(debug=True)
