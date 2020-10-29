import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiDialog-paper': {
            display: 'flex',
            flexDirection: 'column',
            background: '#FAF2F2',
            minWidth: '50rem',
            maxWidth: 'unset',
            [theme.breakpoints.down('sm')]: {
                minWidth: '90%',
            },
        },
        '& .MuiButton-root': {
            marginTop: '2rem',
        },
    },
}));
const DialogWrapper = ({ open, onClose, close, ...rest }) => {
    const classes = useStyles();
    return (
        <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            className={classes.root}
            onBackdropClick={close}
        >
            <IconButton
                onClick={close}
                style={{
                    alignSelf: 'flex-end',
                    margin: '1rem',
                    outline: 'none',
                }}
            >
                <CloseIcon fontSize={'large'} />
            </IconButton>
            {rest.children}
        </Dialog>
    );
};

export default DialogWrapper;
