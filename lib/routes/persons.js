'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = (server, options) => {

    return [

        // - Saved answer CRUD -
        {
            method: 'GET',
            path: '/persons',
            config: {
                description: 'Get all persons',
                tags: ['api']
            },
            handler: (request, reply) => {

                const Person = request.server.collections().Person;

                var schemaPromise = request.server.knex.schema.createTableIfNotExists('Person', function (table) {

                    table.string('createdAt');
                    table.string('updatedAt');
                    table.string('firstName');
                });

                schemaPromise.then(() => {

                    return Person.query().insert({firstName: 'Bill'})
                })
                .then(function (person) {

                    console.log(person);
                    console.log('created:', person.firstName, 'id:', person.id);
                  // Fetch the created person.
                  return Person.query().where('firstName', 'Bill');
                }).then(function (persons) {

                  console.log('Bills:', persons);
                  return reply(persons);
                });
            }
        }
    ];
};