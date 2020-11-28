import React from 'react';

const StatBlock = ({ amount, title, background, color, ...rest }) => {
    return (
        <div style={{ background: background }} className={'statsBlock'}>
            <div className={'statsBlock__description'}>
                <p style={{ color: color }}>{amount}</p>
                <p style={{ color: color }}>{title}</p>
            </div>
            <div style={{ color: color }} className={'statsBlock__icon'}>
                {rest.children}
            </div>
        </div>
    );
};

export default StatBlock;
