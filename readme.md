Data Pile Server
================

A simple backend server to help build Single Page Applications (Native Web) by providing a simple CRUD database that is easily reset to an original state on startup.  The server allows you to build customized responses to all CRUD operations but will assume operations you may not have thought of or care about.

### Setup
To install via NPM run:

````
npm install datapile
````

By default the server will look to a folder called "mock-data".  Create this folder much the same as it's build out in the "mock-data" folder in this project.

A recommended way to start the server is to add a script item in your package.json:

````
  "mockserver": "datapile"
````

### CLI
You can send in the same items into the command line (or in the scripts section of your package.json):

````
datapile --port 3001 --host 0.0.0.0 --dataFolder "mock-data" --delay -1
````

#### Arguments

| Argument | Role | Default |
| ------------- | ------------- | ------------- |
| `port` | The port to run on | 3001 |
| `host` | The host to serve on | "localhost" |
| `dataFolder` | The folder to serve up | "./mock-data" |
| `delay` | The ms delay to introduce to the responses. -1 = random (0-1000) | 0 |

### Usage

In the mock-data folder you create, you will need to create a `.json` file for all interactions you will have with the data.  The server attaches `_GET.json`, `_POST.json`, `_PUT.json`, `_DELETE.json` to the end of the requested urls.

The items in the mock-data folder part of this project are a working example.

#### Proxy Server

To closer imitate a proxy server, this server also checks for a header called `"original-url"` and uses that if present.  This allows you to always hit the same endpoint (say /service*) and send original url to more closely mimic a proxy server (like netflix Zuul).

### Admin

If you hit the root of the server that is running, you will see the admin screen. Currently it's a work in progress, but it does allow you to alter the responses of the server at any given moment.  This is handy when you want to test authentication or server errors.

### Features

There is a mock-data folder with the server.  Here you will see a couple examples already built for you.  To build out the server responses you simply need to create the array responses.

### TODO

There's a ton of untested portions of this application, use at your own peril.  It's definitely not meant to be a production server.  If something doesn't work for you, feel free to dive in and make a PR.  Otherwise it's MIT so grab this thing and go crazy with it!  This is honestly my first attempt at an NPM dependency.

* More dynamic JSON loading and assumptions
* Allow the database to be altered
* Quickly reset the database to an initial state
* Better CLI error handling
* Allow the admin page to set the response code