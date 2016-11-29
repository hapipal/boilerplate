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
                console.log(Person.customFunc());

                var schemaPromise = request.server.knex.schema.createTableIfNotExists('Person', function (table) {

                    table.increments();
                    table.string('createdAt');
                    table.string('updatedAt');
                    table.string('firstName');
                });

                schemaPromise.then(() => {

                    return Person.query().insert({firstName: request.payload.name});
                })
                .then((person) => {

                    console.log(person);
                    console.log('created:', person.firstName, 'id:', person.id);
                  // Fetch the created person.
                  return Person.query();
                }).then(function (persons) {

                  return reply(persons);
                });
            }
        }
    ];
};