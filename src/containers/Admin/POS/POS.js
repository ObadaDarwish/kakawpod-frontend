import React, { useState } from 'react';
import POSListings from '../../../components/POSListings/POSListings';
import POSSummary from '../../../components/POSSummary/POSSummary';
import { parseJSON, stringfyJSON } from '../../../utils/jsonConversion';
import PosBoxDialog from '../../../components/Dialogs/POSBoxDialog/POSBoxDialog';
import useCallServer from '../../../hooks/useCallServer';
import {
    errorNotification,
    infoNotification,
    successNotification,
} from '../../../utils/notification-utils';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../store/actions/loadingIndicator_actions';
import { v4 as uuidv4 } from 'uuid';
import { outOfStock } from '../../../store/actions/cart_actions';

const Pos = () => {
    const [, , , , callServer] = useCallServer();
    const [discount, setDiscount] = useState(0);
    const [OTP, setOTP] = useState(0);
    const dispatch = useDispatch();
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
                items: [],
                limit: parseInt(product.name.substr(0, 1)),
                ...product,
            });
            setBoxDialog(true);
        } else if (product.category === 'luxuryBox') {
            setBox({
                items: [],
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
            let isProdFound = items.findIndex(
                (item) => item._id === product._id
            );
            let newCount = 1;
            if (isProdFound >= 0) {
                newCount = items[isProdFound].count + 1;
                items[isProdFound].count = newCount;
            } else {
                let uniqueId = uuidv4();
                items.unshift({ ...product, uid: uniqueId, count: 1 });
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
        setActiveOrder(() => {
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
    const holdPOSHandler = () => {
        if (activeOrder.items.length) {
            setHeldPos((prevState) => {
                let updatedPOS = [...prevState];
                for (let i = 0; i < 3; i++) {
                    if (!updatedPOS[i]) {
                        updatedPOS[i] = activeOrder;
                        break;
                    }
                }
                localStorage.setItem('heldPOS', stringfyJSON(updatedPOS));
                handleClearPOS();
                return updatedPOS;
            });
        } else {
            infoNotification('POS is empty!', 'POS');
        }
    };
    const retrievePOS = (pos, index) => {
        if (pos) {
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
        } else {
            infoNotification('No held POS were found!.', 'POS');
        }
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
    const updateOutOfStockItems = (list) => {
        setActiveOrder((prevState) => {
            let orderList = [...prevState.items];
            list.forEach((outOfStockItem) => {
                for (let i = 0; i < orderList.length; i++) {
                    if (outOfStockItem._id === orderList[i]._id) {
                        orderList[i].outOfStock = true;
                    }
                    if (orderList[i].items && orderList[i].items.length) {
                        let isSubItemFound = orderList[i].items.findIndex(
                            (item) => item._id === outOfStockItem._id
                        );
                        if (isSubItemFound >= 0) {
                            orderList[i].items[
                                isSubItemFound
                            ].outOfStock = true;
                        }
                    }
                }
            });
            return {
                ...prevState,
                items: orderList,
            };
        });
    };
    const handleSubmitOrder = () => {
        dispatch(setLoading(true));
        callServer('POST', `${process.env.REACT_APP_API_ENDPOINT}/admin/pos`, {
            pos: activeOrder.items,
            OTP: OTP,
        })
            .then(() => {
                handleClearPOS();
                setDiscount(0);
                setOTP(0);
                successNotification(
                    'Order has been placed successfully',
                    'Order'
                );
            })
            .catch((err) => {
                if (err.response) {
                    let { message, data } = err.response.data;
                    updateOutOfStockItems(data);
                    errorNotification(message, 'Code');
                }
            })
            .finally(() => dispatch(setLoading(false)));
    };
    const handleUpdateDiscountOTP = (updatedDiscount, updatedOTP) => {
        setDiscount(updatedDiscount);
        setOTP(updatedOTP);
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
                submitOrder={handleSubmitOrder}
                OTP={OTP}
                discount={discount}
                updateDiscountOTP={handleUpdateDiscountOTP}
            />
        </div>
    );
};

export default Pos;
