# NodePaymentModule
Node Payment Module for major project

# How To Guide:
You will need Github Desktop, and Visual Studio Code

1. Download Github Desktop [Here](https://desktop.github.com/)
2. Clone this repo, to somewhere
3. Download [Visual Studio Code](https://code.visualstudio.com/) (not visual studios 2015/2017)
4. Open VSCode, open the folder to begin editing.
5. After editting, use COMMIT & PUSH to update the source by github desktop

To get the updated source codes, PULL by github desktop.

To run tests, you need Node.js and its NPM to run.

# Requirements
Part 1:
An API that enables users to send payment requests. The API will help process the payment and respond either success or error (with the appropriate error messages)

# What are these initial commit files?
### main.js
This is the main file that is run (like main method of java) when the server boots up. Any init code can be placed here.

### package.json
This is the file that defines this node module. The description, name and version are here. In addition, the dependencies, licenses and scripts are found here.

### index.html
This is the main page of the node.js server that is sent when receiving a request. We may not require this as we can use React.js to build up dynamic responses based on the request that is sent by the requester.

# How do I know what file type (e.g. .js/.html) to use?
### HTML files
HTML files are used for showing the output or things such as a form

### JS files
JS files are used to define the code that will be run by node.js

Also can be used as animation functions for HTML, etc

You will need to output HTML code OR HTML files as the response when dealing with requests.

### CSS files
You may use css files to style the html files via linking

### JSON files
JSON files are for storage of properties
