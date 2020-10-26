import React, { useState } from 'react';
import POSListings from '../../../components/POSListings/POSListings';
import POSSummary from '../../../components/POSSummary/POSSummary';

const Pos = () => {
    let Style = {
        display: 'flex',
        flexFlow: 'row',
        marginTop: '6rem',
        overFlow: 'hidden',
        justifyContent: 'space-around',
    };
    const [activeOrder, setActiveOrder] = useState({ items: [], total: 0 });
    const addItemHandler = (product) => {
        setActiveOrder((prevState) => {
            let items = [...prevState.items];
            let isProdFound = -1;
            isProdFound = items.findIndex((item) => item._id === product._id);
            let newCount = 1;
            if (isProdFound >= 0) {
                newCount = items[isProdFound].count + 1;
                items[isProdFound].count = newCount;
                return {
                    ...prevState,
                    items: items,
                };
            } else {
                items.push({ ...product, count: 1 });
                return {
                    ...prevState,
                    items: items,
                };
            }
        });
    };
    return (
        <div style={Style}>
            <POSListings addItem={addItemHandler} />
            <POSSummary activeOrder={activeOrder} />
        </div>
    );
};

export default Pos;
