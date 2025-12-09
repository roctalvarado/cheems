from flask import Flask, render_template, request, jsonify
from entities.winner import Winner

# Inicialización de un constructor
app = Flask(__name__)

# Esta será la ruta index (de la página principal)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/winner', methods=['POST'])
def save_winner():
    data = request.get_json()

    winner = Winner(id=0, name=data['name'], email=data['email'], phrase=data['phrase'])

    winner.save()

    if winner.id != 0:
        return jsonify({'success': True, 'id': winner.id}), 201
    
    else:
        return jsonify({'success': False}), 500

@app.route('/winners', methods=['GET'])
def get_winners():
    return render_template('winners.html', winners = Winner.get_all())

# TODO: Crear ruta para eliminar ganador
# @app.route('/winner/delete/<int:id>', methods=['POST'])
# def delete_winner(id):

if __name__ == '__main__':
    # Ejecuta Flask con la configuración predeterminada, la cual es:
    # localhost (127.0.0.1) No permite conexiones externas
    # Puerto 5000
    # app.run()
    app.run(debug=True)

    # Lo cambiamos para permitir conexiones internas desde la IP dinámica
    app.run(host='0.0.0.0', port=5000)