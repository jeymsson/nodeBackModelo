const bcrypt = require('bcryptjs');

module.exports = {
    up: QueryInterface => {
        return QueryInterface.bulkInsert(
            'users',
            [
                {
                    name: 'Administrador',
                    email: 'admin@gympoint.com',
                    password_hash: bcrypt.hashSync('123456', 8),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: () => { },
};
// yarn sequelize seed:generate --name admin-user
// yarn sequelize db:seed:all
