import os
import json
from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse,Http404
from django.http import JsonResponse

def index (request):
	return render(request, 'index.html')

def upload(request):
	doc_to_save = request.FILES['myFile']
	filename = doc_to_save._get_name()
	fd = open(settings.BASE_DIR+'\\uploads\\'+str(filename),'wb')
        for chunk in doc_to_save.chunks():
            fd.write(chunk)
        fd.close()
	return files(request)

def files(request):
	path=settings.BASE_DIR+'\\uploads\\'  # insert the path to your directory   
	file_list =os.listdir(path) 
	context = {'files': file_list,}
	return render(request, 'filelist.html', context)

def getFile(request, path):
	path_upload=settings.BASE_DIR+'\\uploads\\'  # insert the path to your directory   
	file_path = os.path.join(path_upload, path)
	if os.path.exists(file_path):

                json_data = open(file_path)
                data = json.load(json_data) 
                json_data.close()
                return JsonResponse(data)

	raise Http404
