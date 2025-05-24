import { useEffect, useState } from "react";
import { NotebookPenIcon, Trash } from "lucide-react";

import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { SplashScreen } from "./components/splhasscree";
import { SuccessModal } from "./components/successmodal";
import { ConfirmDeleteModal } from "./components/confirmdeletemodal";
import { DeletedModal } from "./components/deletemodal";
import { Clock } from "./components/clock";

import type { TaskProp } from "./types/allprops";

export const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<TaskProp[]>([]);
  const [error, setError] = useState("");

  const [splash, setSplash] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  // Splash timeout
  useEffect(() => {
    const timer = setTimeout(() => setSplash(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Load tasks
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const saveTasks = (updated: TaskProp[]) => {
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const addTask = () => {
    if (!task.trim()) {
      setError("Por favor, digite uma tarefa.");
      return;
    }

    const newTask = {
      text: task,
      done: false,
      date: new Date().toISOString(),
    };

    const updated = [...tasks, newTask];
    setTasks(updated);
    saveTasks(updated);
    setTask("");
    setError("");
  };

  const toggleDone = (index: number) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
    saveTasks(updated);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 2000);
  };

  const confirmDelete = () => {
    if (taskToDelete !== null) {
      const updated = tasks.filter((_, i) => i !== taskToDelete);
      setTasks(updated);
      saveTasks(updated);
      setShowConfirmModal(false);
      setShowDeletedModal(true);
      setTimeout(() => setShowDeletedModal(false), 2000);
      setTaskToDelete(null);
    }
  };

  const askDelete = (index: number) => {
    setTaskToDelete(index);
    setShowConfirmModal(true);
  };

  return (
    <div className="h-screen bg-slate-200 flex flex-col gap-4">
      <Header name="Task Maneger" tasks="Organize as suas tarefas🚀" />
      {splash && <SplashScreen />}
      {!splash && (
        <main className="flex-1 p-4 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            <h1 className="text-3xl md:text-5xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-l from-cyan-900 via-cyan-500 to-cyan-800 text-center animate-fade-in-up transition-all">
              Bem-vindo ao <br className="md:hidden" /> Task Manager
            </h1>
            <img
              src="./img/gear.png"
              alt=""
              className="animate-spin-slow w-24 h-24 md:w-40 md:h-40"
            />
          </div>
          <br />
          < Clock />
          <section className="mt-8 max-w-2xl mx-auto">
            <p className="text-cyan-900 text-2xl lg:text-4xl font-bold mb-2 flex items-center gap-2 animate-fade-in-up transition-all">
              O que farás hoje? <NotebookPenIcon />
            </p>
            <br />
            <div className="flex gap-2">
              <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Nova tarefa"
                className="w-[50rem] border p-2 rounded-xl text-gray-800 outline-none"
              />
              <button
                onClick={addTask}
                className="bg-gradient-to-br from-blue-800 to-cyan-900 px-4 rounded-xl text-white font-bold"
              >
                +
              </button>
            </div>

            {error && <p className="text-red-500 mt-1">{error}</p>}

            <ul className="mt-6 grid grid-cols-1 gap-3">
              {tasks.map((t, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-gradient-to-l from-blue-900 to-cyan-700 p-3 rounded-xl shadow-2xl font-bold animate-fade-in-up transition-all"
                >
                  <span className="font-medium flex justify-between">
                    {t.text} -{" "}
                    <small className="text-sm text-cyan-200 block mt-1 ml-1">
                      ({new Date(t.date).toLocaleDateString()})
                    </small>
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleDone(i)}
                      className={`px-2 py-1 rounded text-white font-bold ${
                        t.done ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {t.done ? "✓" : "×"}
                    </button>
                    <button
                      onClick={() => askDelete(i)}
                      className="text-blue-700 hover:text-red-500"
                    >
                      <Trash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </main>
      )}

      {/* Modais */}
      <SuccessModal show={showSuccessModal} />
      <ConfirmDeleteModal
        show={showConfirmModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirmModal(false)}
      />
      <DeletedModal show={showDeletedModal} />

      <Footer date={new Date()} name="Luco Vilanculos" />
    </div>
  );
};
