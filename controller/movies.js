const fs = require('fs');
const path = require('path');
const Movies = require('../models/movies');
const GenreList = require('../models/GenreList');
const VideosList = require('../models/VideosList');

exports.getMovies = (req, res, next) => {
    let currentPage = req.query.page;
    let skip;
    let end;

    if (!currentPage || currentPage == 1) {
        currentPage = 1;
        skip = 0;
        end = skip + 20;
    } else {
        currentPage = parseInt(currentPage);
        skip = (+currentPage - 1) * 20;
        end = skip + 20;
    }

    Movies.fetchAll((movies) => {
        const list = movies.slice(skip, end);
        console.log(list.length);
        res.send({
            result: list,
            page: 1,
            totalPage: Math.ceil(movies.length + 1 / 20),
            pageSize: 20,
        });
    });
};

exports.getTrendingMovies = (req, res, next) => {
    let currentPage = req.query.page;
    let skip;
    let end;

    if (!currentPage || currentPage == 1) {
        currentPage = 1;
        skip = 0;
        end = skip + 20;
    } else {
        currentPage = parseInt(currentPage);
        skip = (+currentPage - 1) * 20;
        end = skip + 20;
    }

    Movies.fetchAll((movies) => {
        const sortByPopularity = movies.sort((a, b) => {
            return b.popularity - a.popularity;
        });

        const list = sortByPopularity.slice(skip, end);
        res.send({
            results: list,
            page: 1,
            totalPage: Math.ceil(sortByPopularity.length / 20),
            pageSize: 20,
        });
    });
};

exports.getRatingMovies = (req, res, next) => {
    let currentPage = req.query.page;
    let skip;
    let end;

    if (!currentPage || currentPage == 1) {
        currentPage = 1;
        skip = 0;
        end = skip + 20;
    } else {
        currentPage = parseInt(currentPage);
        skip = (+currentPage - 1) * 20;
        end = skip + 20;
    }

    Movies.fetchAll((movies) => {
        const sortByVoteAverage = movies.sort((a, b) => {
            return b.vote_average - a.vote_average;
        });

        const list = sortByVoteAverage.slice(skip, end);
        res.send({
            results: list,
            page: 1,
            totalPage: sortByVoteAverage.length + 1 / 20,
            pageSize: 20,
        });
    });
};

exports.getGenreList = (req, res, next) => {
    GenreList.fetchAll((genres) => {
        res.send({
            results: genres,
        });
    });
};

exports.getMoviesByGenre = (req, res, next) => {
    let currentPage = req.query.page;
    let skip;
    let end;

    if (!currentPage || currentPage == 1) {
        currentPage = 1;
        skip = 0;
        end = skip + 20;
    } else {
        currentPage = parseInt(currentPage);
        skip = (+currentPage - 1) * 20;
        end = skip + 20;
    }
    const genreId = req.params.genreId;
    let moviesList = [];
    let name;
    GenreList.fetchAll((genres) => {
        const genreName = genres.find((genre) => {
            if (genre.id) {
                return genre.id == +genreId;
            } else {
                return {};
            }
        });
        name = genreName;
    });

    Movies.fetchAll((movies) => {
        const findGenreById = movies.filter((movie) => {
            if (movie.genre_ids) {
                return movie.genre_ids.includes(+genreId);
            } else {
                return [];
            }
        });
        moviesList.push(findGenreById);

        let list;
        if (moviesList.length < 20) {
            list = moviesList;
        } else {
            list = moviesList.slice(skip, end);
        }

        return res.send({
            results: list,
            page: 1,
            totalPages: moviesList.length + 1 / 20,
            pageSize: 20,
            genre: name.name,
        });
    });
};

exports.getVideoByMovieId = (req, res, next) => {
    const videoId = req.body.id.movieId;
    let listTrailer = [];
    VideosList.fetchAll((videos) => {
        const videoList = videos.find((v) => v.id == videoId);
        if (videoList) {
            videoList.videos.map((video) => {
                if (video.official && video.site == 'YouTube') {
                    if (video.type == 'Trailer') {
                        return listTrailer.push(video);
                    }
                    if (listTrailer.length == 0) {
                        if (video.type == 'Teaser') {
                            return listTrailer.push(video);
                        } else {
                            return 'No Item Found';
                        }
                    }
                } else {
                    return 'No Item Found';
                }
            });
        } else {
            return 'No Item Found';
        }

        if (listTrailer.length > 1) {
            listTrailer.sort(function (a, b) {
                const c = new Date(a.published_at);
                const d = new Date(b.published_at);
                return d - c;
            });
        }

        return res.send({
            result: listTrailer[0],
        });
    });
};

exports.searchMovies = (req, res, next) => {
    Movies.fetchAll((movies) => {
        const movieSearch = req.body.keyword;
        let searchByKeyword = [];
        if (movieSearch) {
            const movieList = movies.filter((m) => {
                const title = m.title ? m.title : m.name;
                const overView = m.overview ? m.overview : 'no result';

                return (
                    title.toLowerCase() === movieSearch.toLowerCase() ||
                    overView.toLowerCase() === movieSearch.toLowerCase()
                );
            });

            searchByKeyword.push(...movieList);
        }

        if (req.body.genre) {
            return (searchByKeyword = searchByKeyword.filter((list) => {
                if (list.genre_ids) {
                    list.genre_ids.includes(req.body.genre);
                    //     return list.genre_ids.includes((g) => g.id == req.body.genre);
                }
            }));
        }

        if (req.body.mediaType) {
            return (searchByKeyword = searchByKeyword.filter((list) => list.media_type == req.body.mediaType));
        }

        if (req.body.language) {
            return (searchByKeyword = searchByKeyword.filter((list) => list.original_language == req.body.language));
        }

        if (req.body.year) {
            const releaseDate = new Date(searchByKeyword.map((m) => m.release_date));
            const year = releaseDate.getFullYear();
            return (searchByKeyword = searchByKeyword.filter((list) => list.release_date == req.body.year));
        }
        return res.send({ result: searchByKeyword });
    });
};
