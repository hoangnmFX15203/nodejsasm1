import Home from '../pages/Home';
import Genre from '../pages/Genre';
import Rating from '../pages/Rating';
import Trending from '../pages/Trending';
import Trailer from '../pages/Trailer';
import Search from '../pages/Search';

const publicRoute = [
    { path: '/', component: Home },
    { path: '/genre', component: Genre },
    { path: '/rating', component: Rating },
    { path: '/trending', component: Trending },
    { path: '/trailer/:movieId', component: Trailer },
    { path: '/search', component: Search },
];

export default publicRoute;
