import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import NoteType from "../types/NoteType";
import { getNotesAsyncThunk, noteUpdateAsyncThunk } from "../store/modules/UserLogged";

interface ModalEditProps {
  openModal: boolean;
  actionConfirm: () => void;
  actionCancel: () => void;
  task: NoteType;
}
const ModalEdit: React.FC<ModalEditProps> = ({ openModal, actionCancel, actionConfirm, task }) => {
  const dispatch = useAppDispatch();
  const [editedTask, setEditedTask] = React.useState(task);
  const email = useAppSelector((state) => state.userLogged.userLogged.email);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  const handleClose = () => {
    actionCancel();
  };

  const handleConfirm = () => {
    const updateNote = {
      id: editedTask.id,
      email: email,
      title: editedTask.title,
      description: editedTask.description,
    };

    dispatch(noteUpdateAsyncThunk(updateNote));
    setTimeout(() => {
      dispatch(getNotesAsyncThunk(updateNote.email));
    }, 200);
    actionConfirm();
  };

  return (
    <>
      <Dialog open={openModal} onClose={handleClose}>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-[45%]">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-zcool">Atualizar recado</h3>
              </div>

              {/*body*/}
              <div className="relative p-6 flex-auto">
                <label>Título</label>
                <input
                    className="my-1 mb-6 p-2 px-3 text-lg w-full border-black border-2 rounded-xl" 
                    autoFocus
                  value={editedTask.title}
                  id="noteTitle"
                  type="text"
                  name="title"
                  onChange={(e) => setEditedTask((state) => ({ ...state, title: e.target.value }))}
                />

                <label>Descrição</label>
                <input
                    className="my-1 text-lg p-2 px-3 w-full border-black border-2 rounded-xl" 
                    value={editedTask.description}
                  id="noteDescription"
                  type="text"
                  name="description"
                  onChange={(e) =>
                    setEditedTask((state) => ({ ...state, description: e.target.value }))
                  }
                />
              </div>

            {/*footer*/}
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                    onClick={handleConfirm}
                    type="button"
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    >
                    Atualizar
                    </button>
                    <button
                    onClick={handleClose}
                    type="button"
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Cancelar
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

export default ModalEdit;