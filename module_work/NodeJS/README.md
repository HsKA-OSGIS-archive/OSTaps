# Introduction on how to use "require()" functionality and make it browser compatible using "browserify" and "watchify"

## How to use this:

### Install NodeJS and the package manager npm
Linux: 
```
sudo apt-get install nodejs
sudo apt-get install npm
```

Windows:
https://nodejs.org/en/download/<br> 
-> is automaticaly connected to windwos system variable path<br> 
-> npm is installed within

### Install "browserify" and "watchify"
```
npm install --global browserify
npm install --global watchify
```

### Usage

- Install the needed packages by calling
```
npm install 
```

- Browserify the Javascript-Files which are using "require()" functionality 
```
npm run build 
```

- Open the index.html and the console to see if the Script is working

- For developing call 
```
npm run watch 
```
-> changes you make in the parser.js file are automatically "browserified" using "watchify"


## How to rebuild this:

### Initialise project
Go to an (empty) folder where you want to create the nodeJS project and run
```
npm init
```

This will guide you through an process of building the package.json file.
Enter name, version, description.. or simply use the default values.

In your folder you should now see the package.json file. 
Have a look in it:
```
{
  "name": "nodejs",
  "version": "1.0.0",
  "description": "Introduction on how to use \"require\" functionality",
  "main": "index.js",
  "scripts": {
    "test": "echo hello there!"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/HsKA-OSGIS/OSTaps/NodeJS"
  },
  "keywords": [
    "node",
    "npm",
    "require",
    "browserify",
    "watchify"
  ],
  "author": "Lukas Weber",
  "license": "BSD-2-Clause"
}

```

### Install a package you want to use
Using nodeJS you can simply install packages by calling 
```
npm install package
```

For this example we'll install the geostyler-sld-parser (https://github.com/terrestris/geostyler-sld-parser)<br> 
(you need to be in the folder where the package.json file is located):
```
npm install geostyler-sld-parser
```
1. a "node_modules" folder is created, where the installed packages are stored
2. inside the "node_modules" folder you find the desired package (geostyler-sld-parser), but also several other packages. When you open the "package.json" in the folder "geostyler-sld-parser", you see that there are dependencies defined which are needed to run the geostyler-sld-parser. All these packages are installed cascading. 
3. a "package-lock.json" file is created (not important for now)
4. when you reopen the package.json file of your main package/project you'll see that there have been changes by the installation:
```
  "dependencies": {
    "geostyler-sld-parser": "^0.18.0"
  }
```
That means your project/package now knows that it needs "geostyler-sld-parser" to be run sucessfully.
All dependencies are installed automatically by calling:
```
npm install
```
This is important to know because we don't want to include the "node_modules" folder into our 
GitHub repository (it can be really big). If we clone the repository it should be easy
to install all needed packages and this is done by defining all dependencies in the package.json file.

To check how this works delete the "node_modules" folder.
Now run:
```
npm install
```
You see, npm installs the geostyler-sld-parser package and its dependencies again without the need of defining its name, because it's stated in the dependencies entry of package.json.

### Add a .gitignore file to prevent the upload of the "node_modules" folder and the "package-lock.json" file

1. Create an .gitignore file
2. Insert
```
# No staging of following files/folders:
node_modules/
package-lock.json
```

### Create html and js to use the package
In your main folder create a html file and insert
```html
<html>
  <head>
    <script src="./js/parser.js"></script>
  </head>
  <body>
    <p>This is my Geostyler SDL Parser</p>
  </body>
</html>
```
and create a new folder "js" which includes a "parser.js" file with:
```javascript
var GeoStylerSLDParser = require("geostyler-sld-parser");

const pointSimplePoint = {
  name: "My Style",
  rules: [
    {
      name: "My Rule",
      symbolizers: [
        {
          kind: "Mark",
          wellKnownName: "Circle",
          color: "#FF0000",
          radius: 6
        }
      ]
    }
  ]
};
var parser = new GeoStylerSLDParser.SldStyleParser();
parser
  .writeStyle(pointSimplePoint)
  .then(function(style) {
    console.log(style);
  });
```

If you now open the html page and open the console, you'll find an ***ReferenceError: require is not defined*** error.<br>
This is thrown because browsers do not know how to handle require statements. We need to make a browser-readable file out of the curent js file

### Make your Javascript browser readable using "browserify"
First install browserify
```
npm install --global browserify
```

now you can convert the javascript file to an browser readable js file by calling
```
browserify js/parser.js -o js/parserBrowserified.js
```
To test it change the script import in the html from
```html
<script src="./js/parser.js"></script>
```
to 
```html
<script src="./js/parserBrowserified.js"></script>
```
and open the html + console again. You should now see a parsed xml file.

### Create a build routine for multiple scripts
Imagine you have multiple script that need to be browserified. You don't want to call browserify js/parser.js -o js/parserBrowserified.js
for each script you have everytime. In your "package.json" file you can therefore add an script for the building:

```
  "scripts": {
    "test": "echo hello there!",
    "build": "browserify js/parser.js -o js/parserBrowserified.js"
  },

```

this will now browserify your parser.js script when running 

```
npm run build
```

if you have several scripts you can add them to the build script by using &&:

```
  "scripts": {
    "test": "echo hello there!",
    "build": "browserify js/parser.js -o js/parserBrowserified.js && echo wait for it ..... && echo Builded!!!"
  },

```

just replace the "echo" statements with other "browserify" statements

***Note:*** If you don't want to upload browserified scripts to your GitHub repository add them to your .gitignore, e.g. js/parserBrowserified.js

### Use "watchify" during your development
While you programm your JS you want to test the changes immediately and not with calling "npm run build" everytime before you open the browser. 
"Watchify" therefore listens for changes you make in the original JS-file and "browserifies" it each time you save the changes so you do not 
need to worry about making your scripts browser readable during development. For this you also need to install "watchify" first.
```
npm install --global watchify
```

to call watchify for one Javascript file run

```
watchify js/parser.js -o js/parserBrowserified.js -v
```

-> make some changes in "parser.js" to see how it works


You can also build a "watch"-routine to be able to call "npm run watch" and shorten the "watchify js/parser.js -o js/parserBrowserified.js -v" command:
```
  "scripts": {
    "test": "echo hello there!",
    "build": "browserify js/parser.js -o js/parserBrowserified.js",
    "watch": "watchify js/parser.js -o js/parserBrowserified.js -v"
  },

```
***BUT:*** you can not watch multiple files here because one watch blocks the console!

### Minimize the result for production mode using uglifyjs

Install uglify-js package:

```
npm install uglify-js
```

then use the package to minify the browserified JS

```
browserify js/parser.js  | uglifyjs -cm > js/parser.js
```

 
