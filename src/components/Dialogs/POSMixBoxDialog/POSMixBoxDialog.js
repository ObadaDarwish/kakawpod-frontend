import React, { useState } from 'react';
import DialogWrapper from '../DialogWrapper/DialogWrapper';
import BoxSummary from '../../BoxSummary/BoxSummary';
import useFetchProducts from '../../../hooks/useFetchProducts';
import ShopFilters from '../../ShopFilters/ShopFilters';
import PosProduct from '../../POSProduct/POSProduct';
import CircularLoadingIndicator from '../../LoadingIndicator/CircularLoadingIndicator';

const PosBoxDialog = ({ open, close, box }) => {
    const [type, setType] = useState('milk');
    let [isLoadingBars, bars, setBars] = useFetchProducts(
        `${process.env.REACT_APP_API_ENDPOINT}/product/all?category=${
            box.category === 'mixBox' ? 'bar' : 'miniBar'
        }&type=${type}`
    );
    const getItemsCount = () => {
        let count = 0;
        box.items.forEach((item) => {
            if (box.category === 'mixBox') {
                count += item.count;
            } else {
                count += item.weight * item.count;
            }
        });
        return count;
    };
    const handleFilterChange = (e) => {
        const event = e.target;
        setType(event.name);
    };
    return (
        <DialogWrapper open={open} close={close}>
            <div className={'posMixBoxContainer'}>
                <ShopFilters
                    handleChange={handleFilterChange}
                    filter={type}
                    direction={'row'}
                />
                <div className={'posMixBoxContainer__wrapper'}>
                    <div className={'posMixBoxContainer__wrapper__listing'}>
                        {isLoadingBars ? (
                            <CircularLoadingIndicator height={'20rem'} />
                        ) : (
                            bars.map((bar) => {
                                return (
                                    <PosProduct
                                        // addItem={addItem}
                                        product={bar}
                                        key={bar._id}
                                        noPrice
                                    />
                                );
                            })
                        )}
                    </div>
                    <BoxSummary
                        type={
                            box.category === 'mixBox' ? 'Mix box' : 'Luxury box'
                        }
                        selectedBox={box}
                        boxItems={box.items}
                        itemsCount={getItemsCount()}
                        boxLimit={box.limit}
                        // handleItemUpdate={updateLuxuryBoxItems}
                        // clearBoxHandler={confirmClearLuxuryBox}
                        // handleInputChange={countInputChangeHandler}
                        // handleAddToCart={addLuxuryBoxToCart}
                        price={box.price}
                        buttonName={'Add'}
                    />
                </div>
            </div>
        </DialogWrapper>
    );
};

export default PosBoxDialog;
