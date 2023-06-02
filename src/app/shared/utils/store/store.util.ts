export const storeUtil = {
    getActionType: ((featureKey: string, desc: string) => {
        return `${featureKey.slice(0, 1).toUpperCase() + featureKey.slice(1)} ${desc}`;
    })
};
