# OSTaps

__O__ pen __S__ ource __T__ hematic M __aps__ is a web-based, interactive Thematic Mapping tool which ebales you to make a fast Visualization of Statistical Data for showing Spatial Distributions using Choropleth Maps. Create a Web Map without having experience with Leaflet or programming at all! Export your map as Image, stand-alone HTML (to embed the Result on your Website) or as Styled Layer Description (SLD) (to visualize your results in QGIS as well). This project can be seen as a GUI to style a Leaflet Map.

### OSTaps:

The main tool lies within the [OSTaps](https://github.com/HsKA-OSGIS/OSTaps/tree/master/OSTaps) folder. The framework is __Django__, so to be able to run the project, you need to install Django first:

(if you use windows, make sure python (e.g. C:\Python27) and its pip (e.g. C:\Python27\Scripts) are in windows system variable!)

    pip install django

Within the [OSTaps](https://github.com/HsKA-OSGIS/OSTaps/tree/master/OSTaps) folder, start the server by calling 

    python manage.py runserver

After the server started sucessfully, open the browser and type http://localhost:8000.



### Module works:

[This](https://github.com/HsKA-OSGIS/OSTaps/tree/master/module_work) folder contains interim results of the ongoing project. Note that the contents can be obsolete and are implemented in an improved way within the main OSTaps folder. This is not the case for folders marked as __Detailed Readme available__, these folders are introducing stand alone sollutions which could be adopted. The questions tried to answer in the single folders are shortly described:

[DjangoServer:](https://github.com/HsKA-OSGIS/OSTaps/tree/master/module_work/DjangoServer) How to create a Django Server with a frontend to upload a GeoJSON and display the uploaded GeoJSON on a Leaflet map? __Detailed Readme available!__

[NodeJS:](https://github.com/HsKA-OSGIS/OSTaps/tree/master/module_work/NodeJS) How to use "require()" statement outside NodeJS to make Geostyler functionality browser compatible using "browserify" and "watchify"? __Detailed Readme available!__

[GUI:](https://github.com/HsKA-OSGIS/OSTaps/tree/master/module_work/GUI) How to build up a HTML page to enable user inputs and style a Leaflet Map dynamically?

[Bootstrap layout:](https://github.com/HsKA-OSGIS/OSTaps/tree/master/module_work/Bootstrap%20layout) How to improve the styling of the basic GUI using Bootstrap framework?

[SLD_export:](https://github.com/HsKA-OSGIS/OSTaps/tree/master/module_work/SLD_export) How to download a string as SLD file using FileSaver.js?

[Classybrew:](https://github.com/HsKA-OSGIS/OSTaps/tree/master/module_work/Classybrew) How to use Classybrew to style a Leaflet Choropleth Map?

[Classybrew2Geostyler:](https://github.com/HsKA-OSGIS/OSTaps/tree/master/module_work/Classybrew2Geostyler) How to parse a Classybrew Color object to an appropriate Geostyler object? (to later parse it to a SLD file using Geostyler SLD Parser)

[DownloadFunctionality:](https://github.com/HsKA-OSGIS/OSTaps/tree/master/module_work/DownloadFunctionality) How to download a stand alone HTML with Leaflet content using a multiline string?


### Used JS libraries:

leaflet.js - https://leafletjs.com/

jquery.js - https://jquery.com/

bootstrap.js - https://getbootstrap.com/

popper.js - https://popper.js.org/

download.js - http://danml.com/download.html

fileSaver.js - https://github.com/eligrey/FileSaver.js/

classybrew.js - https://github.com/tannerjt/classybrew

geostyler-sld-parser - https://github.com/terrestris/geostyler-sld-parser

leaflet-image.js - https://github.com/mapbox/leaflet-image
 	
 


 
 


