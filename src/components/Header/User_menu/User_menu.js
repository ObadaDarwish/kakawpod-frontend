import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/actions/auth_actions';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiMenu-paper': {
            background: '#f3e1e1',
            width: '15rem',
            '& .MuiMenuItem-root': {
                fontSize: '1.6rem',
            },
        },
    },
}));

const UserMenu = ({ isAuth }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [menu, setMenu] = useState(null);
    const handleClick = (event) => {
        setMenu(event.currentTarget);
    };
    const handleClose = () => {
        setMenu(null);
    };
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        history.push('/login');
        handleClose();
    };
    const getName = () => {
        let name = isAuth.name;
        if (name.length > 15) {
            name = name.substr(0, 15) + '...';
        }
        return name;
    };
    return (
        <>
            <div
                className={'headerOuterContainer__navigationTabs__userSection'}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <AccountCircleOutlinedIcon fontSize={'large'} />
                <p>{getName()}</p>
            </div>
            <Menu
                className={classes.root}
                id="simple-menu"
                anchorEl={menu}
                keepMounted
                open={Boolean(menu)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <NavLink to={'/profile'}>Profile</NavLink>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;
