import { useState } from 'react';

function Header() {
    const [id, setId] = useState('');
    const [videoList, setVideoList] = useState([]);
    const API = 'https://localhost:4000/api/movies/video/';
    const handleSubmit = () => {
        setId('361743');
        const videoId = document.getElementById('id').value;
        fetch(API, {
            method: 'POST',
            body: JSON.stringify(videoId),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((response) => setVideoList(response));
        console.log(videoList);
    };
    return (
        <div className="nav-bar">
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/trending">Trending</a>
                </li>
                <li>
                    <a href="/rating">Top Rate</a>
                </li>
                <li>
                    <a href="/genre">Genre</a>
                </li>
                <li>
                    <a href="/search">Search</a>
                </li>
            </ul>
        </div>
    );
}

export default Header;
