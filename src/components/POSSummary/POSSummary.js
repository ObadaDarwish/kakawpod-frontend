import React, { useState } from 'react';
import InputUI from '../UI/InputUI/InputUI';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ClearIcon from '@material-ui/icons/Clear';
import DataPrompt from '../DataPrompt/DataPrompt';

const POSSummary = ({ activeOrder }) => {
    const [selectedItem, setSelectedItem] = useState({});

    return (
        <div className={'summaryContainer'}>
            <div className={'summaryContainer__summaryWrapper'}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">name</th>
                            <th scope="col">quantity</th>
                            <th scope="col">total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeOrder.items.length ? (
                            activeOrder.items.map((item) => {
                                return (
                                    <tr
                                        key={item._id}
                                        className={
                                            'table__tableItem table__tableItem__selected'
                                        }
                                    >
                                        <th scope="row">1</th>
                                        <td>
                                            {item.name} - {item.weight}g
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
                                        message={'No items added yet.'}
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className={'summaryContainer__itemControl'}>
                <div className={'summaryContainer__itemControl__item'}>
                    <RemoveIcon fontSize={'large'} />
                </div>
                <div className={'summaryContainer__itemControl__item'}>
                    <AddIcon fontSize={'large'} />
                </div>
                <div className={'summaryContainer__itemControl__item'}>
                    <ClearIcon fontSize={'large'} />
                </div>
            </div>
        </div>
    );
};

export default POSSummary;
