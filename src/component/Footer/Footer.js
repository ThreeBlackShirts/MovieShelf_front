import React from 'react';
import 'style/footer.css';

const Footer = () => {
    return (

        <div className="footer-wrap">
            <div className='footer'>
                <div id="footer-orginfo">
                    <a href="https://github.com/ThreeBlackShirts">©ThreeBlackShirts</a>
                </div>
                <div id='footer-sub-wrap'>
                    <div className='footer-sub'>
                        <div className='footer-sub-title'>소개</div>
                        <ul className='footer-sub-list'>
                            <li><a href="https://github.com/ThreeBlackShirts">MovieShelf</a></li>
                            <li><a href="https://github.com/JiniEun">JiniEun</a></li>
                            <li><a href="https://github.com/SShinMJ">SShinMJ</a></li>
                            <li><a href="https://github.com/lama9898">lama9898</a></li>
                        </ul>
                    </div>
                    <div className='footer-sub'>
                        <div className='footer-sub-title'>유용한 링크</div>
                        <ul className='footer-sub-list'>
                            <li><a href="https://movie.naver.com/">네이버 영화</a></li>
                            <li><a href="https://movie.daum.net/main">다음 영화</a></li>
                            <li><a href="https://www.themoviedb.org/">TMDB</a></li>
                            <li><a href="https://www.imdb.com/?ref_=nv_home">IMDb</a></li>
                        </ul>
                    </div>
                    <div className='footer-sub'>
                        <div className='footer-sub-title'>지원</div>
                        <ul className='footer-sub-list'>
                            <li>문의</li>
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>

    );
};

export default Footer;

