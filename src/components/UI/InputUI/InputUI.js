import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    inputField: {
        width: '100%',
        margin: '1rem',
        fontSize: '2.2rem',
    },
}));
const InputUI = ({ label, type }) => {
    const classes = useStyles();
    return (
        <TextField
            id="standard-basic"
            className={classes.inputField}
            label={label}
            type={type}
            inputProps={{ style: { fontSize: 20, color: '#7D5A5A' } }}
            InputLabelProps={{ style: { fontSize: 20, color: '#7D5A5A' } }}
        />
    );
};

export default InputUI;
