import React from 'react';

const Profile = () => {
    return (
        <div className={'profileContainer'}>
            <section className={'profileContainer__profileImageWrapper'}>
                <h1>user name </h1>
            </section>
            <section className={'profileContainer__detailsWrapper'}>
                <div
                    className={
                        'profileContainer__detailsWrapper__contactWrapper'
                    }
                ></div>
            </section>
        </div>
    );
};

export default Profile;
