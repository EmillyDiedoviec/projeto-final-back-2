import React from 'react';

const Login: React.FC = () => {
    return (
        <React.Fragment>
            <main id='login' className='w-[100vw] h-[100vh] fixed bg-orange-100'>
                <div className="w-[100%] h-[100%] top-[-620px] absolute ">
                    <div className='[100%] h-[100%] grid justify-items-stretch '>
                        <div className="w-[1495px] h-[1100px] justify-self-center bg-indigo-400 rounded-full z-10" />                 
                    </div>
                </div>

                <div className='w-[100%] h-[100%] grid justify-items-stretch'>
                    <div className="w-[480px] h-[650px] justify-self-center self-center bg-indigo-950 rounded-[95px] z-50">

                        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                            <div className='flex items-center justify-center w-full'>
                                <img alt='userlogo'  className="w-[80px] h-[80px] -my-3 rounded-[35%]" src="./assets/images/icons8-user-96 (2).png" />
                            </div>

                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <h1 className="mt-10 text-center text-2xl leading-9 tracking-tight text-white text-[60px] font-zcool">
                                    LOGIN
                                </h1>
                            </div>

                            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-2" action="#" method="POST">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                            Email
                                        </label>

                                        <div className="mt-1">
                                            <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="block rounded-[22px] w-full h-12 border-0 p-5 bg-orange-50 text-gray-900 shadow-sm focus:outline-none focus:bg-orange-100"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                            Senha
                                            </label>
                                    </div>
                                    
                                    <div className="mt-1">
                                        <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block rounded-[22px] w-full h-12 border-0 p-5 bg-orange-50 text-gray-900 shadow-sm focus:outline-none focus:bg-orange-100"
                                        />
                                    </div>
                                </div>

                                <div className='w-full pt-5 flex justify-center'>
                                    <button
                                        type="submit"
                                        className="flex w-80 h-14 justify-center items-center rounded-[22px] bg-indigo-400 px-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        CADASTRAR
                                    </button>
                                </div>
                                </form>

                                <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center">
                                    <a href='/signup' className="mt-2 text-center text-2xl leading-9 tracking-tight text-white text-[20px]">
                                        Não tem uma conta? Cadastre-se!
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1810" height="849" className='absolute top-0' fill="none"><path stroke="#E66371" stroke-dasharray="10 10" stroke-linecap="round" stroke-width="5" d="M2100.75 123.04c-28.21-9.489-53.8-20.388-83.85-25.374-99.27-16.474-182.98 12.336-262.58 71.795-62.06 46.346-115.42 106.446-154.79 172.247-29.91 49.972-44.66 110.321-63.58 164.634-16.86 48.43-36.11 96.844-57.43 143.589-26.92 59.041-54.43 104.455-106.72 145.231-131.13 102.244-289.07 138.278-454.692 134.484-82.397-1.888-156.812-14.812-230.8-51.346-82.857-40.913-156.134-95.325-218.823-161.799-51.722-54.844-105.843-104.312-162.159-154.634-58.859-52.595-116.705-101.282-187.343-138.962-49.544-26.428-103.227-44.834-156.016-64.032-25.568-9.299-51.294-21.077-78.009-26.27"/><path stroke="#F9BD7E" stroke-dasharray="10 10" stroke-linecap="round" stroke-width="5" d="M-166.421 1161.79c28.977 6.95 55.485 15.54 85.872 17.85 100.403 7.62 181.065-28.48 254.772-94.74 57.452-51.64 104.964-116.215 138.011-185.227 25.097-52.411 34.138-113.815 47.888-169.577 12.262-49.722 26.894-99.638 43.743-148.075 21.281-61.178 44.421-108.838 92.678-154.072 121.004-113.424 274.912-163.286 440.204-174.165 82.233-5.412 157.553.873 234.653 30.708 86.34 33.41 164.41 81.111 233.07 141.761 56.64 50.039 115.17 94.512 175.97 139.641 63.54 47.168 125.71 90.534 199.58 121.805 51.81 21.934 107 35.514 161.37 49.96 26.33 6.997 53.05 16.45 80.14 19.257"/><path stroke="#6588E6" stroke-dasharray="10 10" stroke-linecap="round" stroke-width="5" d="M-184.332 570.382c24.154 17.041 45.389 34.694 72.65 47.945 90.073 43.785 178.782 39.843 272.721 5.415 73.224-26.836 213.875 99.922 240.461-88.242 0-208.5 352.709 95.949 521.034 121.722 190.086 29.105 495.246-164.003 600.016-164.003 117.37-30.051 371.65 61.06 410.51 125.109"/></svg>

                    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="78" className='w-56 absolute bottom-[330px] left-[10px] ' fill="none"><g fill="#22264C"><path d="M89.531 39.718c0 6.904-5.596 12.5-12.5 12.5-6.903 0-12.5-5.596-12.5-12.5 0-6.903 5.597-12.5 12.5-12.5 6.904 0 12.5 5.597 12.5 12.5Zm-22.889 0c0 5.738 4.652 10.389 10.39 10.389 5.737 0 10.388-4.651 10.388-10.389 0-5.738-4.651-10.389-10.389-10.389-5.737 0-10.389 4.651-10.389 10.39Z"/><path d="M2.863 35.886c1.581-19.82 18.93-34.604 38.749-33.023 19.82 1.581 34.604 18.93 33.023 38.749-1.581 19.82-18.93 34.604-38.749 33.023-19.82-1.581-34.604-18.93-33.023-38.749Zm67.97 5.422C72.246 23.59 59.028 8.079 41.309 6.666 23.589 5.252 8.079 18.47 6.665 36.19 5.252 53.91 18.47 69.42 36.19 70.833c17.72 1.413 33.23-11.805 34.644-29.524Z"/></g></svg>

                    <svg xmlns="http://www.w3.org/2000/svg" width="84" height="78" className='w-56 absolute bottom-[30px] left-[370px] ' fill="none"><g fill="#22264C"><path d="M41 21.14c0 11.321-9.178 20.5-20.5 20.5C9.18 41.64 0 32.46 0 21.14 0 9.816 9.18.64 20.5.64 31.822.64 41 9.816 41 21.14Zm-37.537 0c0 9.409 7.628 17.037 17.037 17.037 9.41 0 17.038-7.628 17.038-17.038S29.91 4.101 20.501 4.101c-9.41 0-17.038 7.628-17.038 17.038Z"/><path d="M84 41.64c0 19.881-16.117 36-36 36-19.882 0-36-16.119-36-36 0-19.883 16.118-36 36-36 19.883 0 36 16.117 36 36Zm-68.185 0c0 17.775 14.41 32.185 32.186 32.185 17.775 0 32.185-14.41 32.185-32.186S65.776 9.454 48 9.454c-17.775 0-32.185 14.41-32.185 32.185Z"/></g></svg>

                    <svg xmlns="http://www.w3.org/2000/svg" width="79" height="66"  className=' absolute bottom-[350px] right-[20px]' fill="none"><g fill="#22264C"><path d="M45.127 49.634c-1.027-8.69 5.185-16.566 13.875-17.593 8.69-1.027 16.567 5.185 17.594 13.875 1.026 8.69-5.186 16.567-13.876 17.593-8.69 1.027-16.566-5.185-17.593-13.875Zm28.811-3.404c-.853-7.222-7.4-12.385-14.622-11.532-7.222.854-12.385 7.4-11.532 14.622.854 7.222 7.4 12.385 14.622 11.532 7.223-.853 12.386-7.4 11.532-14.622Z"/><path d="M3.265 34.8C1.462 19.54 12.37 5.706 27.63 3.903 42.89 2.1 56.723 13.01 58.526 28.27 60.33 43.53 49.42 57.363 34.16 59.166 18.9 60.969 5.068 50.06 3.265 34.799Zm52.334-6.184C53.987 14.973 41.62 5.22 27.977 6.832 14.334 8.444 4.58 20.81 6.192 34.453c1.612 13.644 13.98 23.397 27.622 21.785C47.458 54.626 57.211 42.259 55.6 28.616Z"/></g></svg>

                    <svg xmlns="http://www.w3.org/2000/svg" className='w-56 absolute bottom-[2px] right-[380px] ' fill="none"><path fill="#000" d="M1.036 13.455C-2.196 6.86 3.406-.622 10.644.624l144.121 24.8c5.134.883 8.464 5.939 7.043 10.951-13.384 47.207-38.58 80.291-85.884 108.382-4.424 2.627-10.115.837-12.38-3.783L1.036 13.454Z"/></svg>

                    <svg xmlns="http://www.w3.org/2000/svg" className='w-56 absolute bottom-[10px] right-[400px] ' fill="none"><path fill="#6588E6" d="M1.571 13.583C-1.66 6.988 3.942-.493 11.18.753l144.121 24.8c5.134.883 8.464 5.939 7.043 10.95-13.383 47.207-38.579 80.292-85.884 108.383-4.424 2.627-10.115.836-12.38-3.783L1.573 13.583Z"/></svg>

                    <svg xmlns="http://www.w3.org/2000/svg" width="273" height="274" className='absolute bottom-[30px] right-[45px]' fill="none"><path fill="#1E1E1E" d="M255.846 70.892a136.497 136.497 0 0 1-117.181 202.73A136.496 136.496 0 0 1 3.062 165.889 136.5 136.5 0 0 1 174.047 5.905l-.912 3.186a133.185 133.185 0 1 0 79.814 63.41l2.897-1.609Z"/></svg>


                    <svg xmlns="http://www.w3.org/2000/svg" width="273" height="273" 
                    className=' absolute bottom-[50px] right-[20px]' fill="none"><path fill="#F9BD7E" d="M255.846 70.253a136.498 136.498 0 0 1-117.181 202.73A136.496 136.496 0 0 1 3.062 165.25 136.5 136.5 0 0 1 174.047 5.266L136.5 136.5l119.346-66.247Z"/></svg>

                    <svg xmlns="http://www.w3.org/2000/svg" width="127" height="139"
                    className=' absolute bottom-[132px] left-[80px]'  fill="none"><path fill="#1E1E1E" d="M.16 15.978C-.396 4.504 11.625-3.312 21.887 1.854l96.386 48.516c10.34 5.205 11.137 19.665 1.431 25.974L28.54 135.61c-9.705 6.31-22.597-.287-23.158-11.85L.16 15.978Z"/></svg>

                    <svg xmlns="http://www.w3.org/2000/svg" width="136" height="148" className=' absolute bottom-[150px] left-[100px]'  fill="none"><path fill="#E66371" d="M.603 16.081C.047 4.607 12.068-3.208 22.33 1.957l104.934 52.82c10.341 5.204 11.138 19.664 1.432 25.974l-99.25 64.521c-9.705 6.31-22.597-.287-23.157-11.85L.603 16.082Z"/></svg>
                </div>

            </div>
        </main>

        </React.Fragment>
    );
};

export default Login;