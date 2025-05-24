type Props = {
  show: boolean;
};

export const SuccessModal = ({ show }: Props) =>
  show ? (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow text-center">
        <p className="text-green-600 font-bold">Parabéns tarefa concluída ✅</p>
      </div>
    </div>
  ) : null;
