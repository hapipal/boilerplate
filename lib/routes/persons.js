'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = (server, options) => {

    return [

        {
            method: 'GET',
            path: '/persons',
            config: {
                description: 'Get all people',
                tags: ['api']
            },
            handler: (request, reply) => {

                const Person = request.collections().person;

                // eager is like populate in Waterline
                Person.query()
                .eager('dogs')
                .then(function (people) {

                  return reply(people);
                })
                .catch((err) => {
                    return reply(Boom.wrap(err));
                });
            }
        },
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
                    return reply(Boom.wrap(err));
                });
            }
        },
        {
            method: 'GET',
            path: '/own/doggie/{personId}/{dogId}',
            config: {
                description: 'Buy a doggie',
                tags: ['api'],
                validate: {
                    params: {
                        personId: Joi.number().required(),
                        dogId: Joi.number().required()
                    }
                }
            },
            handler: (request, reply) => {

                const Person = request.collections().person;
                const Dog = request.collections().dog;

                console.log(request.params.personId);

                Person.query().where('id', request.params.personId)
                .then((person) => {

                    console.log(request.params.dogId);
                    return person[0].$relatedQuery('dogs').relate(request.params.dogId);
                }).then((res) => {

                    return reply('Person '+ request.params.personId +' now owns dog '+ request.params.dogId +'! ' + res);
                })
                .catch((err) => {

                    console.log(err);
                    return reply(Boom.wrap(err));
                });
            }
        }
    ];
};
