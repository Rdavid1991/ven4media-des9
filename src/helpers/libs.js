module.exports = {
    randomName: (charNumber) => {
        const posible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomName = 0;
        for (let i = 0; i < charNumber; i++) {
            randomName += posible.charAt(Math.floor(Math.random() * posible.length));
        }
        return randomName;
    },
};