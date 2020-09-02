import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        position: 'absolute',
        top: '7rem',
        zIndex: '-1',
        '& .MuiLinearProgress-colorPrimary': {
            background: '#F1D1D1',
        },
        '& .MuiLinearProgress-barColorPrimary': {
            background: '#cd9292',
        },
    },
}));
const LoadingIndicator = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <LinearProgress />
        </div>
    );
};

export default LoadingIndicator;
