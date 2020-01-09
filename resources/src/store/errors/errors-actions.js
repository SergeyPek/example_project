export const SET_ERRORS = 'SET_ERRORS';
export const setErrors = (errors) => ({
    type: SET_ERRORS,
    payload: {
        errors: errors
    }
});