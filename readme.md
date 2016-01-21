Data Pile Server
================

A simple backend server to help build Single Page Applications (Native Web) by providing a simple CRUD database that is easily reset to an original state on startup.  The server allows you to build customized responses to all CRUD operations but will assume operations you may not have thought of or care about.

### Setup
There is a mock-data folder with the server.  Here you will see a couple examples already built for you.  To build out the server responses you simply need to create the array responses.  The Data Pile will then assume CRUD operations on these arrays given each has an "_id" attribute.

.. TODO more stuff...