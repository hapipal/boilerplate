// import uuid from 'uuid'
const Model = require('hapiObjection').Model;

module.exports = (srv, options) => {

    return class Dog extends Model {

        static get tableName() {
            return 'Dog';
        }

        static customFunc() {
            return 'Custom func called!';
        }

        fullName() {
            return this.firstName + ' ' + this.lastName;
        }
    }
}
