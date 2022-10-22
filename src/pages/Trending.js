import { useState, useEffect } from 'react';

function Trending() {
    const [videoList, setVideoList] = useState([]);
    const [number, setNumber] = useState('1');
    let pageNumber = [];

    useEffect(() => {
        fetch('http://localhost:4000/api/movies/trending?token=8qlOkxz4wq' + `&page=${number}`)
            .then((response) => response.json())
            .then((data) => setVideoList(data));
    }, []);

    useEffect(() => {
        fetch('http://localhost:4000/api/movies/trending?token=8qlOkxz4wq' + `&page=${number}`)
            .then((response) => response.json())
            .then((data) => setVideoList(data));
    }, [number]);

    const totalPage = parseInt(videoList.totalPage);

    for (let i = 1; i <= totalPage; i++) {
        pageNumber.push({ page: i });
    }

    const findVideoByMoiveId = (e, id) => {
        e.preventDefault();
    };
    return (
        <div className="container">
            <ul className="list-movie">
                {videoList.results &&
                    videoList.results.map((video) => {
                        return (
                            <li key={video.id} className="movie-name">
                                <h4>{video.title}</h4>
                                <p>{video.overview}</p>
                                <form method="post" onSubmit={(e) => findVideoByMoiveId(e, video.id)}>
                                    <input type="hidden" name="movieId" value={video.id} />
                                    <button type="submit" className="submit-btn">
                                        Trailer
                                    </button>
                                </form>
                            </li>
                        );
                    })}
            </ul>

            {/* Phan trang */}
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#">
                            Previous
                        </a>
                    </li>

                    {pageNumber.map((page) => {
                        return (
                            <li className="page-item">
                                <a className="page-link" onClick={() => setNumber(page.page)}>
                                    {page.page}
                                </a>
                            </li>
                        );
                    })}
                    <li className="page-item">
                        <a className="page-link" href="#">
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Trending;
