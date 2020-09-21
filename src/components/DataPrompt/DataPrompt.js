import React from 'react';

const DataPrompt = ({ message, margin }) => {
    return (
        <div className={'dataPromptContainer'} style={{ margin: margin }}>
            <p>{message}</p>
        </div>
    );
};

export default DataPrompt;
