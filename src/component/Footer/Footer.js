import React from 'react';
import 'style/footer.css';

const Footer = () => {

    function askUs(){
        alert("문의는 github 또는 github 프로필에 연결된 링크로 주시면 감사하겠습니다! ");
    }

    return (

        <div className="footer-wrap">
            <div className='footer'>
                <div className="footer-orginfo">
                    <a className="footer-links" href="https://github.com/ThreeBlackShirts">©ThreeBlackShirts</a>
                </div>
                <div className='footer-about'>
                    <a className="footer-links" href="https://github.com/JiniEun">JiniEun</a>
                    &nbsp; | &nbsp;
                    <a className="footer-links" href="https://github.com/SShinMJ">SShinMJ</a>
                    &nbsp; | &nbsp;
                    <a className="footer-links" href="https://github.com/lama9898">lama9898</a>
                    &nbsp; | &nbsp;
                    <a className="footer-links" onClick={askUs}>문의</a>
                </div>
                
            </div>
        </div>
    );
};

export default Footer;

