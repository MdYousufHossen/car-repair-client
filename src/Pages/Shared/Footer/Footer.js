import React from 'react';
import './Footer.css';
import logo from '../../Images/logo2.png'

const Footer = () => {
    return (
        <div className="secondary-bg-color ps-lg-4 mt-5 px-3 text-light row footer-bg">
            <div className="col-lg-3 m-lg-5 m-2">
                <img
                    alt=""
                    src={logo}
                    width="235"
                    height="105"
                    className="d-inline-block align-top"
                />{' '}
                <p className=" mt-4 fw-bold">The Women’s Industry Network announced 11 new recipients of the 2021 WIN College Student Tuition and Conference Scholarship Award presented annually to deserving students enrolled in a post-secondary collision repair technology program.
                </p>
                <h6 className="fw-bold mt-5">SUBSCRIBE</h6>
            </div>

            <div className="col-lg-2 mt-5 pt-5  ">
                <h5 className="fw-bold text-warning ">USEFUL LINKS</h5>
                {/* <Nav.Link className="text-light" as={Link} to='/home'>Home</Nav.Link>
            <Nav.Link className="text-light" as={Link} to='/products'>Products</Nav.Link>

            <Nav.Link as={Link} className="text-light" to='/dashboard'>Dashboard</Nav.Link>
            {
                user?.email ? <button className="btn text-light" onClick={logout}>Log out</button>
                    :
                    <Nav.Link className="text-light" as={Link} to='/login'>Login</Nav.Link>

            } */}
            </div>

            <div className="col-lg-6  d-flex  align-items-center justify-content-center">

                <div>
                    <img src="https://web.programming-hero.com/static/media/ssl-commerce.1d268dce.png" alt="" /><br />
                    <div className="text-center mt-5">
                        <i className="fab fa-facebook text-muted fs-3 "></i>
                        <i className="fab fa-twitter text-muted ps-3 fs-3 "></i>
                        <i className="fab fa-instagram-square text-muted ps-3 fs-3 "></i>
                        <i className="fab fa-vimeo-v text-muted ps-3 fs-3 "></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;