const sequelize = require("sequelize");
const db = require("../database/db");

const movie = db.define(
    'Movie',
    {
        movie_id: { type: sequelize.INTEGER, primaryKey: true },
        movie_title: { type: sequelize.STRING(255) },
        director_name: { type: sequelize.STRING(255) },
        released_year: { type: sequelize.INTEGER },
        genre: { type: sequelize.STRING(100) },
        rating: { type: sequelize.DECIMAL(2, 1) }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = movie;
