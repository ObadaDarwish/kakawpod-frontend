import { NotificationManager } from 'react-notifications';

export const successNotification = (msg, title, delay = 3000) => {
    NotificationManager.success(msg, title, delay);
};

export const errorNotification = (msg, title, delay = 3000) => {
    NotificationManager.error(msg, title, delay);
};
export const infoNotification = (msg, title, delay = 3000) => {
    NotificationManager.info(msg, title, delay);
};
