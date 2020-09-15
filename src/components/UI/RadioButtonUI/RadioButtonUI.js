import React from 'react';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';

const CustomRadio = withStyles({
    root: {
        color: '#7D5A5A',
        '&$checked': {
            color: '#7D5A5A',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);
const RadioButtonUi = ({ isChecked, value, handleChange, ariaLabel }) => {
    return (
        <CustomRadio
            checked={isChecked}
            onChange={(e) => handleChange(e)}
            value={value}
            name="radio-button-demo"
            inputProps={{
                'aria-label': ariaLabel,
            }}
        />
    );
};

export default RadioButtonUi;
