import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    inputField: {
        width: (props) => props.width || '100%',
        height: (props) => props.height,
        margin: '1rem 0',
        [theme.breakpoints.down('sm')]: {
            margin: '0.2rem 0',
        },
        '& .MuiFormHelperText-root': {
            fontSize: '1.4rem',
        },
    },
}));
const InputUI = ({
    defaultValue,
    value,
    label,
    type,
    required,
    reference,
    error,
    errorMessage,
    disabled,
    changeHandler,
    ...props
}) => {
    const matches = useMediaQuery('(max-width:768px)');
    const classes = useStyles(props);
    return (
        <TextField
            required={required}
            className={classes.inputField}
            label={label}
            type={type}
            inputRef={reference}
            helperText={errorMessage}
            error={error}
            defaultValue={defaultValue}
            value={value}
            inputProps={{
                style: { fontSize: matches ? 16 : 20, color: '#7D5A5A' },
            }}
            InputLabelProps={{
                style: { fontSize: matches ? 16 : 20, color: '#7D5A5A' },
            }}
            onChange={changeHandler}
            disabled={disabled}
        />
    );
};

export default InputUI;
