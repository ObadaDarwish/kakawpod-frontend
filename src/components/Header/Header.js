import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import icon from '../../assets/images/cocoaPlant.png';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import UserMenu from './User_menu/User_menu';
import VerifyEmailPrompt from './VerifyEmailPrompt/VerifyEmailPrompt';
import { toggleCart } from '../../store/actions/cart_actions';
import CartDropDown from '../CartDropDown/CartDropDown';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -4,
        top: 15,
        border: `2px solid #F3E1E1`,
        fontSize: '1.2rem',
        width: '2.4rem',
        height: '2.4rem',
        borderRadius: '10rem',
        background: '#7D5A5A',
    },
}))(Badge);
const Header = ({ scrollToContact, scrollToAbout }) => {
    const history = useHistory();
    const isAuth = useSelector((state) => state.user);
    const isLoading = useSelector((state) => state.loadingIndicator);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const sm = useMediaQuery('(max-width:768px)');
    const [canShowEmailPrompt, setShowEmailPrompt] = useState(true);
    const headerRef = useRef();
    useEffect(() => {
        let canUpdate = true;
        if (cart.can_show_dropDown && canUpdate) {
            dispatch(toggleCart());
        }
        return () => {
            canUpdate = false;
        };
    }, []);
    useEffect(() => {
        window.addEventListener('scroll', windowScroll);
        return () => {
            window.removeEventListener('scroll');
        };
    }, []);
    const windowScroll = () => {
        if (window.pageYOffset > 60) {
            headerRef.current.classList.add(
                'headerOuterContainer__headerContainer__animateHeader'
            );
        } else {
            headerRef.current.classList.remove(
                'headerOuterContainer__headerContainer__animateHeader'
            );
        }
    };
    const closePrompt = () => {
        setShowEmailPrompt(false);
    };
    const showDropDownCart = () => {
        if (!history.location.pathname.includes('/cart')) {
            if (sm) {
                history.push('/cart');
            } else {
                dispatch(toggleCart());
            }
        }
    };
    return (
        <div className={'headerOuterContainer'}>
            {canShowEmailPrompt && isAuth && !isAuth.email_verified && (
                <VerifyEmailPrompt closePrompt={closePrompt} />
            )}

            <div className={'headerOuterContainer__headerTopContainer'}>
                <section className={'headerOuterContainer__navigationTabs'}>
                    <a
                        onClick={scrollToContact}
                        className={'headerOuterContainer__navigationTabs__tab'}
                    >
                        contact us
                    </a>
                    <a
                        onClick={scrollToAbout}
                        className={'headerOuterContainer__navigationTabs__tab'}
                    >
                        about
                    </a>
                </section>
            </div>
            <div
                className={'headerOuterContainer__headerContainer'}
                ref={headerRef}
            >
                {cart.can_show_dropDown && <CartDropDown cart={cart} />}
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
                        <p>D&H</p>
                        <span>Chocolate</span>
                    </Link>
                </section>
                <section className={'headerOuterContainer__navigationTabs'}>
                    {isAuth && <UserMenu isAuth={isAuth} />}
                    {!isAuth && (
                        <NavLink
                            className={
                                'headerOuterContainer__navigationTabs__tab'
                            }
                            to={'/login'}
                        >
                            login
                        </NavLink>
                    )}
                    <NavLink
                        className={'headerOuterContainer__navigationTabs__tab'}
                        to={'/shop'}
                    >
                        shop
                    </NavLink>

                    <IconButton
                        aria-label="cart"
                        className={
                            'headerOuterContainer__navigationTabs__cartIcon'
                        }
                        onClick={showDropDownCart}
                    >
                        <StyledBadge
                            badgeContent={cart.items.length}
                            color="secondary"
                        >
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
