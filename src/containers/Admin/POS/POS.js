import React, { useState } from 'react';
import POSListings from '../../../components/POSListings/POSListings';
import POSSummary from '../../../components/POSSummary/POSSummary';
import { parseJSON, stringfyJSON } from '../../../utils/jsonConversion';
import PosBoxDialog from '../../../components/Dialogs/POSMixBoxDialog/POSMixBoxDialog';

const Pos = () => {
    const [heldPOS, setHeldPos] = useState(
        localStorage.getItem('heldPOS')
            ? parseJSON(localStorage.getItem('heldPOS'))
            : Array(3).fill(0)
    );
    const [boxDialog, setBoxDialog] = useState(false);
    const [box, setBox] = useState({ items: [] });
    let activeOrderDefault = localStorage.getItem('pos')
        ? parseJSON(localStorage.getItem('pos'))
        : { items: [], total: 0 };
    const [activeOrder, setActiveOrder] = useState(activeOrderDefault);
    const getTotal = (items) => {
        let total = 0;
        items.forEach((item) => {
            total += item.count * item.price;
        });
        return total;
    };
    const addItemHandler = (product) => {
        if (product.category === 'mixBox') {
            setBox({
                limit: parseInt(product.name.substr(0, 1)),
                ...product,
            });
            setBoxDialog(true);
        } else if (product.category === 'luxuryBox') {
            setBox({
                ...product,
            });
            setBoxDialog(true);
        } else {
            addItemToPOS(product);
        }
    };
    const addItemToPOS = (product) => {
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
            let updatedState = {
                total: getTotal(items),
                items: items,
            };
            localStorage.setItem('pos', stringfyJSON(updatedState));
            return updatedState;
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
            let updatedState = {
                total: getTotal(updatedItems),
                items: updatedItems,
            };
            localStorage.setItem('pos', stringfyJSON(updatedState));
            return updatedState;
        });
    };
    const handleClearPOS = () => {
        setActiveOrder((prevState) => {
            localStorage.removeItem('pos');
            return {
                total: 0,
                items: [],
            };
        });
    };
    const closePOSBoxDialog = () => {
        setBoxDialog(false);
    };
    const holdPOSHandler = (pos) => {
        setHeldPos((prevState) => {
            let updatedPOS = [...prevState];
            for (let i = 0; i < 3; i++) {
                if (!updatedPOS[i]) {
                    updatedPOS[i] = pos;
                    break;
                }
            }
            localStorage.setItem('heldPOS', stringfyJSON(updatedPOS));
            handleClearPOS();
            return updatedPOS;
        });
    };
    const retrievePOS = (pos, index) => {
        setActiveOrder(() => {
            localStorage.setItem('pos', stringfyJSON(pos));
            setHeldPos((prevState) => {
                let updatedPOS = [...prevState];
                updatedPOS[index] = 0;
                localStorage.setItem('heldPOS', stringfyJSON(updatedPOS));
                return updatedPOS;
            });
            return pos;
        });
    };
    const handleBoxPOS = (box_item) => {
        setActiveOrder((prevState) => {
            let newItems = [...prevState.items];
            newItems.unshift(box_item);
            let updatedState = {
                total: getTotal(newItems),
                items: newItems,
            };
            localStorage.setItem('pos', stringfyJSON(updatedState));
            return updatedState;
        });
        closePOSBoxDialog();
    };
    return (
        <div className={'posContainer'}>
            <div className={'posContainer__heldPOS'}>
                {heldPOS.map((pos, index) => {
                    return (
                        <div
                            key={index}
                            className={'posContainer__heldPOS__posItem'}
                            onClick={() => retrievePOS(pos, index)}
                        >
                            {pos ? (
                                <h1>EGP{pos.total}</h1>
                            ) : (
                                <h1>{index + 1}</h1>
                            )}
                        </div>
                    );
                })}
            </div>
            {box && (
                <PosBoxDialog
                    open={boxDialog}
                    box={box}
                    close={closePOSBoxDialog}
                    addToPOS={handleBoxPOS}
                />
            )}

            <POSListings addItem={addItemHandler} />
            <POSSummary
                activeOrder={activeOrder}
                updateItem={handleUpdateItem}
                clearPOS={handleClearPOS}
                holdPOS={holdPOSHandler}
            />
        </div>
    );
};

export default Pos;
