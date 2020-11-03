import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CircularLoadingIndicator from '../../LoadingIndicator/CircularLoadingIndicator';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        '& .MuiDialog-paper': {
            display: 'flex',
            flexDirection: 'column',
            background: '#FAF2F2',
            minWidth: '50rem',
            maxWidth: (props) => props.maxWidth || 'unset',
            [theme.breakpoints.down('sm')]: {
                minWidth: '90%',
            },
            '& .loadingOverlay': {
                position: 'absolute',
                width: '100%',
                height: '100%',
                opacity: 0.5,
                zIndex: 2,
            },
        },
    },
}));
const DialogWrapper = ({ open, onClose, close, loading, ...rest }) => {
    const classes = useStyles(rest);
    return (
        <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            className={classes.root}
            onBackdropClick={close}
            onClose={onClose}
        >
            {loading && (
                <div className={'loadingOverlay'}>
                    <CircularLoadingIndicator height={'100%'} />
                </div>
            )}
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
