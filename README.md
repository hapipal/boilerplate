
hapi API Boilerplate
===
<img src="http://i.imgur.com/rIPLQNq.jpg" />
A general purpose boilerplate for building APIs with hapi

## Getting Started
Create a new directory; in this example our project is called `my-project`:

```bash
$ mkdir my-project
$ cd my-project/
$ git clone git@github.com:devinivy/boilerplate-api.git .
```

Now install the dependencies and start running the server:

```bash
$ npm i
$ npm start
```

If everything goes well you should see this:

```bash
> boilerplate-api@0.3.0 start /Users/maxfelker/boilerplate-api
> node server
Server started at http://0.0.0.0:3000
```

Now your app is running at [http://0.0.0.0:3000](http://0.0.0.0:3000) :potable_water: hapi boiling!

### Push to your :octocat: repo

Create your repo on Github - we are using `my-project`. Once that is done, set the project's origin and push up the code:

```bash
$ git remote set-url origin git@github.com:your-username/my-project.git
$ git push
```

## Tools :ocean:
Here are a list of tools we include in the project.

Name | Usage
------------ | -------------
[dogwater](https://github.com/devinivy/dogwater) | Integrates the Waterline ORM  
[sails-disk](https://github.com/balderdashy/sails-disk) | A local disk adapter for Waterline ORM
[hoek](https://github.com/hapijs/hoek) | Node utilities shared amongst the extended hapi universe
[joi](https://github.com/hapijs/joi) | Object schema validation
[bassmaster](https://github.com/hapijs/bassmaster) | Batch request plugin for hapi
[poop](https://github.com/hapijs/poop) | hapi plugin for handling uncaught exceptions
[boom](https://github.com/hapijs/boom) | HTTP-friendly error objects
[hapi-swagger](https://github.com/glennjones/hapi-swagger) | A Swagger interface for hapi
[lab](https://github.com/hapijs/lab) | Node.js test framework

## My First Route

More to come
