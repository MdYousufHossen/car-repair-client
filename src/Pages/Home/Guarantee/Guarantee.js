import React from 'react';
import icon1 from '../../Images/icon/car-repair.png'
import icon2 from '../../Images/icon/settings.png'
import icon3 from '../../Images/icon/customer-service.png'
import Fade from 'react-reveal/Fade';

const Guarantee = () => {
    return (
        <div className="container my-5">
            <h2 className="text-center primary-color fw-bold mb-3">100% Result Guarantee</h2>
            <p className="text-center text-muted mb-5">We offer full service auto repair & maintenance</p>
            <div className="row">
                <Fade left>
                    <div className="col-lg-4 d-flex">
                        <div className="me-3">
                            <img style={{ width: 60, height: 60 }} src={icon1} alt="" />
                        </div>
                        <div>
                            <h4 className="secondary-color">All Car Makes</h4>
                            <p className="text-muted">We provide a variety of repair and maintenance services for all car makes and models, even for exotic and vintage ones.
                            </p>
                        </div>
                    </div>
                </Fade>
                <Fade top>
                    <div className="col-lg-4 d-flex">
                        <div className="me-3">
                            <img style={{ width: 60, height: 60 }} src={icon2} alt="" />
                        </div>
                        <div>
                            <h4>Variety Services</h4>
                            <p className="text-muted">The main principle of our work is to offer a wide range of quality car repair services and we’ve been doing it since our first day.
                            </p>
                        </div>
                    </div>
                </Fade>
                <Fade right>
                    <div className="col-lg-4 d-flex">
                        <div className="me-3">
                            <img style={{ width: 60, height: 60 }} src={icon3} alt="" />
                        </div>
                        <div>
                            <h4>Quality Support</h4>
                            <p className="text-muted">Car Repair Services offers quality support programs for any vehicles that allow them to always stay fully functional.
                            </p>
                        </div>
                    </div>
                </Fade>

            </div>
        </div>
    );
};

export default Guarantee;