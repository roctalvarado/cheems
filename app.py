from flask import Flask, render_template, request

# Inicialización de un constructor
app = Flask(__name__)

# Esta será la ruta index (de la página principal)
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)