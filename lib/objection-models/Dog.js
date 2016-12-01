// import uuid from 'uuid'
const Joi = require('joi');

const Model = require('hapiObjection').Model;
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

            // Here's how you extend a parent's schema;

            // const superSchema = super.jsonSchema;
            // if(superSchema) {
            //     return superSchema.keys(internals.schema);
            // } else {
                return Joi.object(internals.schema);
            // }
        }

        static get relationMappings() {

            return internals.relationships;
        }
    }
}

internals.schema = {

    name: Joi.string().required().max(255),
    age: Joi.number().integer(),
    ownerId: Joi.number().integer()
};
