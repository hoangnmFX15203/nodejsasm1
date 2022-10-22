import { useState, useEffect } from 'react';

function Genre() {
    const [genreList, setGenreList] = useState([]);
    const [videoList, setVideoList] = useState([]);
    const [videoId, setVideoId] = useState('35');
    useEffect(() => {
        fetch('http://localhost:4000/api/movies/genre?token=8qlOkxz4wq')
            .then((response) => response.json())
            .then((data) => setGenreList(data));
    }, []);

    const genreFind = () => {
        const id = document.getElementById('genre').value;
        setVideoId(id);
        fetch('http://localhost:4000/api/movies/discover/' + `${videoId}` + '?token=8qlOkxz4wq')
            .then((response) => response.json())
            .then((data) => setVideoList(data));
    };

    return (
        <>
            <div>
                <select onChange={genreFind} id="genre" name="genre">
                    {genreList.results &&
                        genreList.results.map((genre) => {
                            return <option value={genre.id}>{genre.name}</option>;
                        })}
                </select>
            </div>
            <div className="movie-list">
                {videoList.results &&
                    videoList.results.map((videos) => {
                        return videos.map((video) => {
                            console.log(video);
                            const title = video.title ? video.title : video.name;
                            return (
                                <div className="movie-detail">
                                    <h3>
                                        {/* {videos.title} ? {videos.title} : {videos.name} */}
                                        {title}
                                    </h3>
                                    <p>{video.overview}</p>
                                </div>
                            );
                        });
                    })}
            </div>
        </>
    );
}

export default Genre;
