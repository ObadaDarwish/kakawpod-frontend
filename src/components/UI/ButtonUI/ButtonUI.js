import Button from '@material-ui/core/Button';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        background: (props) =>
            props.inverseBackground ? '#FAF2F2' : '#7D5A5A',
        color: (props) => (props.inverseBackground ? '#7D5A5A' : '#FAF2F2'),
        height: (props) => props.height || '3.5rem',
        fontSize: (props) => props.fontSize || '1.6rem',
        width: (props) => props.width || '100%',
        '&:hover': {
            background: (props) =>
                props.inverseBackground ? '#efe7e7' : '#5b3d3d',
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
    Icon,
    ...props
}) => {
    const classes = useStyles(props);
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
