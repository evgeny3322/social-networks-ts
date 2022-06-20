import React from 'react';
import s from "./Login.module.css";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {AuthReducerStateType} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return (
        <form className={s.formBlock} onSubmit={props.handleSubmit}>
            <h1>
                Test
            </h1>
            <div>
                Login: free@samuraijs.com <br/>
                Password: free
            </div>
            <hr/>
            <div >
                <div className={s.LoginBlock}>
                    <Field placeholder={"Login"} name={"login"} component={"input"}/>
                </div>
                <div className={s.LoginPass}>
                    <Field placeholder={"Password"} name={"password"} component={"input"}/>
                </div>
                <div>
                    <Field type={"checkbox"} name={"rememberMe"} component={"input"}/>Remember me
                </div>
                <div>
                    <button className={s.loginButton}>
                        Login
                    </button>
                </div>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)


type LoginPagePropsType = AuthReducerStateType & {
    makeLogIn: (email: string, password: string, rememberMe: boolean) => void
    makeLogOut: () => void
}


export const LoginPage = (props: LoginPagePropsType) => {

    const onSubmit = (formData: FormDataType) => {
        console.log(formData);
        props.makeLogIn(formData.login, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Navigate to={"/profile"}/>
    }

    return (
        <div className={s.loginPage}>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
}

