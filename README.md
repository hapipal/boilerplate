<img src="http://i.imgur.com/LKv5XMA.jpg" />

# Boilerplate API

A general purpose boilerplate for building APIs with hapi

## Getting Started
In this example our project is called `my-project` :droplet:

```bash
$ curl -LOk https://github.com/devinivy/boilerplate-api/archive/master.zip
$ unzip master.zip
$ mv boilerplate-api-master/ my-project/
$ cd my-project/
```

Now install the dependencies and start running the server :ocean:

```bash
$ npm install
$ npm start
```

If everything goes well you should see this :surfer:

```bash
> boilerplate-api@0.3.0 start /Users/maxfelker/my-project
> node server
Server started at http://0.0.0.0:3000
```

Now your app is running at [http://0.0.0.0:3000](http://0.0.0.0:3000) :potable_water: hapi boiling!

### Tools
Here are a list of tools we include in the project :octocat:

Name | Description
------------ | -------------
[dogwater](https://github.com/devinivy/dogwater) | Integrates the Waterline ORM  
[sails-disk](https://github.com/balderdashy/sails-disk) | A local disk adapter for Waterline ORM
[haute-couture](https://github.com/devinivy/haute-couture) | File-based hapi plugin composer
[glue](https://github.com/hapijs/glue) | Server composer for hapi.js
[hoek](https://github.com/hapijs/hoek) | Node utilities shared amongst the extended hapi universe
[joi](https://github.com/hapijs/joi) | Object schema validation
[bassmaster](https://github.com/hapijs/bassmaster) | Batch request plugin for hapi
[boom](https://github.com/hapijs/boom) | HTTP-friendly error objects
[hapi-swagger](https://github.com/glennjones/hapi-swagger) | A Swagger interface for hapi
[lab](https://github.com/hapijs/lab) | Node.js test framework
[labbable](https://github.com/devinivy/labbable) | No-fuss hapi server testing

## My First Boil
In this simple example, we're going show you how to setup an endpoint where we can get a list of `dogs` as well as
 create and update `dogs`.

### Create the Model

 In order for the application to store and retrieve data from the database, we need to setup a model definition for `dogs`.
 We place our model definition in `lib/models/dogs.js`. This model definition is simple - we'll
 just save the `name` and `type` of `dog` for now.

 We prefer model identities to be plural (e.g. `dogs` not `dog`) and dash-case (e.g. `dog-houses` not `dogHouses` or `dog_houses`).  When possible, the filename containing a model definition should be named with the model identity, so `lib/models/dog-houses.js` will contain the `dog-houses` model definition. It should be noted that when dealing with Waterline, this means that you'll need to exercise special care when accessing models via `request.collections()` - fetching `dog-houses` requires you to type `request.collections()['dog-houses']`.

 ```js
 'use strict';

 module.exports = {
     identity: 'dogs',
     connection:'diskDb',
     attributes: {
       name: {
         type: 'string',
         required: true
       },
       type: {
         type: 'string',
         required: true
       }
     }
 };
 ```

### Create the Route
We need to create a route definition for our `dogs`. We do this by creating a file in `lib/routes/dogs.js`. `haute-couture` will find your plugin and start using it the next time the server is started.

We also prefer dash-casing of routes (e.g. `dogs/change-houses` not `dogs/changeHouses`) and the base of the route should be the same as the model identity (e.g. `dogs/change-houses` not `dog/change-houses`). When possible the route definitions should be in a file with the same name as the model the routes are interacting with, so `lib/routes/dog-house.js` will contain the routes for the `dog-houses` model.

Below you'll see a `GET` route that retrieves a list of `dogs`
by using `dogwater` to integrate with `sails-disk` DB. After that, we see a `POST` route that creates a `dog` with the specific `type` and `name` of the `dog`.

```js
'use strict';

module.exports = [
  {
    method: 'get',
    path: '/dogs',
    config: {
      tags: ['api'],
      handler: (request, reply) => {

        const Dogs = request.collections().dogs;

        reply(Dogs.find());
      }
    }
  },
  {
    method: 'post',
    path: '/dogs',
    config: {
      tags: ['api'],
      handler: (request, reply) => {

        const Dogs = request.collections().dogs;

        reply(Dogs.create({
          type: request.payload.type,
          name: request.payload.name
        }));
      }
    }
  },
];
```

### Test It Out!
With both of these files in place, restart your server and browse to the `dogs` http://0.0.0.0:3000/dogs :dog: You should get back an empty array.

Time to make a `dog`! Make a `POST` request to the `dogs` endpoint:

```bash
curl --data "name=Gus&type=Leonberger" http://0.0.0.0:3000/dogs
```

Now browse back to http://0.0.0.0:3000/dogs and you should get a response like this:

```json
[
  {
    "type":"Leonberger",
    "name":"Gus",
    "createdAt":"2016-06-15T15:11:58.477Z",
    "updatedAt":"2016-06-15T15:11:58.477Z",
    "id":1
  }
]
```

### Check My Swag
With `hapi-swagger`, it's easy to see your new routes, docs and test out what you just built:

http://0.0.0.0:3000/swagger
