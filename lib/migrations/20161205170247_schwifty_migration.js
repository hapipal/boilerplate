
exports.up = function(knex, Promise) {

    return Promise.all([

        knex.schema.createTableIfNotExists('Dog', function(table) {

            table.increments('id').unsigned().primary();
            table.timestamps();

            table.string('name');
            table.integer('age');
            table.integer('ownerId');
        }),
        knex.schema.createTableIfNotExists('Person', function(table) {

            table.increments('id').unsigned().primary();
            table.timestamps();

            table.string('firstName');
            table.string('lastName');
            table.integer('age');
            table.json('address');
        })

    ]);
};
exports.down = function(knex, Promise) {

    return Promise.all([

        knex.schema.dropTableIfExists('Dog'),
        knex.schema.dropTableIfExists('Person')

    ]);
};
