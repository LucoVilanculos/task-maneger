import { useEffect, useState } from "react";
import { NotebookPenIcon, Trash } from "lucide-react";


import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { SplashScreen } from "./components/splhasscree";
import type { TaskProp } from "./types/allprops";

export const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<TaskProp[]>([]);
  const [error, setError] = useState(""); // Para validação
  

  // Mostrar splash por 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => setSplash(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Carregar tarefas do localStorage
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
    setError(""); // limpa erro após sucesso
  };

  const toggleDone = (index: number) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
    saveTasks(updated);
  };

  const removeTask = (index: number) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    saveTasks(updated);
  };

  const [splash, setSplash] = useState(true);
useEffect(() => {
  const timer = setTimeout(() => setSplash(false), 5000);
  return () => clearTimeout(timer);
}, []);

  return (

    <div className=" h-screen bg-slate-200 flex flex-col gap-4">
      <Header name="Task Maneger" tasks="Organize as suas tarefas🚀" />
      {splash && <SplashScreen />}
      {!splash && (
        
      <main className="flex-1 p-4 md:p-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-l from-cyan-900 via-cyan-500 to-cyan-800 text-center">
            Bem-vindo ao <br className="md:hidden" /> Task Manager
          </h1>
          <img src="./img/gear.png" alt="" className="animate-spin duration-[4000ms] w-24 h-24 md:w-40 md:h-40" />
        </div>

        <section className="mt-8 max-w-2xl mx-auto">
          <p className="text-cyan-900 text-2xl font-bold mb-2 flex items-center gap-2">
            O que farás hoje? <NotebookPenIcon />
          </p>

          <div className="flex gap-2">
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Nova tarefa"
              className="flex-1 border p-2 rounded-xl text-gray-800 outline-none"
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
                className="flex justify-between items-center bg-gradient-to-br from-blue-800 to-cyan-950 p-2 rounded-xl shadow-2xl font-bold animate-fade-in-up transition-transform duration-500"
              >
                <span className="text-black font-medium">
                  {t.text}{" "}
                  <small className="text-sm text-gray-500 block">
                    ({new Date(t.date).toLocaleDateString()})
                  </small>
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleDone(i)}
                    className={`px-2 py-1 rounded text-white font-bold ${t.done ? "bg-green-600" : "bg-red-600"}`}
                  >
                    {t.done ? "✓" : "×"}
                  </button>
                  <button onClick={() => removeTask(i)} className="text-red-700 transition-transform duration-300 hover:rotate-180">
                    <Trash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      
      )}
      <Footer date={new Date()} name="Luco Vilanculos" />
    </div>
  );
};



