module.exports = function(sequelize, dataTypes) {
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
	    email: {
                type: dataTypes.STRING(255),
                allowNull: false
        },
	    password: {
                type: dataTypes.STRING(255),
                allowNull: false
        },
        // remember_token: dataTypes.STRING(255),
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        // rol: {
        //     type: dataTypes.TINYINT(4),
        // }
    }

    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false,
        tableName: "users"
    }

    let User = sequelize.define(alias, cols, config);
    return User;
}