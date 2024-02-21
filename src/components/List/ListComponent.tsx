import React from "react";
import { Task } from "../Todo";
import styles from "./styles.module.css";

type Props = {
    tasks: Task[];
    onComplete: (id: string) => void;
    onDelete: (id: string) => void;
    onClearCompleted: () => void;
};

type TaskProps = {
    task: Task;
    onComplete: (id: string) => void;
    onDelete: (id: string) => void;
};

function TaskComponent(props: TaskProps) {
    const { task, onComplete, onDelete } = props;

    const [destroy, setDestroy] = React.useState<boolean>(false);

    const toggleDestroy = () => setDestroy(!destroy);
    const itemRef = React.createRef<React.ElementRef<"li">>();

    return (
        <React.Fragment>
      <li
        ref={itemRef}
        key={task.id}
        className={`${styles["task-item"]}`}
        onMouseEnter={toggleDestroy}
        onMouseLeave={toggleDestroy}
      >
        <div>
          <input
            id={task.id}
            type="checkbox"
            checked={task.isDone}
            onChange={(e) => onComplete(task.id)}
          />
          <label
            htmlFor={task.id}
            className={`${task.isDone ? styles["is-done"] : ""}`}
          >
            <span>{task.title}</span>
          </label>
          <button
            onClick={() => onDelete(task.id)}
            className={`${destroy ? styles["destroy"] : ""}`}
          >
            ×
          </button>
        </div>
      </li>
    </React.Fragment>
  );
}


// Remove the unused TaskFooter function

function ListComponent(props: Props) {
    const { tasks, onComplete, onDelete } = props;

    return (
        <div className={styles["container"]}>
            <ul className={styles["task-list"]}>
            {tasks.map((task) => (
            <TaskComponent
                key={task.id}
                task={task}
                onComplete={onComplete}
                onDelete={onDelete}
            />
        ))}
      </ul>
    </div>
    );
}

export default ListComponent;