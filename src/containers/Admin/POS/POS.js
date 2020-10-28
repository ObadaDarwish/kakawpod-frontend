import React, { useState } from 'react';
import POSListings from '../../../components/POSListings/POSListings';
import POSSummary from '../../../components/POSSummary/POSSummary';

const Pos = () => {
    let Style = {
        display: 'flex',
        flexFlow: 'row',
        overFlow: 'hidden',
        justifyContent: 'space-around',
    };
    const [activeOrder, setActiveOrder] = useState({ items: [], total: 0 });
    const getTotal = (items) => {
        let total = 0;
        items.forEach((item) => {
            total += item.count * item.price;
        });
        return total;
    };
    const addItemHandler = (product) => {
        setActiveOrder((prevState) => {
            let items = [...prevState.items];
            let isProdFound = -1;
            isProdFound = items.findIndex((item) => item._id === product._id);
            let newCount = 1;
            if (isProdFound >= 0) {
                newCount = items[isProdFound].count + 1;
                items[isProdFound].count = newCount;
            } else {
                items.push({ ...product, count: 1 });
            }
            return {
                total: getTotal(items),
                items: items,
            };
        });
    };
    const handleUpdateItem = (type, item) => {
        setActiveOrder((prevState) => {
            let updatedItems = [...prevState.items];
            let itemIndex = updatedItems.findIndex(
                (product) => product._id === item._id
            );
            const removeItem = () => {
                updatedItems.splice(itemIndex, 1);
            };
            if (itemIndex >= 0) {
                switch (type) {
                    case 'add': {
                        updatedItems[itemIndex].count += 1;
                        break;
                    }
                    case 'delete': {
                        let currentCount = updatedItems[itemIndex].count;
                        if (currentCount > 1) {
                            updatedItems[itemIndex].count -= 1;
                        } else {
                            removeItem();
                        }
                        break;
                    }
                    default: {
                        removeItem();
                    }
                }
            }
            return {
                total: getTotal(updatedItems),
                items: updatedItems,
            };
        });
    };
    const handleClearPOS = () => {
        setActiveOrder({
            total: 0,
            items: [],
        });
    };
    return (
        <div style={Style}>
            <POSListings addItem={addItemHandler} />
            <POSSummary
                activeOrder={activeOrder}
                updateItem={handleUpdateItem}
                clearPOS={handleClearPOS}
            />
        </div>
    );
};

export default Pos;
