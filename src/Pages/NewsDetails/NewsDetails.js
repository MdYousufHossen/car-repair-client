import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Navigation from './../Shared/Navigation/Navigation';
import Footer from './../Shared/Footer/Footer';

const NewsDetails = () => {
    const { id } = useParams()
    const [news, setNews] = useState()

    useEffect(() => {
        fetch(`http://localhost:5000/news/${id}`)
            .then(res => res.json())
            .then(data => setNews(data))
    }, [id])
    return (
        <div>
            <Navigation />
            <div className='container'>
                <h2 className='primary-color text-center'>Our News</h2>
                <img src={news?.image} alt="" />
                <h4>{news?.title}</h4>
                <p>{news?.description}</p>
            </div>

            <Footer />
        </div>
    );
};

export default NewsDetails;