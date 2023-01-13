import { useEffect, useLayoutEffect, useState, constructorHasRun } from "react";
import axios from "axios";

const Register = () => {
    const [loginForm, setLoginForm] = useState(
        {
            name: {
                value: '',
                class: 'form-control',
            },
            email: {
                value: '',
                class: 'form-control',
            },
            password: {
                value: '',
                class: 'form-control',
            },
            password_confirmation: {
                value: '',
                class: 'form-control',
            },
        }
    );
    const [loginFormResponse, setLoginFormResponse] = useState(
        {
            'status': 200,
            'message': '',
        }
    );

    const constructor = () => {
        if (constructorHasRun) return;
    };

    // useEffect(() => {
    //     console.log('componente montado');
    // });

    // useLayoutEffect(() => {
    //     console.log(
    //         "This only happens ONCE.  But it still happens AFTER the initial render."
    //     );
    // });

    constructor();

    function login(e) {
        e.preventDefault();

        setLoginForm({
            ...loginForm, 
            name: {...loginForm.name, class: 'form-control'},
            email: {...loginForm.email, class: 'form-control'},
            password: {...loginForm.password, class: 'form-control'},
            repeatPassword: {...loginForm.repeatPassword, class: 'form-control'},
        });

        axios({
            method: 'post',
            url: process.env.REACT_APP_API_URL + '/register',
            data: {
                name: loginForm.name.value,
                email: loginForm.email.value,
                password: loginForm.password.value,
                password_confirmation: loginForm.password_confirmation.value,
            },
        })
        .then(response => {
            console.log('La respuesta fue devuelta');
            console.log(response.data);
            setLoginFormResponse({
                status: response.status, 
                message: response.data
            })
        })
        .catch(error => {
            console.log('Ocurrió un error inesperado');
            let response = JSON.parse(error.response.data);

            const wrongField = Object.keys(response)[0];

            setLoginFormResponse({
                status: error.request.status, 
                message: response[wrongField]
            });

            setLoginForm({...loginForm, [wrongField]: {...loginForm[wrongField], class: 'form-control input-error'}});
        });
    }

    function hasError() {
        if (loginFormResponse.status != 200) {
            return <div className={'form-error animate__animated animate__bounce'}>{loginFormResponse.message}</div>;
        }
    }

    return (
        <div class='container'>
            {hasError()}
            <form onSubmit={login}>
                <input type='text' name="name" className={loginForm.name.class} placeholder='Nombre' onChange={e => setLoginForm({...loginForm, name: {...loginForm.name, value: e.target.value}})} />
                <input type='email' name="email" className={loginForm.email.class} placeholder='Correo electrónico' onChange={e => setLoginForm({...loginForm, email: {...loginForm.email, value: e.target.value}})} />
                <input type='password' name="password" className={loginForm.password.class} placeholder='Contraseña' onChange={e => setLoginForm({...loginForm, password: {...loginForm.password, value: e.target.value}})} />
                <input type='password' name="password_confirmation" className={loginForm.password_confirmation.class} placeholder='Repetir contraseña' onChange={e => setLoginForm({...loginForm, password_confirmation: {...loginForm.password_confirmation, value: e.target.value}})} />

                <input type='submit' value='Enviar' />
            </form>
        </div>
    );
}


export default Register;