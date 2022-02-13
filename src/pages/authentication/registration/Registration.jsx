import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../../../store/user";
import { useNavigate } from "react-router-dom";
import { links } from "../../../const/pageLinks";
import { useValidation } from "../../../hooks/useValidation";
import { ErrorMessage } from "../../../components";

import style from "./registration.module.scss";
import scribe from "./img/scribe.png";
import { useEffect } from "react";


export const Registration = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { login, error } = useSelector((store) => store.user);
    
    // input validation
    const username = useValidation("", {isEmpty: true, minLength: 5, maxLength: 15, checkSpecialChar: true});
    const email = useValidation("", {isEmpty: true, isEmail: true});
    const password = useValidation("", {isEmpty: true, minLength: 5, maxLength: 15});
    const confirmPassword = useValidation("", {isEmpty: true, confirmValue: password.value});

    const setErrorMessage = (input) => {
        return input?.error 
            ? input.error.map((message, index) => {
                return <ErrorMessage message={ message } key={index}/>
            })
            : null
    
        }
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

    const registration = (e) => {
        e.preventDefault()
        const userData = {
            username: username.value,
            email: email.value,
            password: password.value
        }
        dispatch(userActions.registration(userData));    
    }

    return(
        <div className={ style.registration }>
            <div className={ style.registration__baner }>
                <img className={ style["registration__baner-img"] } src={ scribe } alt="scribe" />
            </div>
            <div className={ style.registration__form__wrapper }>
                <h1 className={ style.registration__title } >
                    Registration
                </h1>
                <form className={ style.registration__form }
                    onSubmit={(e) => registration(e)}
                >
                    { error && <ErrorMessage message={error}/> }
                    { username.isDirty && setErrorMessage(username) }
                    <input className={ username.isDirty && username.error?.length > 0 ? `${ style.registration__input } ${ style.error }` : style.registration__input } 
                        type="text"  
                        placeholder="Введите ваше Имя"
                        onChange= { (e) => username.onChange(e) }
                        onBlur={ (e) => username.onBlur(e) }
                        value = {username.value}
                    />
                    { email.isDirty && setErrorMessage(email) }
                    <input className={ email.isDirty && email.error?.length > 0 ? `${ style.registration__input } ${ style.error }` : style.registration__input }
                        type="email" 
                        placeholder="Email"
                        onChange= { (e) => email.onChange(e) }
                        onBlur={ (e) => email.onBlur(e) }
                        value = {email.value}
                    />
                    { password.isDirty && setErrorMessage(password) }
                    <input className={ password.isDirty && password.error?.length > 0 ? `${ style.registration__input } ${ style.error }` : style.registration__input }
                        type="password" 
                        placeholder="Введите пароль"
                        onChange= { (e) => password.onChange(e) }
                        onBlur={ (e) => password.onBlur(e) }
                        value = {password.value}
                    />
                    { confirmPassword.isDirty && setErrorMessage(confirmPassword) }
                    <input className={ confirmPassword.isDirty && confirmPassword.error?.length > 0 ? `${ style.registration__input } ${ style.error }` : style.registration__input }
                        type="password" 
                        placeholder="Подтвердите пароль"
                        onChange= { (e) => confirmPassword.onChange(e) }
                        onBlur={ (e) => confirmPassword.onBlur(e) }
                        value = {confirmPassword.value}
                    />
                    <button className={ style.registration__btn } 
                        type="submit"
                        disabled={!username.inputValid || !email.inputValid || !password.inputValid || !confirmPassword.inputValid}
                    >
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </div>
    )
}