import pymysql as mysql

def get_connection():
    return mysql.connect(
        host='127.0.0.1', # o "localhost"
        port=3306, # Default = 3306
        user='root',
        password='admin',
        database='cheems'
    )