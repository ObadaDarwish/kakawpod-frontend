import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    inputField: {
        width: '100%',
        margin: '1rem',
    },
}));
const InputUI = ({ label, type, required, reference, error, errorMessage }) => {
    const classes = useStyles();
    return (
        <TextField
            id="standard-basic"
            required={required}
            className={classes.inputField}
            label={label}
            type={type}
            inputRef={reference}
            helperText={errorMessage}
            error={error}
            inputProps={{ style: { fontSize: 20, color: '#7D5A5A' } }}
            InputLabelProps={{ style: { fontSize: 20, color: '#7D5A5A' } }}
        />
    );
};

export default InputUI;
