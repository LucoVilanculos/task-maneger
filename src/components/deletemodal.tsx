type Props = {
  show: boolean;
};

export const DeletedModal = ({ show }: Props) =>
  show ? (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white px-6 py-4 rounded shadow text-center">
        <p className="text-cyan-800 font-bold">Tarefa apagada com sucesso 🗑️</p>
      </div>
    </div>
  ) : null;
