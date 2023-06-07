import React from 'react'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css";
import hero_image1 from '../assets/images/hero_image1.jpg'
import hero_image3 from '../assets/images/hero_image3.jpg'
import hero_image4 from '../assets/images/hero_image4.jpg'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
const caruouselImages = [hero_image1, hero_image3, hero_image4]
function Hero() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
                desktop: {
                    breakpoint: {
                        max: 3000,
                        min: 1024
                    },
                    items: 1
                },
                mobile: {
                    breakpoint: {
                        max: 464,
                        min: 0
                    },
                    items: 1
                },
                tablet: {
                    breakpoint: {
                        max: 1024,
                        min: 464
                    },
                    items: 1
                }
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
        >
            {
                caruouselImages.map(image => (
                    <img
                        key={image}
                        src={image}
                        alt=''
                        style={{
                            display: 'block',
                            margin: 'auto',
                            width: '100%',
                            minHeight: `${!matches && 'calc(100vh - 4.5rem)'}`,
                            objectFit: 'cover'
                        }}
                    />
                ))
            }
        </Carousel>
    )
}

export default Hero