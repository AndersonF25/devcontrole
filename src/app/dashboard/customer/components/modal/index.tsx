import React from "react";

interface ModalConfirmDeleteProps {
  onCancel: () => void;
  onConfirm?: () => void;
}

const ModalConfirmDelete = ({
  onCancel,
  onConfirm,
}: ModalConfirmDeleteProps) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
      onClick={onCancel}
    >
      <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center gap-4">
        <h2 className="text-center text-lg font-bold">
          Se você deletar esse cliente, todos os chamados relacionados a ele
          também serão deletados.
        </h2>
        <span className="text-center">Tem certeza que quer deletar?</span>
        <div className="flex gap-4 mt-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 duration-300"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 duration-300"
            onClick={onConfirm}
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;
