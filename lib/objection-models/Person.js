// import uuid from 'uuid'
const Model = require('hapiObjection').Model;

module.exports = (srv, options) => {

    return class Person extends Model {

        static get tableName() {
            return 'Person';
        }
    }
}
