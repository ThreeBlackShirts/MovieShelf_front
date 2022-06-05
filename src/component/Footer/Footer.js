import React from 'react';
import 'style/footer.css';

const Footer = () => {
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
                    <a className="footer-links" >문의</a>
                </div>
                
            </div>
        </div>
    );
};

export default Footer;

