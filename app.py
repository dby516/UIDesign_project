from flask import Flask, render_template

app = Flask(__name__)


# ---------------------- Home & Main Pages ----------------------
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/learn/<int:lesson_id>')
def learn(lesson_id):
    return render_template('learn.html', lesson_id=lesson_id)

@app.route('/quiz/<int:question_id>')
def quiz(question_id):
    return render_template('quiz.html', question_id=question_id)

@app.route('/result')
def result():
    return render_template('result.html')

if __name__ == '__main__':
    app.run(debug=True)
