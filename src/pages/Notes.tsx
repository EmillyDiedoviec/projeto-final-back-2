import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect, useState } from 'react';
import NoteType from '../types/NoteType';
import { useNavigate } from 'react-router-dom';
import { getNotesAsyncThunk, noteArchiveAsyncThunk, noteDeleteAsyncThunk } from '../store/modules/UserLogged';

const Notes: React.FC = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [noteEdit, setNoteEdit] = useState<NoteType>({} as NoteType);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [thisNote, setThisNote] = useState<NoteType>({} as NoteType);
    const listNotes = useAppSelector(state => state.userLogged.userLogged.notes);
    const email = useAppSelector(state => state.userLogged.userLogged.email);
    const archivedNotes = listNotes.filter(item => item.archived);
    const [showArchived, setShowArchived] = useState(false);
    const [filterTask, setFilterTask] = useState('');
    const user = useAppSelector(state => state.userLogged.userLogged);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

/*     useEffect(() => {
        if (!user.email) {
            navigate('/');
        }
    }, []); */

    const handleClose = () => {
        setOpenAdd(false);
    };
    const addNotes = () => {
        setOpenAdd(false);
    };
    const openModalImput = () => {
        setOpenAdd(true);
    };

    const handleDelete = (item: NoteType) => {
        setThisNote(item);
        setDeleteConfirm(true);
    };

    const handleDeleteConfirm = () => {
        const deleteNote = {
            id: thisNote?.id,
            email
        };

        dispatch(noteDeleteAsyncThunk(deleteNote));
        setTimeout(() => {
            dispatch(getNotesAsyncThunk(deleteNote.email));
        }, 500);
        setDeleteConfirm(false);
    };

    const handleDeleteCancel = () => {
        setDeleteConfirm(false);
    };

    const handleEdit = (item: NoteType) => {
        setNoteEdit(item);
        setOpenModalEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenModalEdit(false);
    };

    const addNotesEdit = () => {
        setOpenModalEdit(false);
    };

    const noteArchived = (id: string) => {
        if (archivedNotes) {
            dispatch(noteArchiveAsyncThunk({ id: id, email: email }));
            setTimeout(() => {
                dispatch(getNotesAsyncThunk(email));
            }, 200);
        }
    };

    const handleShowArchivedChange = () => {
        setShowArchived(!showArchived);
    };

    return (
        <main className='w-[100vw] h-[100vh] bg-orange-50 flex'>
        <section className='w-[1495px] h-[1495px] bg-[#6588E6] fixed rounded-full bottom-[-1100px] right-[-112px]' >
        </section>

        <section className='h-[100%] w-[15%] bg-[#22264C] fixed flex-col flex gap-16 z-40'>
            <div className='w-[100%] mt-7 flex items-center flex-col'>
                <img className='rounded-[100px] w-24' src="./assets/images/Rectangle.png" alt="" />
                <p className='text-white font-zcool text-[25px] '>Bem vindo(a)</p>
                <p className='text-white font-zcool text-[20px]'>email</p>
            </div>
                
            <div className='flex items-center flex-col'>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="70" height="70" viewBox="0,0,256,256">
                        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="none" stroke-linecap="none" stroke-linejoin="none" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" ><g transform="scale(5.33333,5.33333)"><circle cx="28" cy="28" r="18.5" fill="#f46675" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter"></circle><path d="M35.4,38.8c-3.2,2.4 -7.1,3.9 -11.4,3.9c-10.3,0 -18.7,-8.4 -18.7,-18.7c0,-2.6 0.6,-5.2 1.5,-7.4" fill="none" stroke="#18193f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.1,9.6c3.2,-2.6 7.4,-4.3 11.9,-4.3c10.3,0 18.7,8.4 18.7,18.7c0,2.3 -0.4,4.5 -1.2,6.6" fill="none" stroke="#18193f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M24,14v20" fill="none" stroke="#18193f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M34,24h-20" fill="none" stroke="#18193f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></g></g>
                    </svg>
                </button>

                <button>
                    <img className='w-[70px]' src="data:image/png;base64,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"></img>
                </button>
            </div>

            <div className='flex items-center flex-col mt-20 ml-2'>
                <button>
                <img className='w-[85px] h-[85px]' src="data:image/png;base64,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"></img>

                </button>
            </div>

        </section>

        <section className=' w-[85%] h-[100%] ml-[15%] flex flex-col items-center justify-center z-40'>
            <div className='w-[70%] h-[15%] bg-[#6588E6] mt-10 rounded-full flex justify-center items-center'>
                <input className='w-[75%] h-[50%] bg-[#FFFAEE] rounded-full indent-7'></input>
                <button>
                    <img className='w-[70px] h-[70px]' src="data:image/png;base64,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"></img>
                </button>
            </div>

            <div className='w-[100%] h-[75%] mt-12 flex flex-wrap justify-center'>
                <div className=" w-[300px] h-[175px] p-3 m-4 rounded-lg shadow bg-[#f46675] flex items-center flex-col pt-7">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">título</h5>
                    <p className="font-normal text-black">descrição</p>
                    <div className=' w-[53%] h-[100%] flex felx-row items-end justify-between'>
                        <button>
                            <img className='w-[40px] h-[40px]' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEiUlEQVR4nO2Zf2gcRRTHJwWt/1QkMTczm2qgTSptUoyNSUWamUuultrYUrWN+W2b7FwTk2iF1BhtEkjt7YRSoYLaijaiotCiaP/yDxERA0JVEJoWRK3Gm4k/IviHCAbbkb3c7d1e9pJLLnt34n3h/XE77+DzZt/MvDcLQE455ZRTKiospAghyhEmlyCif4XtK4TokKb5CkA2C0LSgDD5E2GqnAxi+itCZBfIRkFY04MwvZ4IPsZmIfTWg2wSxLQ3Fh5iOmlClpTsXF1QcO+auTdDv48GQX4uLqa3gGwQxPSkbeYRncjPr7453s/jqYMQkx8ifh5MngCZFiwKwUfTA9EJc8bj/fyGJDoX53xN479HfNdtbLj86MjVm7ImbUKpA8kbAIBVlpNSebohTjAulWlNA19Yvus3NipmiMt+Lm7PCviYt/BaKIg5+NMReNMe6f/c8ispaw4907mY7Dv1zerMwSM64UHkVXsQ5Kz+3NRLsfCm1TW8YvlUbOuPHTuUEXiIyGfhnM+DmLwcG0SVb1jpRtCCbBuaVMXr91jjO9vfscZ0Li+4Do8x8S+y2yQMon34iiotb7Wer7tjn+o8/mM0AENczDR8eMEGT2/dccy2JirpoCotb7F+a2t96qHej2ypxQz5YSbSJg5+bsHqRlBV+0YcT2GtqE7Vd7xrhw/9Z/pI2mZ+IXhmAQVVJX3GBo+1WrXrwDkHePlb58mp/KyBZ1yGcz6aNqaRB19wgBez/oDYkUn4F53hW6PwRV5F9p6aB88M8Q/jwcYVh/dg2pRkzs+D1wNTNvhEOW/C6wHRBNwQQuTt5cCb1jzwZVLwfi6agVuC0LsVIfo1xOT8UuDDcKr6vlFVWtaidrMPHOE7DdkKMqIE8AdHv1N3kafUhs1tat/hT50DcxMeY7oXYvK8ptXcthz4TVuY7dBiCeDZmGxbcXiIaZ+1YBG9kAo80rzq/oPn52+VXFzTDdnuLvxcmzeeCvz2pnGnmb/uSqWJUM2h5Gqb+fAdx66qsqouG7yv8awjvB6QXSsODzWye7mH1FJm3s9l94rDhwJAZMZteDYmH3MHHtJyW4GFvW869LApwevGdI8r8KEAMBlYpIdNKecZF72uwYcD+MS5EXfuYZe0YA3R5yq8ucuY13phmGsQk9cX6mGXAu/n4nHgthDyPhy9+iMXF+phk4afO6gOuw5vCiFqXX1ATEZDDwFYVVre+nFsEHfXHlWbtuiLL1gulZ+Lp0GalIcQFREoj4feExlgx38aj2//koFnXAymCx4UFtXeGVPjzwBQeYMZhPkmNmxum8Wad4nw8lmQTiFEu2Nqnj9sh5mDmfeW9Z3vOee8IY+CdAs67f+x1x1rfaqsqlvV7j8Tur9MVNP7uRwCmZDHvJuPn3VERcW2fvGA/r46MPpt4kbE2i7lMMikMKa3IkSfND8saBqt6DhyZQ3j8u/FwHUuZ1wtD5YrNhbckxhaTDIuOTOC2/ePXLoRZKMYF4PRhSl+YYZ8Sx8TLV0npj3gv6CeQLBAN6RfN2TlyIiKVqQ5/c/1LyBlAjuoYKbRAAAAAElFTkSuQmCC"></img>
                        </button>
                        
                        <button>
                            <img className='w-[40px] h-[40px]' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEM0lEQVR4nO2YXWhcRRTHR6ziS9BSs3PmbnZn0qjR1BY/1szsZndO0goWBQtCkT5qUVukNL7YB9GHWhQV/AAfJI+xoG190DdfihIsxYqFCvogWqRioiiKIaAm6Y7M5n7Mxrtt2Du7STAHDix3Dnf+v5255z/3ErIRG7ERXoNzvAlAv0ABzwPTczYp4JcA+PzmzfffSNZyMDY6Agx/AYYmPfXPtoasxaAU7wSGs63Fx/knQHWIrLWggFOOyGka1B7dsqXSYzPHcB8wPeOsxCdkLQWlY9sicRT03wD6jrQaCvhPDJFSs2oBUHvKEfZeyzqGJ6I6xvCJDgrSLwHTCyvYz11KvWA1rRyg0f5WWzQuh5j7/6xAq+6SC0Z3kfUWlOnJuMOw2n6y3oIyfTQB0EfJegvKavsdgMnouuHycyOU6VKebRvA7vvEpHDKAZjtGgCXs20D9PaODTgAlxyAr7oHoC60DUDIvdcB04thO1scGhq6fglAfdQJseP5qhEMzURhxAX4MANAo5VeilbBrkgI8KZv8TNCxb1fBtoZk29kBfiPFxiuxt3J60KZDwojjayniLvauBHKnC2WY4CH8jUX4LB3LzBieI87+anCSDz5M/maueyM2d/2WjRua9MAThQqcc3BZoCHvXuB6Zc7WgG4EMvFXwngtUI1rnm5r5qMbVXbvXuBGaz0uJOnCR3P1xqZBpYGcKgvqT3uQg5WejIBtPQCoX5bvs+f7Uv+xeVpO0wr8UYos8eBneKVqAP9SrJGay9QX6Q9rGkQh68i3ghl7g50XP8DL4cA8lxmgGYvwMuOF5zyBTAvlAnC2jxDM88jD5AnPQC08gL5qq8t9D1PWmjJ9QAuX/EFEHsBpbWdIcBBXw/xp8WkhT7itlCuDvgBYHgsnGC+tw9vWQJQu3210UnHA+xKJWPlB7wAEIKbAHBvEOBd0RUjKoO+jOyYs/Vedz2g/77bSKfCcLzBCFX3cZR40vEAWxNer9s5OgbQgBBq+kqtcaW5O5+00HORBwj5k1extn0CjKL9Ap0AyDM+ALYFyTMyI0IPEPIzrwDA8GRjEsBvCdl7bQhwPKv4OZ4co4sMk+eHq3c9A+jvookYw9sbAFy9mBXgG+cYXWnyAOX3IwIwPB23Q9APLgGUH88K8LHjAfuaPEA+5hWAgp5ITqV4qAFQHN6ZFWDCacFH3BbKh8f8AjB9JFkBfCsE6M8K8JzjAW83vQtL4ReA6jHHUadzOb3dENxkuFxoV/zXvGx2OKfQM8XoGC0X7L29AtjO4x7qfGcp0GYxgbtIOhG5HCoK+i/f4gVDc74Y9f9Gniadipvz+lYAfJ+C/jGr8HsCbQ7kq+Zi9AKT7P93SLfCFMu7ojORp6zb7tY1gCWI4aeNkH9kFy9/t+8ZXRUfQxByjRkoFUyxtLWtHCgV7D1WRfxqxb8N36zU9SH0zAAAAABJRU5ErkJggg=="></img>
                        </button>
                        
                        <button>
                            <img className='w-[40px] h-[40px]' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEfElEQVR4nO2ZX2wURRjA1xj0xRcTuZnt0XKUu7ZesZQeIpIyg3e2XBUoUK4edy1H2zvaxH9Vgea4yj9t93wwmhgTQSAKJhoT4wvwSAKBGAilBmJUglKqew/6oDEmgv8+M1s7u0v3bpe7ctsm9yVfbjPzzdz3m/lm5ttZQShJSUpSkpJMv/jmYEwHEaaXEKa3sEghmyJMfkaYnnGIJCIIwj2C3eL1eu/DIvkil9NZYUR62uHwI1sBMKaD+TivQpAxh7OxzjYAhOkl7hAmL7NwymUvivShCWjytwbkN1RG1gp2CNLEPAsnq+0wpkEskl81EP9gTLffXW8NRBsOk2WhT+HeuJQZTEjyWCKdgWwa3nH+T5dnw81CQhDrNgh6C2E6gjFJmUVCTgDF+RyOazW251uoXdo3LQBYq5ieswRhCJDO3LAKwDQ+PA7Lg8NQ5vT/O50QDpHsygvgTpyfqvJP26QMEfIS3xyE6A5NSI3YAJCBeFr+KyHJL+Z/LlG+JmwBKFSxxqf/N5IU21hmJ0Cal6dmN4Akj81ugHSG+1cCSNzlGah6pFMZffY7K2cgtucbaIl9ovzOWIBIchQqa0LgrGiGBVVtULf8BWiOHoXY3qtZ28woAH/ooGH6UO5qAX/oAPQMjc8MAJYnhXdeYNug4Qxky4O8DQnYsvtrewG69n8HVXUxpe9lTfsNbbpfH4No8kslfDyLojqIyupN0PnqV/YAxId/hMUr+nnf7tqIpTaB9vdZVqvOxJI4D6eiAgS3fKyOZtkqeLr7M8ttW/tOQtm8AG+/auO7xQXoGboBLs9G3u/KdW9Nsdm69yosITsVZc+31wfCR3j7ea4W6Np3rXgAa3uP8z5d7vVKnN9u429XdyH2bBROnlp1TazuOFY8gGVN+9TRb33b0IZseIfbsGcjmyc3f8Bt6htfKR7Aww1x3mfb86d0YRMIH4YnQu/Bosee5TbsmZWxOm04RQZGuM2C6rbiAbCTdbLPjtRlXt5ABkzfg5nNpD0LvclyZ3mTPQCdg1fyBugZGld2MFYuOgNgeBdrdLFVKED14q1qCPWf1oWQP3QQGte8CV5fr7rX+3qVMlanC6HkqO5QM5wB5SJJvYvZziAKBXg0sHvKHp7PIm6OHuU2dY/3GwOwuxezaTVTl7sVQi+d5X/MDi0+cjXthomZ32QbZblTTX0Xt2mKfAi5vg2cKxRixVNvqIvvteswf+E61cHQgTs+yIKak5yl3CyxywIwAcFmAonkotkHDiszwDTwzCFez3Kb1r4TlkNwU/8ZcJY3TzlLBKtidqlrNY32+rbpIALhw8oJm7WdJCtvYlrnWYbKstqEJH9vHSCdSRUKwJRNO9s9tLPlqY0qec7mgYtKzsTWRzQ5Cqs7PoKa+m6dbUXlGqVOGRBJNr8n1V+vy7viafl6oRD53l4v9IYVyAkf5GTWm7liiNsdvB+JZABh8ou58+R3jIk0dy59QJhpUlHR+CASV/YgTD7HIrmGMPkDYXITYfIDEulJJNLnbP9oWBIht/wHbV0SaN1X58QAAAAASUVORK5CYII="></img>
                        </button>
                    </div>
                </div>
                <div className=" w-[300px] h-[175px] p-3 m-4 rounded-lg shadow bg-[#FFBE7A] flex items-center flex-col pt-7">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">título</h5>
                    <p className="font-normal text-black">descrição</p>
                    <div className=' w-[53%] h-[100%] flex felx-row items-end justify-between'>
                        <button>
                            <img className='w-[40px] h-[40px]' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEiUlEQVR4nO2Zf2gcRRTHJwWt/1QkMTczm2qgTSptUoyNSUWamUuultrYUrWN+W2b7FwTk2iF1BhtEkjt7YRSoYLaijaiotCiaP/yDxERA0JVEJoWRK3Gm4k/IviHCAbbkb3c7d1e9pJLLnt34n3h/XE77+DzZt/MvDcLQE455ZRTKiospAghyhEmlyCif4XtK4TokKb5CkA2C0LSgDD5E2GqnAxi+itCZBfIRkFY04MwvZ4IPsZmIfTWg2wSxLQ3Fh5iOmlClpTsXF1QcO+auTdDv48GQX4uLqa3gGwQxPSkbeYRncjPr7453s/jqYMQkx8ifh5MngCZFiwKwUfTA9EJc8bj/fyGJDoX53xN479HfNdtbLj86MjVm7ImbUKpA8kbAIBVlpNSebohTjAulWlNA19Yvus3NipmiMt+Lm7PCviYt/BaKIg5+NMReNMe6f/c8ispaw4907mY7Dv1zerMwSM64UHkVXsQ5Kz+3NRLsfCm1TW8YvlUbOuPHTuUEXiIyGfhnM+DmLwcG0SVb1jpRtCCbBuaVMXr91jjO9vfscZ0Li+4Do8x8S+y2yQMon34iiotb7Wer7tjn+o8/mM0AENczDR8eMEGT2/dccy2JirpoCotb7F+a2t96qHej2ypxQz5YSbSJg5+bsHqRlBV+0YcT2GtqE7Vd7xrhw/9Z/pI2mZ+IXhmAQVVJX3GBo+1WrXrwDkHePlb58mp/KyBZ1yGcz6aNqaRB19wgBez/oDYkUn4F53hW6PwRV5F9p6aB88M8Q/jwcYVh/dg2pRkzs+D1wNTNvhEOW/C6wHRBNwQQuTt5cCb1jzwZVLwfi6agVuC0LsVIfo1xOT8UuDDcKr6vlFVWtaidrMPHOE7DdkKMqIE8AdHv1N3kafUhs1tat/hT50DcxMeY7oXYvK8ptXcthz4TVuY7dBiCeDZmGxbcXiIaZ+1YBG9kAo80rzq/oPn52+VXFzTDdnuLvxcmzeeCvz2pnGnmb/uSqWJUM2h5Gqb+fAdx66qsqouG7yv8awjvB6QXSsODzWye7mH1FJm3s9l94rDhwJAZMZteDYmH3MHHtJyW4GFvW869LApwevGdI8r8KEAMBlYpIdNKecZF72uwYcD+MS5EXfuYZe0YA3R5yq8ucuY13phmGsQk9cX6mGXAu/n4nHgthDyPhy9+iMXF+phk4afO6gOuw5vCiFqXX1ATEZDDwFYVVre+nFsEHfXHlWbtuiLL1gulZ+Lp0GalIcQFREoj4feExlgx38aj2//koFnXAymCx4UFtXeGVPjzwBQeYMZhPkmNmxum8Wad4nw8lmQTiFEu2Nqnj9sh5mDmfeW9Z3vOee8IY+CdAs67f+x1x1rfaqsqlvV7j8Tur9MVNP7uRwCmZDHvJuPn3VERcW2fvGA/r46MPpt4kbE2i7lMMikMKa3IkSfND8saBqt6DhyZQ3j8u/FwHUuZ1wtD5YrNhbckxhaTDIuOTOC2/ePXLoRZKMYF4PRhSl+YYZ8Sx8TLV0npj3gv6CeQLBAN6RfN2TlyIiKVqQ5/c/1LyBlAjuoYKbRAAAAAElFTkSuQmCC"></img>
                        </button>
                        
                        <button>
                            <img className='w-[40px] h-[40px]' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEM0lEQVR4nO2YXWhcRRTHR6ziS9BSs3PmbnZn0qjR1BY/1szsZndO0goWBQtCkT5qUVukNL7YB9GHWhQV/AAfJI+xoG190DdfihIsxYqFCvogWqRioiiKIaAm6Y7M5n7Mxrtt2Du7STAHDix3Dnf+v5255z/3ErIRG7ERXoNzvAlAv0ABzwPTczYp4JcA+PzmzfffSNZyMDY6Agx/AYYmPfXPtoasxaAU7wSGs63Fx/knQHWIrLWggFOOyGka1B7dsqXSYzPHcB8wPeOsxCdkLQWlY9sicRT03wD6jrQaCvhPDJFSs2oBUHvKEfZeyzqGJ6I6xvCJDgrSLwHTCyvYz11KvWA1rRyg0f5WWzQuh5j7/6xAq+6SC0Z3kfUWlOnJuMOw2n6y3oIyfTQB0EfJegvKavsdgMnouuHycyOU6VKebRvA7vvEpHDKAZjtGgCXs20D9PaODTgAlxyAr7oHoC60DUDIvdcB04thO1scGhq6fglAfdQJseP5qhEMzURhxAX4MANAo5VeilbBrkgI8KZv8TNCxb1fBtoZk29kBfiPFxiuxt3J60KZDwojjayniLvauBHKnC2WY4CH8jUX4LB3LzBieI87+anCSDz5M/maueyM2d/2WjRua9MAThQqcc3BZoCHvXuB6Zc7WgG4EMvFXwngtUI1rnm5r5qMbVXbvXuBGaz0uJOnCR3P1xqZBpYGcKgvqT3uQg5WejIBtPQCoX5bvs+f7Uv+xeVpO0wr8UYos8eBneKVqAP9SrJGay9QX6Q9rGkQh68i3ghl7g50XP8DL4cA8lxmgGYvwMuOF5zyBTAvlAnC2jxDM88jD5AnPQC08gL5qq8t9D1PWmjJ9QAuX/EFEHsBpbWdIcBBXw/xp8WkhT7itlCuDvgBYHgsnGC+tw9vWQJQu3210UnHA+xKJWPlB7wAEIKbAHBvEOBd0RUjKoO+jOyYs/Vedz2g/77bSKfCcLzBCFX3cZR40vEAWxNer9s5OgbQgBBq+kqtcaW5O5+00HORBwj5k1extn0CjKL9Ap0AyDM+ALYFyTMyI0IPEPIzrwDA8GRjEsBvCdl7bQhwPKv4OZ4co4sMk+eHq3c9A+jvookYw9sbAFy9mBXgG+cYXWnyAOX3IwIwPB23Q9APLgGUH88K8LHjAfuaPEA+5hWAgp5ITqV4qAFQHN6ZFWDCacFH3BbKh8f8AjB9JFkBfCsE6M8K8JzjAW83vQtL4ReA6jHHUadzOb3dENxkuFxoV/zXvGx2OKfQM8XoGC0X7L29AtjO4x7qfGcp0GYxgbtIOhG5HCoK+i/f4gVDc74Y9f9Gniadipvz+lYAfJ+C/jGr8HsCbQ7kq+Zi9AKT7P93SLfCFMu7ojORp6zb7tY1gCWI4aeNkH9kFy9/t+8ZXRUfQxByjRkoFUyxtLWtHCgV7D1WRfxqxb8N36zU9SH0zAAAAABJRU5ErkJggg=="></img>
                        </button>
                        
                        <button>
                            <img className='w-[40px] h-[40px]' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEfElEQVR4nO2ZX2wURRjA1xj0xRcTuZnt0XKUu7ZesZQeIpIyg3e2XBUoUK4edy1H2zvaxH9Vgea4yj9t93wwmhgTQSAKJhoT4wvwSAKBGAilBmJUglKqew/6oDEmgv8+M1s7u0v3bpe7ctsm9yVfbjPzzdz3m/lm5ttZQShJSUpSkpJMv/jmYEwHEaaXEKa3sEghmyJMfkaYnnGIJCIIwj2C3eL1eu/DIvkil9NZYUR62uHwI1sBMKaD+TivQpAxh7OxzjYAhOkl7hAmL7NwymUvivShCWjytwbkN1RG1gp2CNLEPAsnq+0wpkEskl81EP9gTLffXW8NRBsOk2WhT+HeuJQZTEjyWCKdgWwa3nH+T5dnw81CQhDrNgh6C2E6gjFJmUVCTgDF+RyOazW251uoXdo3LQBYq5ieswRhCJDO3LAKwDQ+PA7Lg8NQ5vT/O50QDpHsygvgTpyfqvJP26QMEfIS3xyE6A5NSI3YAJCBeFr+KyHJL+Z/LlG+JmwBKFSxxqf/N5IU21hmJ0Cal6dmN4Akj81ugHSG+1cCSNzlGah6pFMZffY7K2cgtucbaIl9ovzOWIBIchQqa0LgrGiGBVVtULf8BWiOHoXY3qtZ28woAH/ooGH6UO5qAX/oAPQMjc8MAJYnhXdeYNug4Qxky4O8DQnYsvtrewG69n8HVXUxpe9lTfsNbbpfH4No8kslfDyLojqIyupN0PnqV/YAxId/hMUr+nnf7tqIpTaB9vdZVqvOxJI4D6eiAgS3fKyOZtkqeLr7M8ttW/tOQtm8AG+/auO7xQXoGboBLs9G3u/KdW9Nsdm69yosITsVZc+31wfCR3j7ea4W6Np3rXgAa3uP8z5d7vVKnN9u429XdyH2bBROnlp1TazuOFY8gGVN+9TRb33b0IZseIfbsGcjmyc3f8Bt6htfKR7Aww1x3mfb86d0YRMIH4YnQu/Bosee5TbsmZWxOm04RQZGuM2C6rbiAbCTdbLPjtRlXt5ABkzfg5nNpD0LvclyZ3mTPQCdg1fyBugZGld2MFYuOgNgeBdrdLFVKED14q1qCPWf1oWQP3QQGte8CV5fr7rX+3qVMlanC6HkqO5QM5wB5SJJvYvZziAKBXg0sHvKHp7PIm6OHuU2dY/3GwOwuxezaTVTl7sVQi+d5X/MDi0+cjXthomZ32QbZblTTX0Xt2mKfAi5vg2cKxRixVNvqIvvteswf+E61cHQgTs+yIKak5yl3CyxywIwAcFmAonkotkHDiszwDTwzCFez3Kb1r4TlkNwU/8ZcJY3TzlLBKtidqlrNY32+rbpIALhw8oJm7WdJCtvYlrnWYbKstqEJH9vHSCdSRUKwJRNO9s9tLPlqY0qec7mgYtKzsTWRzQ5Cqs7PoKa+m6dbUXlGqVOGRBJNr8n1V+vy7viafl6oRD53l4v9IYVyAkf5GTWm7liiNsdvB+JZABh8ou58+R3jIk0dy59QJhpUlHR+CASV/YgTD7HIrmGMPkDYXITYfIDEulJJNLnbP9oWBIht/wHbV0SaN1X58QAAAAASUVORK5CYII="></img>
                        </button>
                    </div>
                </div>
            </div>

        </section>
        
    </main>
    );
};

export default Notes;