import { TOGGLE_FOOTER, TOGGLE_LOGO } from '../action_types';

export const toggleFooter = (canShow) => {
    return {
        type: TOGGLE_FOOTER,
        show: canShow,
    };
};

export const toggleLogo = (canShow) => {
    return {
        type: TOGGLE_LOGO,
        show: canShow,
    };
};
