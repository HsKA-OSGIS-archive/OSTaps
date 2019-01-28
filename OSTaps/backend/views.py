import os
import json
from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse,Http404,JsonResponse,HttpResponseRedirect

def index (request):                                                    # INDEX is called when the user opens the URL
        filename = request.GET.get('data')                              # get the data parameter (/?data=). If no parameter is given its None
        context = {'filename': filename,}                               # build a context with the filename to pass to the frontend
	return render(request, 'index.html', context)                   # render (display) the page and pass the context

def upload(request):                                                    # UPLOAD is called when the user uploads (POST) data with a form
	doc_to_save = request.FILES['myFile']                           # get the file passed with the request (it is named "myFile", see HTML)
	filename = doc_to_save._get_name()                              # get the original file name
	filename = os.path.basename(filename)                           # omit possible "../" for security reasons
	fd = open(settings.BASE_DIR+'\\uploads\\'+str(filename),'wb')   # create a file in the servers file storage and open
        for chunk in doc_to_save.chunks():
            fd.write(chunk)                                             # write json chunks in the created file
        fd.close()                                                      # close the file
	return HttpResponseRedirect("/?data=" + filename)               # redirect to the index.html, but with the filename as "data" parameter

def get(request, filename):                                             # GET is called with a /xxx.geojson filename to get a JSON-reponse from the server
	path_upload=settings.BASE_DIR+'\\uploads\\'                     # the path on the server storage were uploads are stored
	file_path = os.path.join(path_upload, filename)                 # build path to requestet file
	if os.path.exists(file_path):                                   # if file exists on server storage

                json_data = open(file_path)                             # open file
                data = json.load(json_data)                             # load JSON data
                json_data.close()                                       # close file
                response = JsonResponse(data)                           # return JSON to client
                response["Access-Control-Allow-Origin"] = "*"           # allow external pages to acess the response
                return response                               

	raise Http404                                                   # if file does not exists throw file not found error

def test(request):
        return HttpResponse("You are in OSTaps")

def update(request):                                                    # UPDATE is called when a user calculates a new attribute
        data = request.POST.get("geojson", "")                          # get geojson parameter from POST request. Empty string if not given.
        data = json.loads(data)                                         # convert stringified JSON to python dict
        data = json.dumps(data)                                         # convert dict to json string

        filename = request.POST.get("filename", "")                     # get filename parameter from POST request. Empty string if not given.

        with open(settings.BASE_DIR+'\\uploads\\'+str(filename), 'wb') as outfile:  # overwrite the existing file
                outfile.write(data)                                     # with JSON

        return HttpResponse()                                           # no loading of any pages or data
