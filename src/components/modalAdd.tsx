import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import NoteType from '../types/NoteType';
import { getNotesAsyncThunk, noteCreateAsyncThunk } from '../store/modules/UserLogged';

interface ModalAddProps {
    openModal: boolean;
    actionConfirm: () => void;
    actionCancel: () => void;
}

const ModalAdd: React.FC<ModalAddProps> = ({ openModal, actionCancel, actionConfirm }) => {
    const dispatch = useAppDispatch();
    const [note, setNote] = useState({} as NoteType);
    const email = useAppSelector(state => state.userLogged.userLogged.email);

    const handleClose = () => {
        setNote({
            id: '',
            title: '',
            description: '',
            archived: false
        });
        actionCancel();
    };

    const handleChange = (ev: { target: { name: string; value: string } }) => {
        setNote(state => ({ ...state, [ev.target.name]: ev.target.value }));
    };


    const handleConfirm = () => {
        setNote({
            id: '',
            title: '',
            description: '',
            archived: false
        });

        const newTask = {
            title: note.title,
            description: note.description,
            email
        };

        dispatch(noteCreateAsyncThunk(newTask));
        dispatch(getNotesAsyncThunk(email));
        actionCancel();
    };

    return (
        <>
        <Dialog open={openModal} onClose={handleClose} className=''>
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-[45%]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-zcool">
                    Novo recado
                  </h3>
                </div>
                
                {/*body*/}
                <div className="relative p-6 flex-auto">
                    <label>Título</label>
                    <input 
                    className="my-1 mb-6 p-2 px-3 text-lg w-full border-black border-2 rounded-xl" 
                    autoFocus
                    value={note.title}
                    id='noteTitle'
                    type='text'
                    name='title'
                    onChange={handleChange}
                    />
                    
                    <label >Descrição</label>
                    <input 
                    className="my-1 text-lg p-2 px-3 w-full border-black border-2 rounded-xl" 
                    value={note.description}
                    id='noteDescription'
                    type='text'
                    name='description'
                    onChange={handleChange}
                    />

                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleConfirm}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </Dialog>
        </>
    );
};

export default ModalAdd;
