import React from 'react';
import CopyrightIcon from '@material-ui/icons/Copyright';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

const Footer = () => {
    return (
        <div className={'footerContainer'}>
            <section className={'footerContainer__topSection'}>
                <div className={'footerContainer__topSection__leftBlock'}>
                    <div
                        className={
                            'footerContainer__topSection__leftBlock__followUs'
                        }
                    >
                        <h1>Follow us</h1>
                    </div>
                    <div
                        className={
                            'footerContainer__topSection__leftBlock__socials'
                        }
                    >
                        <a
                            className={
                                'footerContainer__topSection__leftBlock__socials__facebook'
                            }
                            href={'http://www.facebook.com'}
                            target={'_blank'}
                            rel="noopener noreferrer"
                        >
                            <FacebookIcon
                                color={'inherit'}
                                fontSize={'inherit'}
                                href={'www.facebook.com/sd'}
                            />
                        </a>
                        <a
                            className={
                                'footerContainer__topSection__leftBlock__socials__instagram'
                            }
                            href={'http://www.instagram.com'}
                            target={'_blank'}
                            rel="noopener noreferrer"
                        >
                            <InstagramIcon fontSize={'inherit'} />
                        </a>
                    </div>
                </div>
                <div className={'footerContainer__topSection__rightBlock'}>
                    <div
                        className={
                            'footerContainer__topSection__rightBlock__email'
                        }
                    >
                        <a href={'mailto:support@kakawpod.com'}>
                            support@kakawpod.com
                        </a>
                    </div>
                </div>
            </section>
            <section className={'footerContainer__bottomSection'}>
                <CopyrightIcon />
                <p>2020 KakawPod</p>
            </section>
        </div>
    );
};

export default Footer;
