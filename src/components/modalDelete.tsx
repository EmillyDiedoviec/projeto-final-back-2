import React from "react";
import NoteType from "../types/NoteType";

interface ModalDelProps {
  deleteConfirmOpen: boolean;
  handleDeleteCancel: boolean | any;
  selectedNote: NoteType;
  handleDeleteConfirm: boolean | any;
}

const deleteTask: React.FC<ModalDelProps> = ({
  deleteConfirmOpen,
  handleDeleteCancel,
  selectedNote,
  handleDeleteConfirm,
}) => {
  if (!deleteConfirmOpen) return null;

  return (
            <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
          >
            <div className="relative w-[45%]">
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-[35px] font-zcool leading-6 font-medium text-gray-900">Confirmar exclusão</h3>
            <div className="mt-5">
              <p className="text-lg text-black">Tem certeza que deseja excluir o recado?</p>
            </div>
          </div>
          <div className="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleDeleteCancel}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={handleDeleteConfirm}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#f46675] text-base font-medium text-white hover:bg-[#e13f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default deleteTask;