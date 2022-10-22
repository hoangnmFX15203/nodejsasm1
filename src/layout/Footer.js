import { useState } from 'react';
import { Link } from 'react-router-dom';

const pageSize = 20;

function Footer(data, currentPage) {
    //     const totalPages = data.length / pageSize;
    //     return (
    //         <div className="footer">
    //             <div className="pagination-container">
    //                 <nav aria-label="Page navigation example">
    //                     <ul class="pagination">
    //                         <li class="page-item">
    //                             <a class="page-link" href="#">
    //                                 Previous
    //                             </a>
    //                         </li>
    //                         {data.map((film, index) => {
    //                             return (
    //                                 <li class="page-item">
    //                                     <a class="page-link" href="#">
    //                                         {index}
    //                                     </a>
    //                                 </li>
    //                             );
    //                         })}
    //                         <li class="page-item">
    //                             <a class="page-link" href="#">
    //                                 Next
    //                             </a>
    //                         </li>
    //                     </ul>
    //                 </nav>
    //             </div>
    //         </div>
    //     );
}

export default Footer;
