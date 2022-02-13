import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { userActions } from "../../../store/user";
import { links } from "../../../const/pageLinks";
import { useValidation } from "../../../hooks/useValidation";
import { ErrorMessage } from "../../../components";

import style from "./login.module.scss";
import scribe from "./img/scribe.png";


export const Login = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { login, error } = useSelector((store) => store.user);

    // input validation
    const email = useValidation("", {isEmpty: true, isEmail: true});
    const password = useValidation("", {isEmpty: true, minLength: 5, maxLength: 15});

    useEffect(() => {
        if (error) {            
            dispatch(userActions.removeError()); 
        };
        // eslint-disable-next-line  
    }, [])

    useEffect(() => {
        if (login) {            
            navigate(links.main);
        };
        // eslint-disable-next-line
    }, [login])    

    const setErrorMessage = (input) => {
        return input?.error 
            ? input.error.map((message, index) => {
                return <ErrorMessage message={ message } key={index}/>
            })
            : null
    }

    const singIn = (e) => {
        e.preventDefault()
        const userData = {
            email: email.value,
            password: password.value
        }
        dispatch(userActions.login(userData));    
    }
    
    return(
        <div className={ style.login }>
            <div className={ style.login__baner }>
                <img className={ style["login__baner-img"] } src={ scribe } alt="scribe" />
            </div>
            <div className={ style.login__form__wrapper }>
                <h1 className={ style.login__title } >
                    Login
                </h1>
                <form className={ style.login__form }
                    onSubmit={(e) => singIn(e)}
                >
                    { error && <ErrorMessage message={error}/> }
                    { email.isDirty && setErrorMessage(email) }
                    <input className={ email.isDirty && email.error?.length > 0 ? `${ style.login__input } ${ style.error }` : style.login__input }
                        type="email" 
                        placeholder="Email"
                        onChange= { (e) => email.onChange(e) }
                        onBlur={ (e) => email.onBlur(e) }
                        value = {email.value}
                    />
                    { password.isDirty && setErrorMessage(password) }
                    <input className={ password.isDirty && password.error?.length > 0 ? `${ style.login__input } ${ style.error }` : style.login__input }
                        type="password" 
                        placeholder="Введите пароль"
                        onChange= { (e) => password.onChange(e) }
                        onBlur={ (e) => password.onBlur(e) }
                        value = {password.value}
                    />
                    <button className={ style.login__btn } 
                        type="submit"
                        disabled={ !email.inputValid || !password.inputValid }
                    >
                        Войти
                    </button>
                </form>
                <hr className={ style.login__line } />
                <button  className={ style.login__btn } onClick={() => {navigate( `${links.autentification}${links.registration}` )}}>
                    Зарегистрироваться
                </button>
            </div>
        </div>
    )
}