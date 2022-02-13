import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { userActions } from "../store/user";


export function useAutentification() {
    const { login } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!login) {            
            dispatch(userActions.checkAutentification());
        }
        // eslint-disable-next-line
    },[login])
}