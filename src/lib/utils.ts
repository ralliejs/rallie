export const getmappedState = (state: Object) => {
    const mappedState = {}; 
    Object.keys(state).forEach((key) => {
        mappedState[key] = state[key].value;
    });
    return JSON.parse(JSON.stringify(mappedState));
};