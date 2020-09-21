import React from 'react';

const MixBoxFilters = ({ mixBoxes, selectedBox, handleChange }) => {
    return (
        <div className={'shopMixBoxContainer__filtersWrapper__mixBox'}>
            {mixBoxes &&
                mixBoxes.map((box) => {
                    return (
                        <div
                            key={box._id}
                            className={`shopMixBoxContainer__filtersWrapper__mixBox__box ${
                                selectedBox.name === box.name
                                    ? 'shopMixBoxContainer__filtersWrapper__mixBox__box--active'
                                    : ''
                            }`}
                            onClick={() => handleChange(box)}
                        >
                            <p> {box.name}</p>
                        </div>
                    );
                })}
        </div>
    );
};

export default MixBoxFilters;
