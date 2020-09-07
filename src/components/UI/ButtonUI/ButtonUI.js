import Button from '@material-ui/core/Button';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        background: '#7D5A5A',
        color: '#FAF2F2',
        height: '3.5rem',
        fontSize: '1.6rem',
        width: '100%',
        '&:hover': {
            background: '#5b3d3d',
        },
        '&:focus': {
            outline: '#eee',
        },
    },
}));
const ButtonUI = ({
    name,
    className,
    is_disabled,
    clickHandler,
    type,
    downKeyListener,
}) => {
    const classes = useStyles();
    return (
        <Button
            variant="contained"
            className={`${classes.root} ${className}`}
            type={type}
            disabled={is_disabled}
            onClick={clickHandler}
        >
            {name}
        </Button>
    );
};

export default ButtonUI;
