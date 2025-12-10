from persistence.db import get_connection

class Winner:
    def __init__(self, id, name, email, phrase):
        self.id = id
        self.name = name
        self.email = email
        self.phrase = phrase
        # Número de intentos
        # self.attempts = attempts

    def save(self):
        try:
            connection = get_connection()
            # Ejecutar sentencia de MySQL
            cursor = connection.cursor()

            # Consulta parametrizada
            query = "INSERT INTO winners (name, email, phrase) VALUES (%s, %s, %s)"
            cursor.execute(query, (self.name, self.email, self.phrase))
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

            # TODO: Ordenar por intentos y fecha
            # ORDER BY attempts ASC, date DESC

            query = "SELECT id, name, email, phrase FROM winners"
            cursor.execute(query)

            rows = cursor.fetchall()

            for row in rows:
                winner = cls(id = row[0], name = row[1], email = row[2], phrase = row[3])
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
