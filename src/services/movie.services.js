const { Op, where } = require("sequelize");
const movieModel = require('..//models/movie.model');

exports.getAllMovie = async () => {
    try {
        let movieArray = await movieModel.findAll();
        return movieArray;
    } catch (error) {
        throw new Error("Failed to get movie: " + error.message);
    }
}

exports.addMovie = async (movieObj) => {
    try {
        await movieModel.create(movieObj);
        return "Movie is created";
    } catch (error) {
        throw new Error("Failed to add movie: " + error.message);
    }
}

exports.getMovieById = async (mid) => {
    try {
        let movieObj = await movieModel.findByPk(mid);
        return movieObj;
    } catch (error) {
        throw new Error("Failed to get movie by Id: " + error.message);
    }
}

exports.updateMovie = async (movieObj) => {
    try {
        const updateCount = await movieModel.update(movieObj, { where: { movie_id: movieObj.movie_id } });
        if (updateCount[0] === 0) {
            return "Movie not found";
        }
        return "Movie is Updated";
    } catch (error) {
        throw new Error("Failed to update movie: " + error.message);
    }
}

exports.deleteMovie = async (mid) => {
    try {
        const deleteCount = await movieModel.destroy({ where: { movie_id: mid } });
        if (deleteCount === 0) {
            return "Movie not found";
        }
        return "Movie is Deleted";
    } catch (error) {
        throw new Error("Failed to Delete movie: " + error.message);
    }
}


