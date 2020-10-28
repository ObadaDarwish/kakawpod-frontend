import React from 'react';

const DataPrompt = ({ message, margin, backgroundColor }) => {
    return (
        <div
            className={'dataPromptContainer'}
            style={{ margin: margin, backgroundColor: backgroundColor }}
        >
            <p>{message}</p>
        </div>
    );
};

export default DataPrompt;
