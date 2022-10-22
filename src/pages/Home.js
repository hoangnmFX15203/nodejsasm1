import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [videoList, setVideoList] = useState([]);
    const [number, setNumber] = useState('1');
    let pageNumber = [];

    useEffect(() => {
        fetch('http://localhost:4000/home?token=8qlOkxz4wq' + `&page=${number}`)
            .then((response) => response.json())
            .then((data) => setVideoList(data));
    }, []);

    useEffect(() => {
        fetch('http://localhost:4000/home?token=8qlOkxz4wq' + `&page=${number}`)
            .then((response) => response.json())
            .then((data) => setVideoList(data));
    }, [number]);

    const totalPage = parseInt(videoList.totalPage);

    for (let i = 1; i <= totalPage; i++) {
        pageNumber.push({ page: i });
    }

    const findVideoByMoiveId = (e, id) => {
        e.preventDefault();
        // fetch('http://localhost:4000/api/movies/video?token=8qlOkxz4wq', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         movieId: id,
        //     }),
        // })
        //     .then((response) => response.json())
        //     .then((data) => setTrailer(data));
    };
    return (
        <div className="container">
            <ul className="list-movie">
                {videoList.result &&
                    videoList.result.map((video) => {
                        const link = `/trailer/${video.id}`;
                        return (
                            <li key={video.id} className="movie-name">
                                <h4>{video.title}</h4>
                                <p>{video.overview}</p>
                                <form method="post" onSubmit={(e) => findVideoByMoiveId(e, video.id)}>
                                    <input type="hidden" name="movieId" value={video.id} />
                                    <button type="submit" className="submit-btn">
                                        <Link to={link}>Trailer</Link>
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

export default Home;
