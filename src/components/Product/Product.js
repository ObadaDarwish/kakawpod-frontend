import React from 'react';
import ButtonUI from '../UI/ButtonUI/ButtonUI';

const Product = ({
    image,
    title,
    description,
    weight,
    price,
    buttonText,
    addToBox,
    isAddButtonDisabled,
}) => {
    return (
        <div className={'product'}>
            <img className={'product__img'} src={image} alt={title} />
            <div className={'product__detailsWrapper'}>
                <h1>{title}</h1>
                <p> {`${weight}gm`}</p>
                {price && <p>{price}</p>}

                <div className={'product__detailsWrapper__buttonWrapper'}>
                    <ButtonUI
                        name={buttonText ? buttonText : 'Add to cart'}
                        is_disabled={isAddButtonDisabled}
                        clickHandler={addToBox}
                    />
                </div>
            </div>
        </div>
    );
};

export default Product;
