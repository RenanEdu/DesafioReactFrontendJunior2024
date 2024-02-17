import React from "react";
import InputComponent from "./Input/InputComponent";
import ListComponent from "./List/ListComponent";
import styles from "./Todo.module.css";
import { v4 as uuidv4 } from "uuid";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export enum FilterType {
  all = "all",
  active = "active",
  completed = "completed",
}

function TodoComponent() {
  const [task, setTask] = React.useState("");
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = React.useState<Task[]>(tasks);
  const listLength = React.useMemo(() => tasks.length, [tasks]);

  async function getInitialTasks() {
    const response = await fetch(
      "https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data);
    setTasks(data);
  }

  React.useEffect(() => {
    getInitialTasks();
  }, []);

  React.useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleChange = (value: string) => {
    setTask(value);
  };
  const handleAdd = (value: string) => {
    const task = {
      id: uuidv4(),
      title: value,
      isDone: false,
    };
    setTasks([task, ...tasks]);
    setTask("");
  };
  const handleDelete = (id: string) => {
    const updateTasks = tasks.filter((task) => task.id !== id);
    setTasks(updateTasks);
  };
  const handleComplete = (id: string) => {
    const updateTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isDone: !task.isDone };
      }
      return task;
    });
    setTasks(updateTasks);
  };
  const handleClearCompleted = () => {
    const updateTasks = tasks.filter((task) => !task.isDone);
    setTasks(updateTasks);
  };

  const handleFilterType = (type: FilterType) => {
    if (type === FilterType.all) {
      const filtered = tasks.filter(() => true);
      setFilteredTasks(filtered);
      return;
    }
    if (type === FilterType.active) {
      const filtered = tasks.filter((task) => !task.isDone);
      setFilteredTasks(filtered);
      return;
    }
    if (type === FilterType.completed) {
      const filtered = tasks.filter((task) => task.isDone);
      setFilteredTasks(filtered);
      return;
    }
  };

  return (
    <main className={styles["wrapper"]}>
      <h1 className={styles["title"]}>todos</h1>
      <section className={styles["container"]}>
        <div className={styles["input-container"]}>
          <InputComponent
            initialValue={task}
            onChange={handleChange}
            onSubmit={handleAdd}
            listLength={listLength}
          />
        </div>
        <div className={styles["tasks-container"]}>
          <ListComponent
            tasks={filteredTasks}
            onComplete={handleComplete}
            onDelete={handleDelete}
            onClearCompleted={handleClearCompleted}
          />
        </div>
        <div>
          <button onClick={() => handleFilterType(FilterType.all)}>All</button>
          <button onClick={() => handleFilterType(FilterType.active)}>
            active
          </button>
          <button onClick={() => handleFilterType(FilterType.completed)}>
            completed
          </button>
        </div>
      </section>
    </main>
  );
}

export default TodoComponent;
