import React from 'react';
import { NavLink } from 'react-router-dom';
import cocoaVideo from '../../assets/videos/cocoa.mp4';
import ButtonUI from '../../components/UI/ButtonUI/ButtonUI';
import Product from '../../components/Product/Product';
import img from '../../assets/images/milkbar.jpg';
import img1 from '../../assets/images/milkchocolate.jpg';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Landing = () => {
    const sm = useMediaQuery('(max-width:768px)');
    return (
        <div className={'landingContainer'}>
            <section className={'landingContainer__videoContainer'}>
                <div
                    className={'landingContainer__videoContainer__videoOverlay'}
                >
                    <h1
                        className={
                            'landingContainer__videoContainer__videoOverlay__slogan'
                        }
                    >
                        The finest chocolate you Deserve
                    </h1>
                    <NavLink
                        className={
                            'landingContainer__videoContainer__videoOverlay__shopNowButton'
                        }
                        to={'/shop'}
                    >
                        Shop now
                    </NavLink>
                </div>
                <video
                    className={'landingContainer__videoContainer__video'}
                    autoPlay
                    loop
                    muted
                    data-reactid=".0.1.0.0"
                >
                    <source
                        type="video/mp4"
                        data-reactid=".0.1.0.0.0"
                        src={cocoaVideo}
                    />
                </video>
            </section>
            <section className={'landingContainer__sampleContainer'}>
                <h1>Wondering our chocolate taste</h1>
                <div className={'landingContainer__sampleContainer__button'}>
                    <ButtonUI
                        name={'Get free sample'}
                        height={sm ? '4rem' : '6rem'}
                    />
                </div>
            </section>
            <section className={'landingContainer__topSellingContainer'}>
                <div className={'landingContainer__topSellingContainer__title'}>
                    Top selling
                </div>
                <div
                    className={
                        'landingContainer__topSellingContainer__products'
                    }
                >
                    <Product
                        image={img}
                        title={'milk chocolate'}
                        description={'80gm'}
                        price={'EGP45'}
                    />
                    <Product
                        image={img1}
                        title={'milk chocolate'}
                        description={'80gm'}
                        price={'EGP45'}
                    />
                    <Product
                        image={img}
                        title={'milk chocolate'}
                        description={'80gm'}
                        price={'EGP45'}
                    />{' '}
                    <Product
                        image={img1}
                        title={'milk chocolate'}
                        description={'80gm'}
                        price={'EGP45'}
                    />
                </div>
            </section>
            <section className={'landingContainer__chocolateBoxPromo'}>
                <div
                    className={'landingContainer__chocolateBoxPromo__overlay'}
                />
                <div
                    className={
                        'landingContainer__chocolateBoxPromo__promoWrapper'
                    }
                >
                    <div
                        className={
                            'landingContainer__chocolateBoxPromo__promoWrapper__promoTextWrapper'
                        }
                    >
                        <p>Save money up to</p>
                        <p>50%</p>
                        <p>Get the chocolate box</p>
                    </div>
                    <div
                        className={
                            'landingContainer__chocolateBoxPromo__promoWrapper__knowMoreButton'
                        }
                    >
                        Know more
                    </div>
                </div>
            </section>
            <section className={'landingContainer__megaWeightContainer'}>
                <div
                    className={
                        'landingContainer__megaWeightContainer__cookingChocolateContainer'
                    }
                >
                    <div
                        className={`landingContainer__megaWeightContainer__wrapper landingContainer__megaWeightContainer__wrapper__dark landingContainer__megaWeightContainer__wrapper__left`}
                    >
                        <div
                            className={
                                'landingContainer__megaWeightContainer__wrapper__textWrapper'
                            }
                        >
                            <p>Love cooking!</p>
                            <p>Our chocolate chips is the best choice</p>
                        </div>
                        <ButtonUI
                            name={'know more'}
                            width={sm ? '60%' : '40%'}
                            height={'4.5rem'}
                            inverseBackground
                        />
                    </div>
                </div>
                <div
                    className={`landingContainer__megaWeightContainer__wholeSaleContainer `}
                >
                    <div
                        className={`landingContainer__megaWeightContainer__wrapper landingContainer__megaWeightContainer__wrapper__light landingContainer__megaWeightContainer__wrapper__right`}
                    >
                        <ButtonUI
                            name={'Quotation'}
                            height={'4.5rem'}
                            width={sm ? '60%' : '40%'}
                        />
                        <div
                            className={
                                'landingContainer__megaWeightContainer__wrapper__textWrapper'
                            }
                        >
                            <p>Whole sale!</p>
                            <p>Ask for your special price</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
