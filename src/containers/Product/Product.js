import React, { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import CircularLoadingIndicator from '../../components/LoadingIndicator/CircularLoadingIndicator';
import { Carousel } from 'react-responsive-carousel';
import ButtonUI from '../../components/UI/ButtonUI/ButtonUI';
import InputUI from '../../components/UI/InputUI/InputUI';
import { addToCart } from '../../store/actions/cart_actions';
import { setLoading } from '../../store/actions/loadingIndicator_actions';
import { useDispatch } from 'react-redux';

const Product = ({ match }) => {
    const { code } = match.params;
    const [isLoadingProduct, product] = useFetchData(
        `${process.env.REACT_APP_API_ENDPOINT}/product/${code}`
    );
    const [count, setCount] = useState(1);
    const dispatch = useDispatch();
    const handleInputChange = (e) => {
        let { value } = e.target;
        setCount(parseInt(value));
    };
    const plusButton = () => {
        setCount((prevState) => {
            let newCount = ++prevState;
            return newCount;
        });
    };
    const minusButton = () => {
        setCount((prevState) => {
            let newCount = prevState > 1 ? --prevState : prevState;
            return newCount;
        });
    };
    const addProduct = () => {
        dispatch(setLoading(true));
        let updatedProduct = {
            ...product,
            count: count,
        };
        dispatch(addToCart(updatedProduct));
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 500);
    };
    return (
        <div className={'productContainer'}>
            {isLoadingProduct ? (
                <CircularLoadingIndicator />
            ) : (
                product && (
                    <>
                        <section className={'productContainer__imageSection'}>
                            <Carousel
                                autoPlay={true}
                                interval={2000}
                                showArrows={false}
                                showThumbs={true}
                                showStatus={false}
                            >
                                {product.images.map((image) => {
                                    return (
                                        <div
                                            className={
                                                'productContainer__imageSection__carousel-item'
                                            }
                                            key={image._id}
                                        >
                                            <img
                                                className={
                                                    'productContainer__imageSection__carousel-item__image'
                                                }
                                                alt={product.name}
                                                src={image.url}
                                            />
                                        </div>
                                    );
                                })}
                            </Carousel>
                        </section>
                        <section className={'productContainer__detailsSection'}>
                            <h1
                                className={
                                    'productContainer__detailsSection__item'
                                }
                            >
                                {product.name}
                            </h1>
                            <p
                                className={
                                    'productContainer__detailsSection__item'
                                }
                            >
                                Description: {product.description}
                            </p>
                            <p
                                className={
                                    'productContainer__detailsSection__item'
                                }
                            >
                                Weight: {product.weight}gm
                            </p>
                            <p
                                className={
                                    'productContainer__detailsSection__item productContainer__detailsSection__ingredients'
                                }
                            >
                                Ingredients: {product.ingredients}
                            </p>

                            {product.price ? (
                                <>
                                    <p
                                        className={
                                            'productContainer__detailsSection__item productContainer__detailsSection__price'
                                        }
                                    >
                                        Price: EGP{product.price}
                                    </p>
                                    <div
                                        className={
                                            'productContainer__detailsSection__inputWrapper'
                                        }
                                    >
                                        <ButtonUI
                                            height={'4rem'}
                                            width={'4rem'}
                                            name={'-'}
                                            clickHandler={minusButton}
                                        />
                                        <InputUI
                                            width={'5rem'}
                                            type={'number'}
                                            value={count}
                                            changeHandler={(e) =>
                                                handleInputChange(e)
                                            }
                                        />
                                        <ButtonUI
                                            height={'4rem'}
                                            width={'4rem'}
                                            name={'+'}
                                            clickHandler={plusButton}
                                        />
                                        <p
                                            className={
                                                'productContainer__detailsSection__inputWrapper__totalPrice'
                                            }
                                        >
                                            Total: EGP{product.price * count}
                                        </p>
                                    </div>
                                    <div
                                        className={
                                            'productContainer__detailsSection__buttonWrapper'
                                        }
                                    >
                                        <ButtonUI
                                            name={'add to cart'}
                                            clickHandler={addProduct}
                                        />
                                    </div>
                                </>
                            ) : (
                                ''
                            )}
                        </section>
                    </>
                )
            )}
        </div>
    );
};

export default Product;
