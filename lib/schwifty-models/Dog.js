// import uuid from 'uuid'
const Joi = require('joi');

const Model = require('schwifty').Model;
const Path = require('path');

const internals = {};

module.exports = (srv, options) => {

    return class Dog extends Model {

        static get tableName() {

            return 'Dog';
        }

        static customFunc() {

            return 'Custom func called!';
        }

        static get schema() {

            return Joi.object({

                // Note: in these schemas, whatever is required() is also required when
                // querying for it FROM the database as well.

                name: Joi.string().max(255),
                age: Joi.number().integer(),
                ownerId: Joi.number().integer()
            });
        }
    }
}
