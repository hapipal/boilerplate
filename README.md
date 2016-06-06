hapi API Boilerplate
===
A general purpose boilerplate for building APIs with hapi

## Getting Started
Create a new directory; in this example our project is called `my-project`:

```bash
$ mkdir my-project
$ cd my-project/
$ git clone git@github.com:devinivy/boilerplate-api.git .
$ npm i
```

Now start running the server with `npm start`:

```bash
$ npm start
$ > boilerplate-api@0.3.0 start /Users/maxfelker/boilerplate-api
$ > node server
$ Server started at http://0.0.0.0:3000
```

#### Push to your :octocat: repo

First, create your repo - we are using `my-project`. Once that is done, set the project's origin and push up the code:

```bash
$ git remote set-url origin git@github.com:your-username/my-project.git
$ git push
```

:potable_water: hapi boiling!

## Tools :ocean:
Here are a list of tools we include in the project.

Name | Usage
------------ | -------------
[dogwater](https://github.com/devinivy/dogwater) | integrates the Waterline ORM  
[bassmaster](https://www.npmjs.org/package/bassmaster) | handles batch requests
lab | test suite
poop | uncaught errors
hoek | utils and assertions
joi | payload validation
boom | standard HTTP errors
hapi-swagger | API documentation
sails-disk | stand-in persistent database

## My First Route

Here is some text about this
