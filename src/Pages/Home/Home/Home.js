import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navigation from '../../Shared/Navigation/Navigation';
import Banner from '../Banner/Banner';
import Guarantee from '../Guarantee/Guarantee';
import Newses from '../News/Newses';
import Services from '../Services/Services';
import Testimonials from '../Testimonials/Testimonials';


const Home = () => {
    return (
        <div >
            <Navigation />
            <Banner />
            <Guarantee />
            <Services />
            <Newses />
            <Testimonials />
            <Footer />
        </div>
    );
};

export default Home;