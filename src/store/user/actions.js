import { 
    firebaseRegistration, 
    firebaseLogin,
    firebaseLogout,
    firebaseAuthCheck
} from "../../services/firebaseAuth";

export const userActionTypes = {
    SET_USER: "USER.SET_USER",
    RESET_USER: "USER.RESET_USER",
    SET_ERROR: "USER.SET_ERROR",
    REMOVE_ERROR: "USER.REMOVE_ERROR",
}

export const userActions = {
    setUser: (payload) => ({type: userActionTypes.SET_USER, payload}),
    resetUser: () => ({type: userActionTypes.RESET_USER}),
    setError: (payload) => ({type: userActionTypes.SET_ERROR, payload}),
    removeError: () => ({type: userActionTypes.REMOVE_ERROR}),

    registration: (userData) => async (dispatch) => {
        try {
            const{ email, password, username} = userData;
            const user = await firebaseRegistration(email, password, username);
            dispatch(userActions.setUser({
                username: user.displayName,
                id: user.uid,
            }));
        } catch(error) {
            dispatch(userActions.setError(error.message));
        } 
    },

    login: (userData) => async (dispatch) => {
        try {
            const{ email, password } = userData;
            const user = await firebaseLogin(email, password);
            dispatch(userActions.setUser({
                username: user.displayName,
                id: user.uid,
            }));
        } catch(error) {
            dispatch(userActions.setError(error.message));
        } 
    },

    logout: () => async (dispatch) => {
        try {
            await firebaseLogout();
            dispatch(userActions.resetUser());
        } catch(error) {
            dispatch(userActions.setError(error.message));
        } 
    },
    
    checkAutentification: () => (dispatch) => {
        try {            
            firebaseAuthCheck(dispatch, userActions.setUser, userActions.resetUser);
        }
        catch(error) {
            dispatch(userActions.setError(error.message));
        };
    },
}