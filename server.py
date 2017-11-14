import json
import os
import time
from flask import Flask, Response, request, render_template, jsonify
import requests
import lxml.html
import mysql.connector as mariadb

mariadb_connection = mariadb.connect(user='firas', password='201095', database='pythUsers')

cursor = mariadb_connection.cursor()

app = Flask(__name__, static_url_path='', static_folder='build')
app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))
print ('hi there you\'re here')

@app.route('/login', methods = ['GET', 'POST'])
def login():
  if request.method == 'POST':
    data = json.loads(request.data)
    print("data :", data['username'])
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
    print ('params: ', request.args['username'])
    data = request.args
    username = data['username']
    compare = data['password']
    print(username)
    try:
      cursor.execute("SELECT password FROM users WHERE username=%s", (username,))
    except mariadb.Error as error:
      print("Error: {}".format(error));
      
    print('cursor', cursor)
    for password in cursor:
        for x in password:
          print('password', x)
          print(compare == x)
          if compare == x:
              return 'Hi'
  return 'nooo'

@app.route('/hello', methods=['GET', 'POST'])
def index():
  response = requests.get('http://www.mathhelp.com/intermediate-algebra-help/')
  print(response.text)
  httt = lxml.html.fromstring(response.text)
  htttTitle = httt.xpath('//h5')
  links = httt.xpath('//a')
  print("title: ", htttTitle)
  print ("links: ", links)
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

# def get_year_urls():
#     start_url = 'http://www.un.org/en/sc/documents/resolutions/'
#     response = requests.get(start_url)
#     tree = lxml.html.fromstring(response.text)
#     links = tree.cssselect('a')  # or tree.xpath('//a')
#     print('tree',tree)
#     out = []
#     print('11111111111111111111111111111111111111111111111111')
#     for link in links:
#         print('2222222222222222222222222222222222222')
#         # we use this if just in case some <a> tags lack an href attribute
#         if 'href' in link.attrib:
#             print('333333333333333333333333333333333')
#             out.append(link.attrib['href'])
#             print('444444444444444444444444444')
#     print(out)
#     print('5555555555555555555555555    555')
#     test = {
#         'hi'
#     }
#     return jsonify(test)
# @app.route('/api/comments', methods=['GET', 'POST'])
# def comments_handler():
#     with open('comments.json', 'r') as f:
#         comments = json.loads(f.read())

#     if request.method == 'POST':
#         new_comment = request.form.to_dict()
#         new_comment['id'] = int(time.time() * 1000)
#         comments.append(new_comment)

#         with open('comments.json', 'w') as f:
#             f.write(json.dumps(comments, indent=4, separators=(',', ': ')))

#     return Response(
#         json.dumps(comments),
#         mimetype='application/json',
#         headers={
#             'Cache-Control': 'no-cache',
#             'Access-Control-Allow-Origin': '*'
#         }
#     )


if __name__ == '__main__':
    app.run()