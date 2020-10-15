import React from 'react';
import ButtonUI from '../UI/ButtonUI/ButtonUI';
import { NavLink } from 'react-router-dom';
const Product = ({
    productId,
    image,
    title,
    description,
    weight,
    price,
    buttonText,
    handleAddProduct,
    isAddButtonDisabled,
}) => {
    return (
        <div className={'product'}>
            <NavLink to={`/product/${productId}`}>
                <img className={'product__img'} src={image} alt={title} />
            </NavLink>
            <div className={'product__detailsWrapper'}>
                <h1>{title}</h1>
                <p> {`${weight}gm`}</p>
                {price && <p>{price}</p>}

                <div className={'product__detailsWrapper__buttonWrapper'}>
                    <ButtonUI
                        name={buttonText ? buttonText : 'Add to cart'}
                        is_disabled={isAddButtonDisabled}
                        clickHandler={handleAddProduct}
                    />
                </div>
            </div>
        </div>
    );
};

export default Product;
