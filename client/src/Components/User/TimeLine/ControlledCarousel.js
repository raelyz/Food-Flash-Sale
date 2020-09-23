import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'

export default function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://source.unsplash.com/MNtag_eXMKw/1110x350"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>Find the best deals</h3>
                    <p>Before time runs out</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://source.unsplash.com/N_Y88TWmGwA/1110x350"
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Dine like a king</h3>
                    <p>without breaking the bank</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://source.unsplash.com/tzl1UCXg5Es/1110x350"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Making meals affordable</h3>
                    <p>
                        Impress your date
            </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}
