// import uuid from 'uuid'
const Joi = require('joi');

const Model = require('schwifty').Model;
const Path = require('path');

const internals = {};

module.exports = (srv, options) => {

    return class Person extends Model {

        static get tableName() {

            return 'Person';
        }

        static customFunc() {

            return 'Custom func called!';
        }

        upsert(model) {
            if (model.id) {
               return this.update(model).where('id', model.id);
            } else {
               return this.insert(model);
            }
        }

        static get schema() {

            return Joi.object({

                // Note: in these schemas, whatever is required() is also required when
                // querying for it FROM the database as well.

                firstName: Joi.string().required().max(255),
                lastName: Joi.string().max(255),

                age: Joi.number().integer(),

                address: Joi.object({
                    street: Joi.string(),
                    city: Joi.string(),
                    zipCode: Joi.string()
                })
            });
        }

        static get relationMappings() {

            return {
                dogs: {
                    relation: Model.HasManyRelation,
                    modelClass: require('./Dog')(),
                    join: {
                        from: 'Person.id',
                        to: 'Dog.ownerId'
                    }
                }
            };
        }
    }
}
