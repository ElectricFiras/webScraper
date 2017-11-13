import json
import os
import time
from flask import Flask, Response, request, render_template, jsonify
import requests
import lxml.html

app = Flask(__name__, static_url_path='', static_folder='build')
app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))
print ('hi there you\'re here')


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
    app.run(port=int(os.environ.get("PORT", 3000)), debug=True, passthrough_errors=False  )