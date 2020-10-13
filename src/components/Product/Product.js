import React from 'react';
import ButtonUI from '../UI/ButtonUI/ButtonUI';
import { useHistory } from 'react-router-dom';
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
    const history = useHistory();
    const redirectToProduct = (id) => {
        history.push(`/product/${id}`);
    };
    return (
        <div className={'product'}>
            <img
                className={'product__img'}
                src={image}
                alt={title}
                onClick={() => redirectToProduct(productId)}
            />
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
