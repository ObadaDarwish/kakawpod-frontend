import React from 'react';

const LuxuryBoxFilters = ({ luxuryBoxes, selectedBox, handleChange }) => {
    return (
        <div className={'filtersWrapper__mixBox'}>
            {luxuryBoxes &&
                luxuryBoxes.map((box) => {
                    return (
                        <div
                            key={box._id}
                            className={`filtersWrapper__mixBox__box ${
                                selectedBox.name === box.name
                                    ? 'filtersWrapper__mixBox__box--active'
                                    : ''
                            }`}
                            style={{ padding: '1rem 6rem' }}
                            onClick={() => handleChange(box)}
                        >
                            <p> {box.weight}g box</p>
                            <p style={{ fontSize: '1.4rem' }}>
                                (EGP{box.price})
                            </p>
                        </div>
                    );
                })}
        </div>
    );
};

export default LuxuryBoxFilters;
