import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { useAppDispatch } from '../store/hooks';
import { getNotesAsyncThunk, loginAsyncThunk, userCreateAsyncThunk } from '../store/modules/UserLogged';

interface FormCompProps {
    textButton: 'LOGAR' | 'CADASTRAR';
    mode: 'login' | 'signUp';
}

const FormComp: React.FC<FormCompProps> = ({ textButton, mode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorRepassword, setErrorRepassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const userlogged = useAppSelector(state => state.userLogged.userLogged);
    const listUsers =  useAppSelector(state => state.users.users);
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [alertSucess, setAlertSucess] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [alertErrorExist, setAlertErrorExist] = useState(false);

    useEffect(() => {
        if (mode === 'signUp') {
            const emailValid = email.includes('.com') || (email.includes('.com.br') && email.includes('@'));

            if (email.length > 0) {
                setErrorEmail(!emailValid);
            }

            const passwordValid = password.length >= 6;
            if (password.length > 0) {
                setErrorPassword(!passwordValid);
            }

            const repasswordValid = password === repassword;
            if (repassword.length > 0) {
                setErrorRepassword(!repasswordValid);
            }

            setDisabled(!(emailValid && passwordValid && repasswordValid));
        }
    }, [email, password, repassword, mode]);

    useEffect(() => {
        if (userlogged.email) {
            navigate('/notes');
        }
    }, [userlogged]);

    function handleSubmit(evento: FormEvent) {
        evento.preventDefault();

        if (mode === 'login') {
            const user = {
                email: email,
                password: password
            };

            const userExist = listUsers.find(
                (value) =>
                    value.email === user.email &&
                            value.password === user.password
            );
            if (!userExist) {
                setAlertError(true);
                setTimeout(() => {
                    setAlertError(false);
                }, 5000);
                return;
            } 

            dispatch(loginAsyncThunk(user));
            dispatch(getNotesAsyncThunk(email)); 

        } else {
            const newUser = {
                email,
                password,
                repassword,
            };

            const retorno = listUsers.some(
                (value) => value.email === newUser.email
            );
            if (retorno) {
                setAlertErrorExist(true);
                setTimeout(() => {
                    setAlertErrorExist(false);
                }, 5000);
                return;
            }
        
            setAlertSucess(true);
            setTimeout(() => {
                setAlertSucess(false);
            }, 5000);
            
                dispatch(userCreateAsyncThunk({ email, password, repassword }));

            setTimeout(() => {
                navigate('/login');
            }, 1000);
        }
    }


    return (
        <>
            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-2" onSubmit={ev => handleSubmit(ev)}>
                <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                    Email
                </label>

                <div>
                    <input
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block rounded-[22px] w-[100%] h-[10%] border-0 p-[4%] bg-orange-50 text-gray-900 shadow-sm focus:outline-none focus:bg-orange-100 "
                    />
                </div>
                </div>

                <div>
                <div className="flex items-center justify-between mt-[5%]">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                    Senha
                    </label>
                </div>

                <div>
                    <input
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block rounded-[22px] w-[100%] h-[10%] border-0 p-[4%] bg-orange-50 text-gray-900 shadow-sm focus:outline-none focus:bg-orange-100"
                    />
                </div>

                {mode === 'signUp' && (
                    <>
                        <div className="flex items-center justify-between mt-[5%]">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                Repetir a senha
                            </label>
                        </div>

                        <div>
                            <input
                                value={repassword}
                                onChange={ev => setRepassword(ev.target.value)}
                                id="repassword"
                                name="repassword"
                                type="password"
                                required
                                className="block rounded-[22px] w-[100%] h-[10%] border-0 p-[4%] bg-orange-50 text-gray-900 shadow-sm focus:outline-none focus:bg-orange-100"
                            />
                        </div>
                    </>

                )}
            </div>

            <div className="w-full pt-5 flex justify-center">
                <button
                type="submit"
                disabled={disabled}
                className="flex w-[85%] h-14 justify-center items-center rounded-[22px] bg-indigo-400 px-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                {textButton}
                </button>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center">
                        {mode === 'login' ? (
                            <a 
                            href="/signup"
                            className="mt-2 text-center text-2xl leading-9 tracking-tight text-white text-[20px]">
                                Não tem uma conta? Cadastre-se!
                            </a>
                        ) : (
                            <a 
                            href="/"
                            className="mt-2 text-center text-2xl leading-9 tracking-tight text-white text-[20px]">
                                Já tem uma conta? Entre agora mesmo!
                            </a>
                        )}
                    </div>
            </form>

            </div>
        </>
    );
};

export default FormComp;