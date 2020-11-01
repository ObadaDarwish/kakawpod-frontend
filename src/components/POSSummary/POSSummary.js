import React, { useState } from 'react';
import InputUI from '../UI/InputUI/InputUI';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ClearIcon from '@material-ui/icons/Clear';
import DataPrompt from '../DataPrompt/DataPrompt';
import ButtonUI from '../UI/ButtonUI/ButtonUI';

const POSSummary = ({ activeOrder, updateItem, clearPOS, holdPOS }) => {
    const [selectedItem, setSelectedItem] = useState({});
    const selectItem = (item) => {
        setSelectedItem(item);
    };
    return (
        <div className={'summaryContainer'}>
            <div className={'summaryContainer__summaryWrapper'}>
                <table className="table">
                    <thead
                        className={
                            'summaryContainer__summaryWrapper__itemsList__stickyHeader'
                        }
                    >
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">name</th>
                            <th scope="col">quantity</th>
                            <th scope="col">total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeOrder.items.length ? (
                            activeOrder.items.map((item, index) => {
                                return (
                                    <tr
                                        key={item._id}
                                        className={`table__tableItem ${
                                            item._id === selectedItem._id &&
                                            'table__tableItem__selected'
                                        }`}
                                        onClick={() => selectItem(item)}
                                    >
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            <div
                                                className={
                                                    'table__tableItem__name'
                                                }
                                            >
                                                <p> {item.name}</p>
                                                {item.items && (
                                                    <ul>
                                                        {item.items.map(
                                                            (subItem) => {
                                                                return (
                                                                    <li>
                                                                        {
                                                                            subItem.name
                                                                        }{' '}
                                                                        X{' '}
                                                                        {
                                                                            subItem.count
                                                                        }
                                                                    </li>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <InputUI
                                                type={'number'}
                                                width={'3rem'}
                                                value={item.count}
                                            />
                                        </td>
                                        <td>EGP{item.price * item.count}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6">
                                    <DataPrompt
                                        backgroundColor={'#F1D1D1'}
                                        message={'No items added yet.'}
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className={'summaryContainer__posBlock'}>
                <p>SubTotal:</p>
                <p>EGP{activeOrder.total}</p>
            </div>
            <div className={'summaryContainer__posBlock'}>
                <p>Discount:</p>
                <ButtonUI name={'discount'} width={'12rem'} />
                <p>-EGP10</p>
            </div>
            <div
                className={
                    'summaryContainer__posBlock summaryContainer__posBlock__grandTotal'
                }
            >
                <p>Grand total:</p>
                <p>EGP{activeOrder.total - 10}</p>
            </div>
            <div className={`summaryContainer__itemControl`}>
                {!selectedItem._id && (
                    <div
                        className={'summaryContainer__itemControl__disabled'}
                    />
                )}
                <div
                    className={'summaryContainer__itemControl__item'}
                    onClick={() => updateItem('delete', selectedItem)}
                >
                    <RemoveIcon fontSize={'large'} />
                </div>
                <div
                    className={'summaryContainer__itemControl__item'}
                    onClick={() => updateItem('add', selectedItem)}
                >
                    <AddIcon fontSize={'large'} />
                </div>
                <div
                    className={'summaryContainer__itemControl__item'}
                    onClick={() => updateItem('remove', selectedItem)}
                >
                    <ClearIcon fontSize={'large'} />
                </div>
            </div>
            <div className={'summaryContainer__posControl'}>
                <ButtonUI name={'clear'} clickHandler={clearPOS} />
                <ButtonUI
                    name={'hold'}
                    inverseBackground
                    clickHandler={() => holdPOS(activeOrder)}
                />
                <ButtonUI name={'pay'} />
            </div>
        </div>
    );
};

export default POSSummary;
