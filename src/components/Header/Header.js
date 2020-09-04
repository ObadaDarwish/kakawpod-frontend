import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import icon from '../../assets/images/cocoaPlant.png';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { useSelector } from 'react-redux';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -4,
        top: 15,
        border: `2px solid #F3E1E1`,
        fontSize: '1.2rem',
        width: '2.4rem',
        height: '2.4rem',
        borderRadius: '10rem',
    },
}))(Badge);
const Header = () => {
    const isAuth = useSelector((state) => state.user);
    const isLoading = useSelector((state) => state.loadingIndicator);
    return (
        <div className={'headerOuterContainer'}>
            <div className={'headerOuterContainer__headerContainer'}>
                <section
                    className={'headerOuterContainer__headerContainer__logo'}
                >
                    <Link
                        to={'/'}
                        className={
                            'headerOuterContainer__headerContainer__logo__wrapper'
                        }
                    >
                        <img
                            src={icon}
                            name="ODs chocolate logo"
                            alt="ODs chocolate logo"
                        />
                        <p>
                            ODs <br />
                            <span>Chocolate</span>
                        </p>
                    </Link>
                </section>
                <section
                    className={
                        'headerOuterContainer__headerContainer__navigationTabs'
                    }
                >
                    {!isAuth && <NavLink to={'/login'}>login</NavLink>}

                    <NavLink to={'/about'}>about</NavLink>
                    <IconButton
                        aria-label="cart"
                        className={
                            'headerOuterContainer__headerContainer__navigationTabs__cartIcon'
                        }
                    >
                        <StyledBadge badgeContent={4} color="secondary">
                            <ShoppingCartOutlinedIcon fontSize={'large'} />
                        </StyledBadge>
                    </IconButton>
                </section>
            </div>
            {isLoading && <LoadingIndicator />}
        </div>
    );
};

export default Header;
