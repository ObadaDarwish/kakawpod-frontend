import React from 'react';
import ButtonUI from '../UI/ButtonUI/ButtonUI';

const Product = ({ image, title, description, price }) => {
    return (
        <div className={'product'}>
            <img className={'product__img'} src={image} alt={title} />
            <div className={'product__detailsWrapper'}>
                <h1>{title}</h1>
                <p> {description}</p>
                <p>{price}</p>
                <div className={'product__detailsWrapper__buttonWrapper'}>
                    <ButtonUI name={'Add to cart'} />
                </div>
            </div>
        </div>
    );
};

export default Product;
