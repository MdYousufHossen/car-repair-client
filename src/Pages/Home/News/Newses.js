import React, { useState } from 'react';
import { Card, Col, ListGroup } from 'react-bootstrap';
import './news.css'
import Fade from 'react-reveal/Fade';

const services = [
    {
        id: 1,
        name: 'Preventative Maintenance',
        description: 'The best way to minimize breakdowns is doing routine maintenance',
        image: 'https://smartdata.tonytemplates.com/car-repair-service-v4/car1/wp-content/uploads/sites/5/2017/03/services-item-img01.jpg',
        price: 50
    },
    {
        id: 2,
        name: 'Brake Repair & Services',
        description: 'Brakes wear out over time requiring service',
        image: 'https://smartdata.tonytemplates.com/car-repair-service-v4/car1/wp-content/uploads/sites/5/2017/03/services-item-img01.jpg',
        price: 89
    },
    {
        id: 3,
        name: 'Brake Repair & Services',
        description: 'Brakes wear out over time requiring service',
        image: 'https://smartdata.tonytemplates.com/car-repair-service-v4/car1/wp-content/uploads/sites/5/2017/03/services-item-img01.jpg',
        price: 89
    },
    {
        id: 4,
        name: 'Brake Repair & Services',
        description: 'Brakes wear out over time requiring service',
        image: 'https://smartdata.tonytemplates.com/car-repair-service-v4/car1/wp-content/uploads/sites/5/2017/03/services-item-img01.jpg',
        price: 89
    }
    ,
    {
        id: 5,
        name: 'Brake Repair & Services',
        description: 'Brakes wear out over time requiring service',
        image: 'https://smartdata.tonytemplates.com/car-repair-service-v4/car1/wp-content/uploads/sites/5/2017/03/services-item-img01.jpg',
        price: 89
    }
    ,
    {
        id: 6,
        name: 'Brake Repair & Services',
        description: 'Brakes wear out over time requiring service',
        image: 'https://smartdata.tonytemplates.com/car-repair-service-v4/car1/wp-content/uploads/sites/5/2017/03/services-item-img01.jpg',
        price: 89
    }
]

// console.log(services[0]);
const Newses = () => {
    const [news, setNews] = useState(services[0])

    const handleDetails = (news) => {
        setNews(news)
    }
    return (
        <div className="news-bg ">
            <h3 className="text-center primary-color fw-bold  my-5 py-5 "> Our News</h3>
            <div className="row m-2 py-5 mx-auto">
                <Fade left>
                    <div className="col-lg-6" >
                        {
                            services.map(news =>
                                <ListGroup className="textHover" defaultActiveKey="#link1" key={news.id}>
                                    <ListGroup.Item className="bg-transparent text-light  border-light " action onClick={() => handleDetails(news)}>
                                        {news.name}
                                    </ListGroup.Item>
                                </ListGroup>,
                            )
                        }
                    </div>
                </Fade>
                <Fade right>
                    <div className="col-lg-6" >
                        <Col>
                            <Card className="bg-transparent text-light border-light " style={{ width: '80%' }}>
                                <Card.Img variant="top" src={news.image} />
                                <Card.Body>
                                    <Card.Title>{news.name}</Card.Title>
                                    <Card.Text>
                                        {news.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </div>
                </Fade>
            </div>
        </div>
    );
};

export default Newses;