import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import cocoaVideo from '../../assets/videos/cocoa.mp4';
import ButtonUI from '../../components/UI/ButtonUI/ButtonUI';
import Product from '../../components/Product/Product';
import img from '../../assets/images/milkbar.jpg';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import background from '../../assets/images/waive.png';
import { addToCart } from '../../store/actions/cart_actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import CircularLoadingIndicator from '../../components/LoadingIndicator/CircularLoadingIndicator';
import { setLoading } from '../../store/actions/loadingIndicator_actions';
import Quality from '../../assets/images/quality.svg';
import Farming from '../../assets/images/farming.svg';
import Standard from '../../assets/images/standard.svg';

const Landing = () => {
    const sm = useMediaQuery('(max-width:768px)');
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoadingTopSelling, topSelling] = useFetchData(
        `${process.env.REACT_APP_API_ENDPOINT}/product/topSelling`
    );
    const valuesWrapperRef = useRef();
    const firstValueRef = useRef();
    const secondValueRef = useRef();
    useEffect(() => {
        window.addEventListener('scroll', windowScroll);
        return () => {
            window.removeEventListener('scroll');
        };
    }, []);
    const windowScroll = () => {
        if (valuesWrapperRef.current.offsetTop < window.pageYOffset + 500) {
            firstValueRef.current.classList.add(
                'landingContainer__valuesContainer__valuesWrapper__value__firstValueAnimation'
            );
            secondValueRef.current.classList.add(
                'landingContainer__valuesContainer__valuesWrapper__value__secondValueAnimation'
            );
        }
    };
    const addBar = (product) => {
        dispatch(setLoading(true));
        dispatch(addToCart({ ...product, count: 1 }));
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 500);
    };
    const cookingNavigation = () => {
        history.push('/shop/cooking');
    };
    const getSample = () => {
        history.push('/shop/samples');
    };
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
                    <img
                        className={
                            'landingContainer__videoContainer__videoOverlay__image'
                        }
                        src={background}
                        alt="waive background"
                    />
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
                        clickHandler={getSample}
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
                    {!isLoadingTopSelling ? (
                        topSelling.map((product) => {
                            return (
                                <Product
                                    key={product._id}
                                    image={product.images[0].url}
                                    title={product.name}
                                    weight={product.weight}
                                    price={product.price}
                                    productId={product._id}
                                    handleAddProduct={() => addBar(product)}
                                />
                            );
                        })
                    ) : (
                        <CircularLoadingIndicator />
                    )}
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
                    <NavLink
                        className={
                            'landingContainer__chocolateBoxPromo__promoWrapper__knowMoreButton'
                        }
                        to={'/shop/mixBox'}
                    >
                        Know more
                    </NavLink>
                </div>
            </section>
            <section className={'landingContainer__megaWeightContainer'}>
                <div
                    className={
                        'landingContainer__megaWeightContainer__bottomFade'
                    }
                />
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
                            clickHandler={cookingNavigation}
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
            <section className={'landingContainer__valuesContainer'}>
                <h1 className={'landingContainer__valuesContainer__title'}>
                    Values
                </h1>
                <div
                    ref={valuesWrapperRef}
                    className={
                        'landingContainer__valuesContainer__valuesWrapper'
                    }
                >
                    <div
                        className={
                            'landingContainer__valuesContainer__valuesWrapper__value'
                        }
                        ref={firstValueRef}
                    >
                        <img src={Quality} alt="Quality" />
                        <h1>Quality</h1>
                        <p>
                            our passion for chocolate making translates to the
                            finest chocolate you deserve
                        </p>
                    </div>
                    <div
                        className={
                            'landingContainer__valuesContainer__valuesWrapper__value'
                        }
                    >
                        <img src={Farming} alt="cocoa beans" />
                        <h1>Cocoa beans</h1>
                        <p>
                            our cocoa beans are carefully picked from the
                            highest quality farms
                        </p>
                    </div>
                    <div
                        className={
                            'landingContainer__valuesContainer__valuesWrapper__value'
                        }
                        ref={secondValueRef}
                    >
                        <img src={Standard} alt="standards" />
                        <h1>Standards</h1>
                        <p>
                            we are committed to follow the highest standards and
                            procedures in chocolate making
                        </p>
                    </div>
                </div>
            </section>
            <section className={'landingContainer__ourCompanyContainer'}>
                <h1>Our Company</h1>
                <p>
                    <span>H&D</span> is an elite chocolate making company, we
                    manufacture high quality chocolate which reflects our
                    passion for chocolate, starting from picking the perfect
                    cocoa beans all the way to a flavourful chocolate bar
                </p>
            </section>
        </div>
    );
};

export default Landing;
