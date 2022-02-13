import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut
} from "firebase/auth";

import { auth } from "../config/firebase";

// registration
export async function firebaseRegistration(email, password, username) {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password)
            .then(currentUser => {
                const user = currentUser.user;
                return user;
            }).catch(error => {
                switch(error.code) {
                    case "auth/email-already-in-use": {
                        throw new Error("Пользователь с таким email уже существует.");
                    }
                    case "auth/invalid-email": {
                        throw new Error("Введённый email не доступен для регистрации.");
                    }
                    case "auth/operation-not-allowed": {
                        throw new Error("Регестрация в данный момент недоступна.");
                    }
                    case "auth/weak-password": {
                        throw new Error("Введённый пароль недостаточно надёжный.");
                    }
                    default: {
                        throw new Error(`${error.code} - ${error.message}`);
                    }
                }
            })
            
            await updateProfile(auth.currentUser, {
                displayName: username
            });
            
            return user;
    } catch(error) {
        console.log(error.message);
        throw new Error(error.message);
    };
}

// login
export async function firebaseLogin(email, password) {    
    try {
        return await signInWithEmailAndPassword(auth, email, password)
            .then(currentUser => {
                const user = currentUser.user;
                return user;
            }).catch(error => {
                switch(error.code) {
                    case "auth/invalid-email": {
                        throw new Error("Вы ввели не верный email.");
                    }
                    case "auth/user-disabled": {
                        throw new Error("Вы были забанены администрацией этого сайта.");
                    }
                    case "auth/user-not-found": {
                        throw new Error("Пользователь с таким email не был найден.");
                    }
                    case "auth/wrong-password": {
                        throw new Error("Пароль был введён неверно.");
                    }
                    case "auth/too-many-requests": {
                        throw new Error("Вам временно отказанно в доступе. Попробуйте войти в другой раз.");
                    }
                    default: {
                        throw new Error(`${error.code} - ${error.message}`);
                    }
                }
            })
    } catch(error) {
        console.log(error.message);
        throw new Error(error.message);
    };
}

// check auth
export function firebaseAuthCheck(dispatch, setUser, resetUser) {
    try {
        return onAuthStateChanged(auth, (user) => {
            return user 
                ? dispatch(setUser({
                    username: user.displayName,
                    id: user.uid,
                }))
                : dispatch(resetUser());
        })
    } catch(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode} - ${errorMessage}`)
    };
}

// logout
export async function firebaseLogout() {
    return signOut(auth).then(() => {
        return true
      }).catch((error) => {
        throw new Error(`${error.code} - ${error.message}`);
      });
}
