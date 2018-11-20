# How to use this:

###Django installation
make sure python and its pip are in windows system variable!

'''
pip install django
'''

### Usage

- Start the server by calling 
'''
python manage.py runserver
'''

- Open the browser and type http://localhost:8000 

- Open a GeoJSON (e.g. test.geojson) and press "Upload!" button

- You now see a list of all uploaded files

- Open http://localhost:8000/get/test.geojson to get the file in your browsers json-viewer

- Open http://localhost:8000/leaflet/test.geojson to render the uploaded geojson in a map


# How to rebuild this:

### Create project
'''
django-admin startproject backend
'''
in this folder you find the manage.py script which starts the server
as well as the "backend" folder where the python files are stored

### Create html-page and display it
create a folder "frontend" in the folder structure where the manage.py
script and the "backend" folder is stored. In this you can create a html-files
named index.html e.g.

'''html
<html>
  <body>
    <p>Hello World!</p>   
  </body>
</html>
'''

the backend now needs to know where the frontend is located. In the settings.py
file in the "backend" folder you find the TEMPLATES entry with an empty 
'''
'DIRS': []
'''
-> in the square brackets add
'''
os.path.join(BASE_DIR, 'frontend')
'''
now the backend knows where your html templates are located.

the backend now needs to know how to handle client requests.
in the "backend" folder create a python file views.py with the content 

'''python
from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse,Http404

def index (request):
	return render(request, 'index.html')
'''
	
the backend now knows what to response if the index method is called 
(namely to render index.html).

the URLs which define which view is loaded are defined in the backends urls.py
here we first need to import the views folder 
'''python
from . import views
'''

and then add the index url which sends the request to the index method of views.py
'''python
url(r'^index/', views.index),
'''

### Run server
open cmd and navigate to the folder where the manage.py is located. Call
'''
python manage.py runserver
'''
to start the server and open localhost:8000/index to view the created html page!
to be able to open the index page without calling /index but only the domain change 
'''python
url(r'^index/', views.index),
'''
to 
'''python
url(r'^$', views.index),
'''
now localhost:8000 will render the index.html page

this can be shortened with a .bat file like startServer.bat which includes 
'''
start "" http://localhost:8000
python manage.py runserver
'''

### File upload
In the index.html file of the frontend, replace the current code with

'''html
<html>
  <body>
    <form ref='uploadForm' 
      id='uploadForm' 
      action='http://localhost:8000/upload/' 
      method='post' 
      encType="multipart/form-data">{% csrf_token %}
        <input type="file" name="myFile" /> 
        <input type="hidden" name="_csrf" value="<your_csrf_token>" />
        <input type='submit' value='Upload!' />
    </form>     
  </body>
</html>
'''

A form can take user input parameters and send a post request to perform something.
The "action" which should be done is defined in the URL 'http://localhost:8000/upload/'
which we'll create later. 'encType="multipart/form-data"' defines that the post 
request will contain data (which should be stored on the server).
csrf tokens are for security reasons (link). 
The three input buttons types are:
file -> button to open explorer to open file
hidden -> not displayed csrf key sended for security 
submit -> perform the post request

to create a valid link for the form we need to insert the URL in the backends urls.py
'''python
url(r'^upload/', views.upload  ),
'''

and create the respective 'upload' methods in the views.py
'''python
def upload(request):
	doc_to_save = request.FILES['myFile']
	filename = doc_to_save._get_name()
	fd = open(settings.BASE_DIR+'\\uploads\\'+str(filename),'wb')
        for chunk in doc_to_save.chunks():
            fd.write(chunk)
        fd.close()
	return files(request)
'''

l2: get the file attached to the request (named 'myFile' in the html code)
l3: get the name of the file
l4: (for this line we need to create a new folder called "uploads" in the folder where 
    the manage.py file is located -> in this folder the uploaded files are stored)
    In the newly created folder create a new file with the same name as the uploaded 
    file and open it with write acess
l5+:write the content of the post request file into the new file and close 
l8: call the "files" function which we'll create now

### List all uploaded files
create new html file in the frontend called filelist.html containing

'''html
<html>
  <body>
    <ol>
    {% for file in files %}
      <li>{{file}}</li>
    {% endfor %}
    </ol>  
  </body>
</html>
'''

the code in {} is django syntax to create html content without hard coding.
we will use this now in python, first create the URL to view all uploaded files:
'''python
url(r'^files/', views.files  ),
'''

next we define the "files" method in views.py:
'''python
def files(request):
	path=settings.BASE_DIR+'\\uploads\\'  # insert the path to your directory   
	file_list =os.listdir(path) 
	context = {'files': file_list,}
	return render(request, 'filelist.html', context)
'''

(this needs the adding of "import os" in the top of the file)
l2: build the path to the folder where the uploads are stored
l3: get all files in the folder using the os library
l4: build the 'files' variable used in the html with all the files listed in file_list
l5: render the html file with the context (the files) as additional parameter

### Return uploaded file to user
we now want that a user can acess his uploaded file. First create a URL:
'''python
url(r'^get/(?P<path>.*)$', views.get),
'''
while in (?P<path>.*)$ "path" is a variable in which the passed filename is 
stored and passed to the views method as additional parameter (see below)
(e.g. /get/test.json -> path = "test.json"

next we define the "getFile" method in views.py:
'''python
def get(request, path):
	path_upload=settings.BASE_DIR+'\\uploads\\'  # insert the path to your directory   
	file_path = os.path.join(path_upload, path)
	if os.path.exists(file_path):

                json_data = open(file_path)
                data = json.load(json_data) 
                json_data.close()
                return JsonResponse(data)

	raise Http404
'''

(this needs the adding of "import json" and "from django.http import JsonResponse"
in the top of the file)
l1: see the addidional parameter from the url (path)
l2: build the path to the folder where the uploads are stored
l3: join this path with the given filename
l4: if this file exists on the servers file storage
l5: open the file
l6: parse the json data
l7: close the file
l8: and return a JsonResponse (JSON will be displayed in the Browser)
l9: if file does not exist raise Http404 file not found error

### Render uploaded geoJSON in leaflet map
Define URL:
'''python
url(r'^leaflet/(?P<path>.*)$', views.renderGeoJSON),
'''

Define View:
'''python
def renderGeoJSON (request, path):
        context = {'filename': path,}
        return render(request, 'leaflet.html', context)
'''

Define HTML (leaflet.html) in the frontend:
'''html
<html>
	<head>
		<!-- Leaflet -->
		<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA==" crossorigin=""/>
		<script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js" integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA==" crossorigin=""></script>

		<!-- JQuery -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

		<style>
		  body { margin:0; padding:0; }
		  #map { position:absolute; top:0; bottom:0; width:100%; }
		</style>
	</head>
	<body>
		<div id='map'></div>

		<script>
		var filename = "{{filename}}"
		
		$.getJSON("http://localhost:8000/get/" + filename, function(geojsonData) {
			createMap(geojsonData);
		});

		function createMap(geoJSON) {
			var map = new L.Map('map');
			var geoJ = L.geoJson(geoJSON).addTo(map);


			var baseMaps = {
				'OSM': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				}),
			};

			baseMaps.OSM.addTo(map);

			var bounds = geoJ.getBounds();
			var center = bounds.getCenter();
			map.fitBounds(bounds);
		}
		</script>
	</body>
</html>
'''

localhost:8000/leaflet/test.geojson would now pass the filename (test.geojson)
to the leaflet.html via the context. The filename can be acessed using "{{filename}}".
JQuery ($.getJSON) is used to receive the uploaded GeoJSON via the get method and pass 
it to a function which builds up the leaflet map










