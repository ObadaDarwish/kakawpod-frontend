export const getTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
        total +=
            item.category === 'luxuryBox'
                ? item.total
                : item.price * item.count;
    });
    return total;
};
