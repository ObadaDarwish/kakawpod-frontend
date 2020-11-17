import React, { createRef, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: '1rem 0',

        width: '100%',
        '& .MuiFormLabel-root': {
            fontSize: '2rem',
        },
        '& .MuiInput-root': {
            fontSize: '2rem',
        },
        '& .MuiSelect-select': {
            '&:focus': {
                background: 'none',
            },
        },
    },
}));

const SelectUi = ({
    disabled = false,
    label,
    required,
    list = [],
    error,
    errorMessage,
    handleChange,
    value,
}) => {
    const classes = useStyles();
    const matches = useMediaQuery('(max-width:768px)');

    return (
        <FormControl
            required={required}
            error={error}
            className={classes.formControl}
            disabled={disabled}
        >
            <InputLabel id="demo-simple-select-placeholder-label-label">
                {label}
            </InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChange}
                value={value}
                inputProps={{
                    style: { fontSize: matches ? 16 : 20, color: '#7D5A5A' },
                }}
            >
                {list &&
                    list.map((item) => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
            </Select>
            {error && errorMessage && (
                <FormHelperText>{errorMessage}</FormHelperText>
            )}
        </FormControl>
    );
};

export default SelectUi;
