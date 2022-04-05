import os
import MySQLdb
from time import sleep
from pathlib import Path

count_to_try = 0
LIMIT_OF_COUNT = 10  # 値は必要に応じて調整


def check_connection(count, limit):
    """
    docker-compose up実行時用、時間調整のための関数。
    """
    try:
        conn = MySQLdb.connect(
            unix_socket="/var/run/mysqld/mysqld.sock",
            user='no_more_ramen_developer',
            passwd='yxUJTtR3gYmJ',
            host="db",
            port=3308,
            db='no_more_ramen_db',
        )
    except MySQLdb._exceptions.OperationalError as e:
        count += 1
        print("Waiting for MySQL... (", count, "/ ", LIMIT_OF_COUNT, " )")
        sleep(3)
        if count < limit:
            check_connection(count, limit)
        else:
            print(e)
            print("Failed to connect mySQL.")
    else:
        print("Connected!\n")
        conn.close()
        exit()


if __name__ == "__main__":
    check_connection(count_to_try, LIMIT_OF_COUNT)
