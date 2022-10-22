import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Trailer(props) {
    const [trailer, setTrailer] = useState([]);
    const id = useParams();
    useEffect(() => {
        fetch('http://localhost:4000/api/movies/video?token=8qlOkxz4wq', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id,
            }),
        })
            .then((response) => response.json())
            .then((data) => setTrailer([data]));
    }, []);

    return (
        <div>
            {trailer &&
                trailer.map((video) => {
                    console.log(video.result);
                    return <h3>{video.result.key}</h3>;
                })}
        </div>
    );
}

export default Trailer;
