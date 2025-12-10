from persistence.db import get_connection
from datetime import datetime

class Winner:
    def __init__(self, id, name, email, phrase, attempts = 1, date = None):
        self.id = id
        self.name = name
        self.email = email
        self.phrase = phrase
        self.attempts = attempts
        self.date = date if date else datetime.now()

    def save(self):
        try:
            connection = get_connection()
            # Ejecutar sentencia de MySQL
            cursor = connection.cursor()

            # Consulta parametrizada
            query = "INSERT INTO winners (name, email, phrase, attempts, date) VALUES (%s, %s, %s, %s, NOW())"
            cursor.execute(query, (self.name, self.email, self.phrase, self.attempts, self.date))
            connection.commit()

            self.id = cursor.lastrowid
            return self.id
        
        except Exception as ex:
            print("Error al guardar registro: ", ex)
            return 0

        finally:
            cursor.close()
            connection.close()

    @classmethod
    def get_all(cls):
        winners = []
        try:
            connection = get_connection()
            cursor = connection.cursor()

            query = "SELECT id, name, email, phrase, attempts, date FROM winners ORDER BY attempts ASC, date DESC"
            cursor.execute(query)

            rows = cursor.fetchall()

            for row in rows:
                winner = cls(id = row[0], name = row[1], email = row[2], phrase = row[3], attempts = row[4], date = row[5])
                winners.append(winner)

            return winners
        
        except Exception as ex:
            print("Error al consultar registros: ", ex)
            return []

        finally:
            cursor.close()
            connection.close()

    @classmethod
    def delete(cls, id):

        connection=None
        cursor=None
        try:
            connection = get_connection()
            cursor = connection.cursor()

            query = "DELETE FROM winners WHERE id = %s"
            cursor.execute(query, (id,))
            connection.commit()

            return cursor.rowcount > 0 
        except Exception as ex:
                print("Error al eliminar registro: ", ex)
                return False
        finally:
            if cursor is not None:
                cursor.close()
            if connection is not None:
                connection.close()
