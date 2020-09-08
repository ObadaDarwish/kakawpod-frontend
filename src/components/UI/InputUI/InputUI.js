import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    inputField: {
        width: '100%',
        margin: '1rem',
        [theme.breakpoints.down('sm')]: {
            margin: '0.2rem',
        },
    },
}));
const InputUI = ({ label, type, required, reference, error, errorMessage }) => {
    const matches = useMediaQuery('(max-width:768px)');
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
            inputProps={{
                style: { fontSize: matches ? 16 : 20, color: '#7D5A5A' },
            }}
            InputLabelProps={{
                style: { fontSize: matches ? 16 : 20, color: '#7D5A5A' },
            }}
        />
    );
};

export default InputUI;
