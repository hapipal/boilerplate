'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = (server, options) => {

    return [

        {
            method: 'GET',
            path: '/dogs',
            config: {
                description: 'Get all dogs',
                tags: ['api']
            },
            handler: (request, reply) => {

                const Dog = request.models().dog;


                Dog.query().then(function (dogs) {

                  return reply(dogs);
                })
                .catch((err) => {
                    return reply(Boom.wrap(err));
                });
            }
        },
        {
            method: 'POST',
            path: '/dogs',
            config: {
                description: 'Create doggie',
                tags: ['api'],
                validate: {
                    payload: {
                        name: Joi.string().required()
                    }
                }
            },
            handler: (request, reply) => {

                const Dog = request.models().dog;

                // You can have custom funcs for model-specific ops
                // console.log(Dog.customFunc());

                Dog.query().insert({
                    name: request.payload.name
                })
                .then((dog) => {

                  // return all people
                  return Dog.query();
                }).then(function (dogs) {

                  return reply(dogs);
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        }
    ];
};
