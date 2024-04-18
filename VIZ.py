import os
from flask import Flask, render_template


app = Flask(__name__)

@app.route('/stats')
def show_VIZ():
    return render_template("setup_viz.html")