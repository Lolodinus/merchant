import { useState, useEffect } from "react";

const useErrorHandler = (value, validations) => {
    const [errorMessage, setErrorMessage] = useState([]);
    useEffect(() => {
        let message = [];
        for (const validation in validations) {
            switch (validation) {
                case "isEmpty":
                    if (!value) {
                        message.push("Поле обязательно к заполнению");
                    }
                    break;
                case "minLength":
                    if (value.length < validations[validation]) {
                        message.push(`Минимальная длина ${validations[validation]}`);
                    }
                    break;
                case "maxLength":
                    if (value.length > validations[validation]) {
                        message.push(`Максимальная длина ${validations[validation]}`);
                    }
                    break;
                case "isEmail":
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!re.test(String(value).toLowerCase())) {
                        message.push("Некорректный email");
                    }
                    break;
                case "confirmValue":
                    if (value !== validations[validation]) {
                        message.push("Пароль не совпадает");
                    }
                    break;
                case "checkSpecialChar":
                    const reSpecialChar = /[!@#$%^&*()+=\-[\]\\';,/{}|":<>?]/;
                    if (value.match(reSpecialChar)) {
                        message.push("Запрещено использовать специальные символы");
                    }
                    break;
                default:
                    break
            }
        }
        setErrorMessage([
            ...message,
        ]);

        // eslint-disable-next-line
    }, [value, validations.confirmValue])
    
    return errorMessage;
}



export const useValidation = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(false);
    const error = useErrorHandler(value, validations);

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onBlur = (e) => {
        setDirty(true);
        setValue(e.target.value);
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        error,
        inputValid: error.length > 0 ? false : true
    }
}