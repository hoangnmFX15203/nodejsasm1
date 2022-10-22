import { useState, useEffect } from 'react';

function Search() {
    const [search, setSearch] = useState('');
    const [videoList, setVideoList] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:4000/api/movies/search' + '?token=8qlOkxz4wq', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                keyword: search,
            }),
        })
            .then((response) => response.json())
            .then((data) => setVideoList(data));
    };
    return (
        <>
            <div className="container">
                <form className="search" onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" name="keyword" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button className="btn" type="submit">
                        Search
                    </button>
                </form>
            </div>
            <div className="film-list">
                {videoList.result &&
                    videoList.result.map((video) => {
                        return (
                            <div className="film-detail">
                                <h3>{video.title ? video.title : video.name}</h3>
                                <p>{video.overview}</p>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}

export default Search;
