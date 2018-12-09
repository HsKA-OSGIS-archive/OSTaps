import os
import json
from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse,Http404
from django.http import JsonResponse

def index (request, filename=""):
        context = {'filename': filename,}
        print context
	return render(request, 'index.html', context)

def upload(request):
	doc_to_save = request.FILES['myFile']
	filename = doc_to_save._get_name()
	fd = open(settings.BASE_DIR+'\\uploads\\'+str(filename),'wb')
        for chunk in doc_to_save.chunks():
            fd.write(chunk)
        fd.close()
	return index(request, filename)

def get(request, filename):
	path_upload=settings.BASE_DIR+'\\uploads\\'    
	file_path = os.path.join(path_upload, filename)
	if os.path.exists(file_path):

                json_data = open(file_path)
                data = json.load(json_data) 
                json_data.close()
                return JsonResponse(data)
        
	raise Http404
