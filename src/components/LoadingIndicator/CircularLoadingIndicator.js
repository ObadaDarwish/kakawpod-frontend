import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: (props) => props.height || '100vh',
        '& .MuiCircularProgress-colorPrimary': {
            color: '#7D5A5A',
        },
    },
}));
const CircularLoadingIndicator = (props) => {
    const classes = useStyles(props);

    return (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    );
};

export default CircularLoadingIndicator;
