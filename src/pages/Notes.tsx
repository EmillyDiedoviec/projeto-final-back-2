import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect, useState } from 'react';
import NoteType from '../types/NoteType';
import { useNavigate } from 'react-router-dom';
import { getNotesAsyncThunk, logout, noteArchiveAsyncThunk, noteDeleteAsyncThunk } from '../store/modules/UserLogged';
import ModalAdd from '../components/modalAdd';
import { Dialog } from '@headlessui/react';
import ModalDelete from '../components/modalDelete';
import ModalEdit from '../components/modalEdit';

const Notes: React.FC = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [noteEdit, setNoteEdit] = useState<NoteType>({} as NoteType);
    const [thisNote, setThisNote] = useState<NoteType>({} as NoteType);
    const listNotes = useAppSelector(state => state.userLogged.userLogged.notes);
    const email = useAppSelector(state => state.userLogged.userLogged.email);
    const archivedNotes = listNotes.filter(item => item.archived);
    const [showArchived, setShowArchived] = useState(false);
    const [filterTask, setFilterTask] = useState('');
    const user = useAppSelector(state => state.userLogged.userLogged);
    const [filter, setFilter] = useState(false)


    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.email) {
            navigate('/');
        }
    }, []);

    const handleClose = () => {
        setOpenAdd(false);
    };
    const addNotes = () => {
        setOpenAdd(false);
    };
    const openModalAdd = () => {
        setOpenAdd(true);
    };

    const handleDelete = (item: NoteType) => {
        console.log("aaaa");
    
        setThisNote(item);
        setDeleteConfirm(true);
      };

      const handleDeleteCancel = () => {
        setDeleteConfirm(false);
      };
    
      const handleDeleteConfirm = () => {
        const deleteTask = {
          id: thisNote?.id,
          email
        };
    
        dispatch(noteDeleteAsyncThunk(deleteTask));

        setTimeout(() => {
          dispatch(getNotesAsyncThunk(deleteTask.email));
        }, 500);
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

    const handleFilter = () => {
        setFilter(!filter);
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

    const handleLogout = () => {
        dispatch(logout());
        navigate("/")
    };

    return (
        <main className='w-[100vw] h-[100vh] flex'>
            <ModalAdd openModal={openAdd} actionConfirm={addNotes} actionCancel={handleClose} />

        <section className='w-[1495px] h-[1495px] bg-[#6588E6] fixed rounded-full bottom-[-1100px] right-[-112px]' >
        </section>
        

        <section className='h-[100%] w-[18%] bg-[#22264C] fixed flex-col flex gap-16 z-30'>
            <div className='w-[100%] mt-7 flex items-center flex-col'>
                <div className='self-end absolute mt-4'>

                    <button className='mr-4' onClick={handleFilter}>
                        <img className='w-[43px]' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAE5ElEQVR4nO2d22scVRzHj1LRB1/UB2n/A1EEwQsVBH30ir5IUfomgg8+Bt1pTGwbbBH1QdQ+CCJUxVZ9UkQ0s5trEzCWYhs1ETRtKm2ybS0x6ebaj5xuN026O7eds3N2Zn4fOJCHnZnM53vOb86Z2UyUEgRBEARBEARBEASTADcCjwCdwAfAHuBJ4BajBxLqAbYDx2jMNPB8g80EEwA7gEWC2WvkgMI1dM8GVgjPuxs2F+IAvACsEp23Yx1YUM30fBkJCfb8f4EOYFJGQvI9/yLw4NXP3gmMy0iwIL+GhGBRfg0JIZma/0DAPrYCvweUo/1xf9fMgQH5G/a1FdYmAkJ4qfVnlUP5GkqFexje9w8LswSUsjtU3iFGzW+4v77Ou3CdMxQdGHoL5mf8QnhV5RlM9/yN8mttaB8slL32/43KKyQhv9aOfeJ1jCGVRzAtv7dwL26h3FB+Xxec91goVy78ovIGpmu+r/w3oOwzI/3rpzVKhR0qL5B0zz/nMxNdW4WRd/RnV3MRAknKL+2Cc3/4HAqY6tu4TbZDoCXyndmG8nUbP+wvX4dT6ty8jess0+s8p7IGScvXbfqIj/yJanlqtJ1bqOB23q2yAjbk6zb5XXT510L4WGUBbMnXrf9NmD+7+Wh6NhQkv1qK0r82wKb8jSFMfgunR2H8UH3N9x4BX6o0Q0vm+R7ytVQtV0vWsrX0KCHV9/7L9BYeU2klUfl9XfWLLF124oTgFjpVWkl2hdvlvcjSF+DmAuhWaaVt5Gv0FFTkW5Kv0Ysw6fmW5F9Z4e6SspP4XU2NvuUcZp4vNb8ekZ/W+/k57PmPh1jh3h96fyI/kvzbgQsi3xJAdzLyu0LMdibyU3ZqAEdbLr/owKkhke8RwH8eZrYbk190YPmS9HyPAOY8zDxsTH7RaADpLzumShBh5ZsrQdmSH+ciTBT5Zi7C2ZOvAW7Ty54oIRBVfvwFWDblN7MQo1n5zYeQbfmRbkWUx5+N/Aw3Tgj9u3tUnggMYWVpmbGP4smPEgL8kLsXdQSHUIGxAxKChJBxZCS0ARJCGyAhtAESQhuAzI5S8OXclQqMvidTVKshnDlqJgBZrDUZwsUpcwFICE2EcGrYbAASQuBti0vr8leXf2OgZ8Z4AGGfJ8D3wE0qTwDbgJ3AE8AW31cLJBPCAZV3sBvCZeAhlXeohdC/G058UW3652RC+NT2+bcFnB55hsW5tXUtS3Pw84dJhPC37XNvC4CBhos1UyEM7vUKoGL73NsCoNJQj6kQvL7qsrRQodS9ReUd4IRnlY4bwsn6wbVOeRyKhcO5DwF4KvDeUTMh+MnX/Hqw+jnX+Yqxl/O1Lrge4EWjIQTJP//n5s+7ha8lBAyFECRfv85ysKd+Oz0SUDeoPEOo5wk+X3mZKgXIL8Pwfu/t3dd3qrxDsyHElV9th2yffzpDmDIiX5ehUdvnnq5rwvHPYXokQP5s9QWuYS7ernPQ9nln61+YLITs+dW2SN9r99k+5/SNBD/54Xt+Nl/aZ20kROn5Ij/S483lYPmRar70/CgAj+rXrnrKnzkOA3tEfisBbr76ePMzYJDVxUGmj8xH+psE6fkWH2+KfIshiHyLIYj8ZLjyT3yKzsnr5M/R6zyd0K8gUOq+FbfwCkXnfVyngx87tokVQRAEQbWY/wGuwiuWtlwqhQAAAABJRU5ErkJggg=="></img>
                    </button>
                </div>

                <img className='rounded-[100px] w-24' src="./assets/images/Rectangle.png" alt="" />
                <p className='text-white font-zcool text-[28px] '>Bem vindo(a)</p>
                <p className='text-white font-zcool text-[20px]'>{email}</p>

            </div>
                
            <div className='flex items-center flex-col'>
                <button onClick={openModalAdd}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="70" height="70" viewBox="0,0,256,256">
                        <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="none" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" ><g transform="scale(5.33333,5.33333)"><circle cx="28" cy="28" r="18.5" fill="#f46675" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter"></circle><path d="M35.4,38.8c-3.2,2.4 -7.1,3.9 -11.4,3.9c-10.3,0 -18.7,-8.4 -18.7,-18.7c0,-2.6 0.6,-5.2 1.5,-7.4" fill="none" stroke="#18193f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12.1,9.6c3.2,-2.6 7.4,-4.3 11.9,-4.3c10.3,0 18.7,8.4 18.7,18.7c0,2.3 -0.4,4.5 -1.2,6.6" fill="none" stroke="#18193f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path><path d="M24,14v20" fill="none" stroke="#18193f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path><path d="M34,24h-20" fill="none" stroke="#18193f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path></g></g>
                    </svg>
                </button>

                <button onClick={handleShowArchivedChange} >
                    {showArchived === false ? (
                        <>
                        <img className='w-[70px]' src="data:image/png;base64,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"></img>
                        </>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="70" height="70" viewBox="0,0,256,256">
                            <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="none" stroke-linecap="none" stroke-linejoin="none" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(5.33333,5.33333)"><path d="M45.1,24.5h-3.1v-3.9c0,-1.6 -1.3,-2.9 -2.9,-2.9h-14.7l-4.8,-4c-0.7,-0.6 -1.6,-0.9 -2.5,-0.9h-6.4c-1.6,0 -2.9,1.3 -2.9,2.9v24.4c0,0.2 0,0.3 0,0.5c-0.2,1.2 0.7,2.4 2,2.4h29.2c0.1,0 0.2,0 0.3,0v0c0.8,-0.1 1.4,-0.5 1.9,-1.1l0.1,-0.1l0.1,-0.1c0.1,-0.2 0.3,-0.4 0.4,-0.7l5.2,-13.7c0.6,-1.4 -0.4,-2.8 -1.9,-2.8z" fill="#ffbe7a" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter"></path><path d="M3.5,18.7v5.6v12.2c0,1.7 1.3,3 3,3h29" fill="none" stroke="#18193f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M38.5,16.5c0,-1.7 -1.3,-3 -3,-3h-15l-4.9,-4.1c-0.7,-0.6 -1.6,-0.9 -2.6,-0.9h-6.5c-1.7,0 -3,1.3 -3,3v1.5" fill="none" stroke="#18193f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.4,39.5h20.9c1.3,0 2.5,-0.8 3,-2.1l5.3,-13.1c0.5,-1.4 -0.5,-2.9 -2,-2.9h-26.7c-1.3,0 -2.5,0.8 -3,2.1l-0.7,2" fill="none" stroke="#18193f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></g></g>
                        </svg>
                    )}
                </button>
            </div>

            <div className='flex items-center flex-col mt-20 ml-2'>
                <button onClick={() => handleLogout()}>
                <img className='w-[85px] h-[85px]' src="data:image/png;base64,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"></img>

                </button>
            </div>

        </section>

        <section className=' w-[85%] h-[100%] ml-[17%] flex flex-col items-center justify-center z-40'>
            <Dialog className='w-[40%] h-[15%] bg-[#22264C] rounded-r-full flex justify-center items-center z-50 absolute top-[2%] left-[18%]' open={filter} onClose={handleFilter}>

                <input
                className='w-[75%] h-[55%] bg-[#FFFAEE] rounded-full indent-7 border-[#6588E6] border-8 border-double' 
                value={filterTask}
                onChange={e => setFilterTask(e.target.value)}>
                </input>

                <button>
                    <img className='w-[60px]' src="data:image/png;base64,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"/>          
                </button>
            </Dialog>

            


{/*             <div className='w-[100%] h-[75%] mt-12 flex flex-wrap justify-center'>
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
            </div> */}

            <h1 className='font-zcool text-[40px] mt-14'>MEUS RECADOS</h1>

            <div className='w-[100%] h-[75%] mt-10 flex flex-wrap justify-center'>
            {showArchived
                ? archivedNotes.filter(note => {
                    if (filterTask) {
                        return note.title.includes(filterTask);
                    }
                    return true;
                }).map(note => (
                    <>
                        <div className=" w-[300px] h-[175px] p-3 m-4 rounded-lg shadow bg-[#f46675] flex items-center flex-col pt-7" key={note?.id}>
                        <h5 className="w-[100%] h-[100%] mb-2 text-2xl font-bold tracking-tight text-black">{note.title}</h5>
                        <p className="font-normal text-black whitespace-pre-line">{note.description}</p>
                        <div className=' w-[53%] h-[100%] flex felx-row items-end justify-between'>
                            <button
                            onClick={() => handleEdit(note)}
                            >
                                <img className='w-[40px] h-[40px]' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEiUlEQVR4nO2Zf2gcRRTHJwWt/1QkMTczm2qgTSptUoyNSUWamUuultrYUrWN+W2b7FwTk2iF1BhtEkjt7YRSoYLaijaiotCiaP/yDxERA0JVEJoWRK3Gm4k/IviHCAbbkb3c7d1e9pJLLnt34n3h/XE77+DzZt/MvDcLQE455ZRTKiospAghyhEmlyCif4XtK4TokKb5CkA2C0LSgDD5E2GqnAxi+itCZBfIRkFY04MwvZ4IPsZmIfTWg2wSxLQ3Fh5iOmlClpTsXF1QcO+auTdDv48GQX4uLqa3gGwQxPSkbeYRncjPr7453s/jqYMQkx8ifh5MngCZFiwKwUfTA9EJc8bj/fyGJDoX53xN479HfNdtbLj86MjVm7ImbUKpA8kbAIBVlpNSebohTjAulWlNA19Yvus3NipmiMt+Lm7PCviYt/BaKIg5+NMReNMe6f/c8ispaw4907mY7Dv1zerMwSM64UHkVXsQ5Kz+3NRLsfCm1TW8YvlUbOuPHTuUEXiIyGfhnM+DmLwcG0SVb1jpRtCCbBuaVMXr91jjO9vfscZ0Li+4Do8x8S+y2yQMon34iiotb7Wer7tjn+o8/mM0AENczDR8eMEGT2/dccy2JirpoCotb7F+a2t96qHej2ypxQz5YSbSJg5+bsHqRlBV+0YcT2GtqE7Vd7xrhw/9Z/pI2mZ+IXhmAQVVJX3GBo+1WrXrwDkHePlb58mp/KyBZ1yGcz6aNqaRB19wgBez/oDYkUn4F53hW6PwRV5F9p6aB88M8Q/jwcYVh/dg2pRkzs+D1wNTNvhEOW/C6wHRBNwQQuTt5cCb1jzwZVLwfi6agVuC0LsVIfo1xOT8UuDDcKr6vlFVWtaidrMPHOE7DdkKMqIE8AdHv1N3kafUhs1tat/hT50DcxMeY7oXYvK8ptXcthz4TVuY7dBiCeDZmGxbcXiIaZ+1YBG9kAo80rzq/oPn52+VXFzTDdnuLvxcmzeeCvz2pnGnmb/uSqWJUM2h5Gqb+fAdx66qsqouG7yv8awjvB6QXSsODzWye7mH1FJm3s9l94rDhwJAZMZteDYmH3MHHtJyW4GFvW869LApwevGdI8r8KEAMBlYpIdNKecZF72uwYcD+MS5EXfuYZe0YA3R5yq8ucuY13phmGsQk9cX6mGXAu/n4nHgthDyPhy9+iMXF+phk4afO6gOuw5vCiFqXX1ATEZDDwFYVVre+nFsEHfXHlWbtuiLL1gulZ+Lp0GalIcQFREoj4feExlgx38aj2//koFnXAymCx4UFtXeGVPjzwBQeYMZhPkmNmxum8Wad4nw8lmQTiFEu2Nqnj9sh5mDmfeW9Z3vOee8IY+CdAs67f+x1x1rfaqsqlvV7j8Tur9MVNP7uRwCmZDHvJuPn3VERcW2fvGA/r46MPpt4kbE2i7lMMikMKa3IkSfND8saBqt6DhyZQ3j8u/FwHUuZ1wtD5YrNhbckxhaTDIuOTOC2/ePXLoRZKMYF4PRhSl+YYZ8Sx8TLV0npj3gv6CeQLBAN6RfN2TlyIiKVqQ5/c/1LyBlAjuoYKbRAAAAAElFTkSuQmCC"></img>
                            </button>
                            
                            <button 
                            onClick={() => handleDelete(note)}
                            >
                                <img className='w-[40px] h-[40px]' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEM0lEQVR4nO2YXWhcRRTHR6ziS9BSs3PmbnZn0qjR1BY/1szsZndO0goWBQtCkT5qUVukNL7YB9GHWhQV/AAfJI+xoG190DdfihIsxYqFCvogWqRioiiKIaAm6Y7M5n7Mxrtt2Du7STAHDix3Dnf+v5255z/3ErIRG7ERXoNzvAlAv0ABzwPTczYp4JcA+PzmzfffSNZyMDY6Agx/AYYmPfXPtoasxaAU7wSGs63Fx/knQHWIrLWggFOOyGka1B7dsqXSYzPHcB8wPeOsxCdkLQWlY9sicRT03wD6jrQaCvhPDJFSs2oBUHvKEfZeyzqGJ6I6xvCJDgrSLwHTCyvYz11KvWA1rRyg0f5WWzQuh5j7/6xAq+6SC0Z3kfUWlOnJuMOw2n6y3oIyfTQB0EfJegvKavsdgMnouuHycyOU6VKebRvA7vvEpHDKAZjtGgCXs20D9PaODTgAlxyAr7oHoC60DUDIvdcB04thO1scGhq6fglAfdQJseP5qhEMzURhxAX4MANAo5VeilbBrkgI8KZv8TNCxb1fBtoZk29kBfiPFxiuxt3J60KZDwojjayniLvauBHKnC2WY4CH8jUX4LB3LzBieI87+anCSDz5M/maueyM2d/2WjRua9MAThQqcc3BZoCHvXuB6Zc7WgG4EMvFXwngtUI1rnm5r5qMbVXbvXuBGaz0uJOnCR3P1xqZBpYGcKgvqT3uQg5WejIBtPQCoX5bvs+f7Uv+xeVpO0wr8UYos8eBneKVqAP9SrJGay9QX6Q9rGkQh68i3ghl7g50XP8DL4cA8lxmgGYvwMuOF5zyBTAvlAnC2jxDM88jD5AnPQC08gL5qq8t9D1PWmjJ9QAuX/EFEHsBpbWdIcBBXw/xp8WkhT7itlCuDvgBYHgsnGC+tw9vWQJQu3210UnHA+xKJWPlB7wAEIKbAHBvEOBd0RUjKoO+jOyYs/Vedz2g/77bSKfCcLzBCFX3cZR40vEAWxNer9s5OgbQgBBq+kqtcaW5O5+00HORBwj5k1extn0CjKL9Ap0AyDM+ALYFyTMyI0IPEPIzrwDA8GRjEsBvCdl7bQhwPKv4OZ4co4sMk+eHq3c9A+jvookYw9sbAFy9mBXgG+cYXWnyAOX3IwIwPB23Q9APLgGUH88K8LHjAfuaPEA+5hWAgp5ITqV4qAFQHN6ZFWDCacFH3BbKh8f8AjB9JFkBfCsE6M8K8JzjAW83vQtL4ReA6jHHUadzOb3dENxkuFxoV/zXvGx2OKfQM8XoGC0X7L29AtjO4x7qfGcp0GYxgbtIOhG5HCoK+i/f4gVDc74Y9f9Gniadipvz+lYAfJ+C/jGr8HsCbQ7kq+Zi9AKT7P93SLfCFMu7ojORp6zb7tY1gCWI4aeNkH9kFy9/t+8ZXRUfQxByjRkoFUyxtLWtHCgV7D1WRfxqxb8N36zU9SH0zAAAAABJRU5ErkJggg=="></img>
                            </button>
                            
                            <button 
                            onClick={() => noteArchived(note.id)}
                            >
                                {note.archived ? (
                                    <>
                                        <img className='w-[40px] h-[40px]' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD8klEQVR4nO2ZTYgTSxCAR0SvsrCkqyeZ9KCCjz2IopKZzKQLxIOggsLzHR54UE+efLznE9zdo4gePYirN48q3jyKoCAedEUQ/EHR9eBBRVDXv1XXkppNsp24SSbJ7MRACoqeTP+kvumqmkrHsgYykIEMZCDJy4ZlADguAO8IwBmQSI1UgH4tAK9npP7bsqwlVq9lZGRkOUh9s5nRDWEkXstkNoueAgDgeCfGz0PoqUw2XNszAAF4p2oQ6H/ZnZqNlxKH56D1dwPkvbD1DqsXIgyfZ3eKOw8At4LUbw2IWQA8tLjWLiCmO1TukbV7KbmFcVKFKXI9aqQP8/7X9VJ/6cYFoSZB4IwAnATQY608oTkAG9/EcFPfKJ92ZnUiAGAq4I1YEAsCqMLzuACsX12PjuRCytn4I0mIjNSjHe5AfON/UVV4Ra6vrY5kwzIh8H/DpSZjBzG3iQDMQXwjt3Cw8/cSVmOi5QQAfUyA/sxtYgBdKhheESUSVRjjxBL7KfxWAG51V8f6HWCqvwFcj/oGYF3Z+HX9CnA3X6TxXBi1fQlADXRBYwFwIwCe5HaxAd65Hp13irQ3W6LQ1rTKxkj5mu9dcIr0TvltA7wo1x4vFgtgxvXoVC6gNTHKhz8k0mkniMqTeABJlxIJFXvbbU0v63YjdQA2YKNda7y2NZ1xAnqoivTR9SN9kPdpwgkiVzLHbrI1vTIgUgVgt9mWLVXXdmyks05A35vM+aa8CCRn2LTD1lV3ShWAfd40/mpdSqQmeiVfrIHgmEgVgLONGbD85NtdY8IJagKbs1NqAJwqTZ833eZWOahPOAHNul6kfM33uM90JzMmLjpBegCc0ytrcsCafX8aff9kS5FWPnOfOZZdp9K3PxumB1A0nhxnG7PvuGFUvXKfOfZ+3q/28W6kBsBv18qaH1Rt3w/Xo8O58BfjD2bDyJ3MsdNqvjJdbWN6APxllTWnuwAg16NCeTe5jX2w1S1AkJALkevRU+VHscBtI4DJ6iKAhxiiW4B9RmBOdBHEVKcLAvDZS7t1Sju6SiJ9Ue2nUYoLUP5v4MZiQhzNhV3tKDUHmIPgnRBS3271B0cnymUBlwcU09B7yqe/sqXoV9lsPIBaaXWoG0e5AONCzISYcILoDdtoDmeoS/kirZTz827mq271tB2AsSS2nEthLonN3QhtHWUVLqH5HcHl9GPl0zknqKleo6xoa3pdAVbeaHwAPl5X3ii53rMkftDsqjMMYqhva3oyF9TPSHlH2jqZS1qi807Q/wnAN60MF4CfAPD40NCWFdbvJkNDW1YA4B4h8ZKQeB+kngapPwjARyD1ZQA8MDxckr22cyBWE/kJiM5Q3r8PNEkAAAAASUVORK5CYII=" ></img>
                                    </>
                                ) : (
                                    <>
                                        <img className='w-[40px] h-[40px]' src="data:image/png;base64,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"></img>
                                    </>
                                )}
                            </button>
                        </div>
                        </div>
                    </>
                ))
                :listNotes.filter(note => {
                    if (filterTask) {
                        return note.title.includes(filterTask);
                    }
                    return true;
                }).map(note => (
                    <>
                        <div className=" w-[300px] h-[175px] p-3 m-4 rounded-lg shadow bg-[#f46675] flex items-center flex-col pt-7" key={note?.id}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">{note.title}</h5>
                        <p className="font-normal text-black">{note.description}</p>
                        <div className=' w-[53%] h-[100%] flex felx-row items-end justify-between'>
                            <button
                            onClick={() => handleEdit(note)}
                            >
                                <img className='w-[40px] h-[40px]' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEiUlEQVR4nO2Zf2gcRRTHJwWt/1QkMTczm2qgTSptUoyNSUWamUuultrYUrWN+W2b7FwTk2iF1BhtEkjt7YRSoYLaijaiotCiaP/yDxERA0JVEJoWRK3Gm4k/IviHCAbbkb3c7d1e9pJLLnt34n3h/XE77+DzZt/MvDcLQE455ZRTKiospAghyhEmlyCif4XtK4TokKb5CkA2C0LSgDD5E2GqnAxi+itCZBfIRkFY04MwvZ4IPsZmIfTWg2wSxLQ3Fh5iOmlClpTsXF1QcO+auTdDv48GQX4uLqa3gGwQxPSkbeYRncjPr7453s/jqYMQkx8ifh5MngCZFiwKwUfTA9EJc8bj/fyGJDoX53xN479HfNdtbLj86MjVm7ImbUKpA8kbAIBVlpNSebohTjAulWlNA19Yvus3NipmiMt+Lm7PCviYt/BaKIg5+NMReNMe6f/c8ispaw4907mY7Dv1zerMwSM64UHkVXsQ5Kz+3NRLsfCm1TW8YvlUbOuPHTuUEXiIyGfhnM+DmLwcG0SVb1jpRtCCbBuaVMXr91jjO9vfscZ0Li+4Do8x8S+y2yQMon34iiotb7Wer7tjn+o8/mM0AENczDR8eMEGT2/dccy2JirpoCotb7F+a2t96qHej2ypxQz5YSbSJg5+bsHqRlBV+0YcT2GtqE7Vd7xrhw/9Z/pI2mZ+IXhmAQVVJX3GBo+1WrXrwDkHePlb58mp/KyBZ1yGcz6aNqaRB19wgBez/oDYkUn4F53hW6PwRV5F9p6aB88M8Q/jwcYVh/dg2pRkzs+D1wNTNvhEOW/C6wHRBNwQQuTt5cCb1jzwZVLwfi6agVuC0LsVIfo1xOT8UuDDcKr6vlFVWtaidrMPHOE7DdkKMqIE8AdHv1N3kafUhs1tat/hT50DcxMeY7oXYvK8ptXcthz4TVuY7dBiCeDZmGxbcXiIaZ+1YBG9kAo80rzq/oPn52+VXFzTDdnuLvxcmzeeCvz2pnGnmb/uSqWJUM2h5Gqb+fAdx66qsqouG7yv8awjvB6QXSsODzWye7mH1FJm3s9l94rDhwJAZMZteDYmH3MHHtJyW4GFvW869LApwevGdI8r8KEAMBlYpIdNKecZF72uwYcD+MS5EXfuYZe0YA3R5yq8ucuY13phmGsQk9cX6mGXAu/n4nHgthDyPhy9+iMXF+phk4afO6gOuw5vCiFqXX1ATEZDDwFYVVre+nFsEHfXHlWbtuiLL1gulZ+Lp0GalIcQFREoj4feExlgx38aj2//koFnXAymCx4UFtXeGVPjzwBQeYMZhPkmNmxum8Wad4nw8lmQTiFEu2Nqnj9sh5mDmfeW9Z3vOee8IY+CdAs67f+x1x1rfaqsqlvV7j8Tur9MVNP7uRwCmZDHvJuPn3VERcW2fvGA/r46MPpt4kbE2i7lMMikMKa3IkSfND8saBqt6DhyZQ3j8u/FwHUuZ1wtD5YrNhbckxhaTDIuOTOC2/ePXLoRZKMYF4PRhSl+YYZ8Sx8TLV0npj3gv6CeQLBAN6RfN2TlyIiKVqQ5/c/1LyBlAjuoYKbRAAAAAElFTkSuQmCC"></img>
                            </button>
                            
                            <button 
                            onClick={() => handleDelete(note)}
                            >
                                <img className='w-[40px] h-[40px]' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEM0lEQVR4nO2YXWhcRRTHR6ziS9BSs3PmbnZn0qjR1BY/1szsZndO0goWBQtCkT5qUVukNL7YB9GHWhQV/AAfJI+xoG190DdfihIsxYqFCvogWqRioiiKIaAm6Y7M5n7Mxrtt2Du7STAHDix3Dnf+v5255z/3ErIRG7ERXoNzvAlAv0ABzwPTczYp4JcA+PzmzfffSNZyMDY6Agx/AYYmPfXPtoasxaAU7wSGs63Fx/knQHWIrLWggFOOyGka1B7dsqXSYzPHcB8wPeOsxCdkLQWlY9sicRT03wD6jrQaCvhPDJFSs2oBUHvKEfZeyzqGJ6I6xvCJDgrSLwHTCyvYz11KvWA1rRyg0f5WWzQuh5j7/6xAq+6SC0Z3kfUWlOnJuMOw2n6y3oIyfTQB0EfJegvKavsdgMnouuHycyOU6VKebRvA7vvEpHDKAZjtGgCXs20D9PaODTgAlxyAr7oHoC60DUDIvdcB04thO1scGhq6fglAfdQJseP5qhEMzURhxAX4MANAo5VeilbBrkgI8KZv8TNCxb1fBtoZk29kBfiPFxiuxt3J60KZDwojjayniLvauBHKnC2WY4CH8jUX4LB3LzBieI87+anCSDz5M/maueyM2d/2WjRua9MAThQqcc3BZoCHvXuB6Zc7WgG4EMvFXwngtUI1rnm5r5qMbVXbvXuBGaz0uJOnCR3P1xqZBpYGcKgvqT3uQg5WejIBtPQCoX5bvs+f7Uv+xeVpO0wr8UYos8eBneKVqAP9SrJGay9QX6Q9rGkQh68i3ghl7g50XP8DL4cA8lxmgGYvwMuOF5zyBTAvlAnC2jxDM88jD5AnPQC08gL5qq8t9D1PWmjJ9QAuX/EFEHsBpbWdIcBBXw/xp8WkhT7itlCuDvgBYHgsnGC+tw9vWQJQu3210UnHA+xKJWPlB7wAEIKbAHBvEOBd0RUjKoO+jOyYs/Vedz2g/77bSKfCcLzBCFX3cZR40vEAWxNer9s5OgbQgBBq+kqtcaW5O5+00HORBwj5k1extn0CjKL9Ap0AyDM+ALYFyTMyI0IPEPIzrwDA8GRjEsBvCdl7bQhwPKv4OZ4co4sMk+eHq3c9A+jvookYw9sbAFy9mBXgG+cYXWnyAOX3IwIwPB23Q9APLgGUH88K8LHjAfuaPEA+5hWAgp5ITqV4qAFQHN6ZFWDCacFH3BbKh8f8AjB9JFkBfCsE6M8K8JzjAW83vQtL4ReA6jHHUadzOb3dENxkuFxoV/zXvGx2OKfQM8XoGC0X7L29AtjO4x7qfGcp0GYxgbtIOhG5HCoK+i/f4gVDc74Y9f9Gniadipvz+lYAfJ+C/jGr8HsCbQ7kq+Zi9AKT7P93SLfCFMu7ojORp6zb7tY1gCWI4aeNkH9kFy9/t+8ZXRUfQxByjRkoFUyxtLWtHCgV7D1WRfxqxb8N36zU9SH0zAAAAABJRU5ErkJggg=="></img>
                            </button>
                            
                            <button 
                            onClick={() => noteArchived(note.id)}
                            >
                                {note.archived ? (
                                    <>
                                        <img className='w-[40px] h-[40px]' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD8klEQVR4nO2ZTYgTSxCAR0SvsrCkqyeZ9KCCjz2IopKZzKQLxIOggsLzHR54UE+efLznE9zdo4gePYirN48q3jyKoCAedEUQ/EHR9eBBRVDXv1XXkppNsp24SSbJ7MRACoqeTP+kvumqmkrHsgYykIEMZCDJy4ZlADguAO8IwBmQSI1UgH4tAK9npP7bsqwlVq9lZGRkOUh9s5nRDWEkXstkNoueAgDgeCfGz0PoqUw2XNszAAF4p2oQ6H/ZnZqNlxKH56D1dwPkvbD1DqsXIgyfZ3eKOw8At4LUbw2IWQA8tLjWLiCmO1TukbV7KbmFcVKFKXI9aqQP8/7X9VJ/6cYFoSZB4IwAnATQY608oTkAG9/EcFPfKJ92ZnUiAGAq4I1YEAsCqMLzuACsX12PjuRCytn4I0mIjNSjHe5AfON/UVV4Ra6vrY5kwzIh8H/DpSZjBzG3iQDMQXwjt3Cw8/cSVmOi5QQAfUyA/sxtYgBdKhheESUSVRjjxBL7KfxWAG51V8f6HWCqvwFcj/oGYF3Z+HX9CnA3X6TxXBi1fQlADXRBYwFwIwCe5HaxAd65Hp13irQ3W6LQ1rTKxkj5mu9dcIr0TvltA7wo1x4vFgtgxvXoVC6gNTHKhz8k0mkniMqTeABJlxIJFXvbbU0v63YjdQA2YKNda7y2NZ1xAnqoivTR9SN9kPdpwgkiVzLHbrI1vTIgUgVgt9mWLVXXdmyks05A35vM+aa8CCRn2LTD1lV3ShWAfd40/mpdSqQmeiVfrIHgmEgVgLONGbD85NtdY8IJagKbs1NqAJwqTZ833eZWOahPOAHNul6kfM33uM90JzMmLjpBegCc0ytrcsCafX8aff9kS5FWPnOfOZZdp9K3PxumB1A0nhxnG7PvuGFUvXKfOfZ+3q/28W6kBsBv18qaH1Rt3w/Xo8O58BfjD2bDyJ3MsdNqvjJdbWN6APxllTWnuwAg16NCeTe5jX2w1S1AkJALkevRU+VHscBtI4DJ6iKAhxiiW4B9RmBOdBHEVKcLAvDZS7t1Sju6SiJ9Ue2nUYoLUP5v4MZiQhzNhV3tKDUHmIPgnRBS3271B0cnymUBlwcU09B7yqe/sqXoV9lsPIBaaXWoG0e5AONCzISYcILoDdtoDmeoS/kirZTz827mq271tB2AsSS2nEthLonN3QhtHWUVLqH5HcHl9GPl0zknqKleo6xoa3pdAVbeaHwAPl5X3ii53rMkftDsqjMMYqhva3oyF9TPSHlH2jqZS1qi807Q/wnAN60MF4CfAPD40NCWFdbvJkNDW1YA4B4h8ZKQeB+kngapPwjARyD1ZQA8MDxckr22cyBWE/kJiM5Q3r8PNEkAAAAASUVORK5CYII=" />
                                    </>
                                ) : (
                                    <>
                                        <img className='w-[40px] h-[40px]' src="data:image/png;base64,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"></img>
                                    </>
                                )}
                            </button>
                        </div>
                        </div>
                    </>
                ))}
            </div>
        </section>
        <ModalDelete deleteConfirmOpen={deleteConfirm}
            handleDeleteCancel={handleDeleteCancel}
            selectedNote={thisNote}
            handleDeleteConfirm={handleDeleteConfirm} />

        <ModalEdit
            openModal={openModalEdit}
            actionConfirm={addNotesEdit}
            actionCancel={handleCloseEdit}
            task={noteEdit}
        />
                
    </main>
    );
};

export default Notes;