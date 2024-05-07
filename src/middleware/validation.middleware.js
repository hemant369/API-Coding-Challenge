const { validationChain, body } = require('express-validator');

const validateMovie = [
    body('movie_title')
        .notEmpty()
        .withMessage('Movie title is required'),

    body('director_name')
        .notEmpty()
        .withMessage('Director name is required'),

    body('released_year')
        .isInt({ min: 1800, max: 9999 })
        .withMessage('Released year must be between 1800 and 9999'),
    body('genre')
        .notEmpty()
        .withMessage('Genre is required'),

    body('rating')
        .isFloat({ min: 0.0, max: 10.0 })
        .withMessage('Rating must be a decimal between 0.0 and 10.0')
];

module.exports = validateMovie;