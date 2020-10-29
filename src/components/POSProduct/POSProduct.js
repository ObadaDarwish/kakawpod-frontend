import React from 'react';
import img from '../../assets/images/milkbar.jpg';

const PosProduct = ({ addItem, product, noPrice }) => {
    const getColor = (type) => {
        let colorClass = '';
        switch (type) {
            case 'dark':
                colorClass = 'posItem__tag__dark';
                break;
            case 'white':
                colorClass = 'posItem__tag__yellow';
                break;
            default:
                colorClass = 'posItem__tag__blue';
        }
        return colorClass;
    };
    return (
        <div className={'posItem'} onClick={() => addItem(product)}>
            <span
                className={`posItem__tag ${getColor(product.chocolate_type)}`}
            />
            <img src={product.images[0].url} alt={product.name} />
            <p className={'posItem__title'}>{product.name}</p>
            {!noPrice && <p className={'posItem__price'}>EGP{product.price}</p>}
        </div>
    );
};

export default PosProduct;
