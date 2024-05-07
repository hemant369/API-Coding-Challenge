const express = require("express");
const router = express.Router();
const movieService = require('../services/movie.services');
const { validationResult } = require('express-validator');
const validateMovie = require('../middleware/validation.middleware');

router.post("/movie", validateMovie, async function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(err => ({ [err.param]: err.msg }));
        return res.status(422).json({
            success: false,
            errors: formattedErrors
        });
    }

    try {
        const { movie_id, movie_title, director_name, released_year, genre, rating } = req.body;
        const movieObj = { movie_id, movie_title, director_name, released_year, genre, rating };

        const status = await movieService.addMovie(movieObj);
        console.log("Movie Creation Status", status);

        res.status(200).json({ success: true, message: "Movie is Created successfully" });
    } catch (error) {
        console.error("Error creating movie:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.get("/movie", async function (req, res) {
    try {
        let movieArray = await movieService.getAllMovie();
        console.log("All Movie Info:");
        res.status(200).json({ success: true, message: movieArray });
    } catch (error) {
        console.error("Error fetching all movies:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.get("/movie/:id", async function (req, res) {
    try {
        const { id } = req.params;
        let movieObj = await movieService.getMovieById(id);
        if (!movieObj) {
            return res.status(404).json({ message: "Movie not found" });
        }
        console.log("Movie Info by Id:");
        res.status(200).json({ success: true, message: movieObj });
    } catch (error) {
        console.error("Error fetching movie by ID:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/movie", async function (req, res) {
    try {
        const { movie_id, movie_title, director_name, released_year, genre, rating } = req.body;
        const movieObj = { movie_id, movie_title, director_name, released_year, genre, rating };

        const status = await movieService.updateMovie(movieObj);
        if (status === "Movie is Updated") {
            console.log(status);
            res.status(200).json({ success: true, message: "Movie is Updated successfully" });
        } else {
            console.log(status);
            res.status(200).json({ success: false, message: "Movie Not Found" });
        }
    } catch (error) {
        console.error("Error updating movie:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.delete("/movie/:id", async function (req, res) {
    try {
        const { id } = req.params;
        const status = await movieService.deleteMovie(id);

        if (status === "Movie is Deleted") {
            console.log(status);
            res.status(200).json({ success: true, message: "Movie is Deleted successfully" });
        } else {
            console.log(status);
            res.status(200).json({ success: false, message: "Movie Not Found" });
        }
    } catch (error) {
        console.error("Error deleting movie:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;

