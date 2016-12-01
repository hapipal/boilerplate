'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = (server, options) => {

    return [

        // - Saved answer CRUD -
        {
            method: 'POST',
            path: '/persons',
            config: {
                description: 'Create person',
                tags: ['api'],
                validate: {
                    payload: {
                        name: Joi.string().required()
                    }
                }
            },
            handler: (request, reply) => {

                const Person = request.collections().person;

                // You can have custom funcs for model-specific ops
                // console.log(Person.customFunc());

                Person.query().insert({
                    firstName: request.payload.name
                })
                .then((person) => {

                  // return all people
                  return Person.query();
                }).then(function (people) {

                  return reply(people);
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        }
    ];
};