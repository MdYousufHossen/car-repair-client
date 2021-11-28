import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import car1 from '../../Images/imagecompressor/car7-min.jpg'
import car2 from '../../Images/imagecompressor/car8-min.jpg'
import car3 from '../../Images/imagecompressor/car5-min.jpg'
import './Banner.css'
import Typical from 'react-typical'
import styles from './styles.module.css'
import { useTransition, animated } from '@react-spring/web'



const Banner = () => {

    // const [items, setItems] = useState("NUM_TRANS")

    // const transitions = useTransition(items, {
    //     from: { opacity: 0 },
    //     enter: { opacity: 1 },
    //     leave: { opacity: 0 },
    //     delay: 200,
    //     config: config.molasses,
    //     onRest: () => setItems([]),
    // })

    // useEffect(() => {
    //     if (items.length === 0) {
    //         setTimeout(() => {
    //             setItems("NUM_TRANS")
    //         }, 2000)
    //     }
    // }, [items])
    return (
        <Carousel variant="dark">
            <Carousel.Item className="bgContainer" >
                <img
                    className="d-block w-100 banner"
                    src={car1}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <div>

                        {/* 
                        <div style={{ display: 'flex' }}>
                            {transitions(({ opacity }, item) => (
                                <animated.div
                                    style={{
                                        opacity: opacity.to(item.op),
                                        transform: opacity
                                            .to(item.trans)
                                            .to(y => `translate3d(0,${y}px,0)`),
                                    }}>
                                    {item.fig}
                                </animated.div>
                            ))}
                        </div> */}
                    </div>
                    <h5>First slide label</h5>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="bgContainer">
                <img
                    className="d-block w-100 banner"
                    src={car2}
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h5>Second slide label</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="bgContainer">
                <img
                    className="d-block w-100 banner"
                    src={car3}
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h5>Third slide label</h5>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default Banner;