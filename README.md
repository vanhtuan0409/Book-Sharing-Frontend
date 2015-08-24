# Book Sharing Client Document
## Getting Started
### Prerequisites
You need git to clone the Book Sharing Backend repository. You can get git from http://git-scm.com/.  
You also must have node.js and its package manager (npm) installed. You can get them from http://nodejs.org/.
### Clone directory from Git
Clone the Book-Sharing-Frontend using Git
```
https://github.com/vanhtuan0409/Book-Sharing-Frontend.git
cd Book-Sharing-Frontend
```
### Install Dependencies
Run this command to install dependencies using node.js tool npm
```
npm install
```
### Running the server
Run this command to start the server
```
npm start
```

## Directory Layout
This directory layout is based on SailsJS framework. For more information please visit http://sailsjs.org/documentation/
```
app/              <--- all source file location
   views/         <--- all angularJS component
   app.css        <--- contains application CSS
   app.js         <--- contains application bootstrap code
   controllers.js <--- package of all views in 1 file  
   service.js     <--- contains app service like authen,...
   index.html
```

## Application components
Every application components contains 2 file:
* component.html
* component.js

Component.html contains layout. Component.js contain logic and routing information

## Translation system
Mapping included inside app.js