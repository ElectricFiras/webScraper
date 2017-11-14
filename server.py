import json
import os
import time
from flask import Flask, Response, request, render_template, jsonify
import requests
import lxml.html
import mysql.connector as mariadb

mariadb_connection = mariadb.connect(user='lfgony45yqclfioi', password='t7lqhjeoq86mgybr', database='qhxkknam2ii4yx7c', host="bfjrxdpxrza9qllq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com")

cursor = mariadb_connection.cursor()

app = Flask(__name__, static_url_path='', static_folder='build')
app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))
print ('hi there you\'re here')

@app.route('/login', methods = ['GET', 'POST'])
def login():
  if request.method == 'POST':
    data = json.loads(request.data)
    compare = data['username']
    password = data['password']
    cursor.execute("SELECT username FROM users WHERE username=%s", (compare,))
    for username in cursor:
          for x in username:
               if compare == x:
                  return 'Hellow' 
    cursor.execute("INSERT INTO users (username,password) VALUES (%s,%s)", (compare, password))
    mariadb_connection.commit()
    return 'Hi'
  if request.method == 'GET':
    data = request.args
    username = data['username']
    compare = data['password']
    try:
      cursor.execute("SELECT password FROM users WHERE username=%s", (username,))
    except mariadb.Error as error:
      print("Error: {}".format(error));
      
    for password in cursor:
        for x in password:
          if compare == x:
              return 'Hi'
  return 'nooo'

@app.route('/hello', methods=['GET', 'POST'])
def index():
  response = requests.get('http://www.mathhelp.com/intermediate-algebra-help/')
  httt = lxml.html.fromstring(response.text)
  htttTitle = httt.xpath('//h5')
  links = httt.xpath('//a')
  out = []
  linkes = []
  send = []
  for title in htttTitle:
    # we use this if just in case some <a> tags lack an href attribute
    out.append(title.text_content())
  for link in links:
    linkes.append(lxml.html.tostring(link))
  send.append(out)
  send.append(linkes)
  return jsonify(send)

if __name__ == '__main__':
    app.run(host='0.0.0.0')