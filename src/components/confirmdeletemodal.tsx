type Props = {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmDeleteModal = ({ show, onConfirm, onCancel }: Props) =>
  show ? (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow text-center space-y-4">
        <p className="font-bold text-cyan-600">Tem certeza que deseja apagar essa tarefa?</p>
        <div className="flex justify-center gap-4">
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">
            Sim, apagar
          </button>
          <button onClick={onCancel} className="px-4 py-2 bg-cyan-400 text-white rounded">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  ) : null;
