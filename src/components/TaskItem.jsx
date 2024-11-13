import Modal from "../utility/Modal";
import ConfirmDelete from "../modalWindows/ConfirmDelete";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import Priority from "../utility/Priority";
import styles from "./TaskItem.module.css";
import { formatDate } from "../utility/formatDate";
import { useUser } from "../context/UserContext";
import EditTask from "../modalWindows/EditTask";

function TaskItem({ task }) {
  const completed = task.completed ? true : false;
  const taskPriority = task.priority.value.toLowerCase();

  const { toggleCompletion, deleteTask } = useUser();
  return (
    <div className={styles.task}>
      <div className={styles.task_info}>
        <div className={styles["p_e_d"]}>
          <Priority variation={taskPriority}>{task.priority.value}</Priority>
          <div className={styles.e_d}>
            <Modal>
              <Modal.Open opens="delete-project-attachment">
                <FaPencil
                  style={{ marginRight: "5px", color: "blue" }}
                  title="Edit"
                />
              </Modal.Open>
              <Modal.Window name={"delete-project-attachment"}>
                <EditTask data={task} />
              </Modal.Window>
            </Modal>
            <Modal>
              <Modal.Open opens="delete-project-attachment">
                <FaTrashCan
                  title="Delete"
                  style={{ marginRight: "5px", color: "red" }}
                />
              </Modal.Open>
              <Modal.Window name={"delete-project-attachment"}>
                <ConfirmDelete onConfirmDelete={() => deleteTask(task.id)} />
              </Modal.Window>
            </Modal>
          </div>
        </div>
        <div className={styles.t_d}>
          <div className={styles.t}>{task.title}</div>
          <div className={styles.d}>{task.description}</div>
        </div>
        <div className={styles.deadline}>
          <span className={styles.d_t}>Deadline:</span>{" "}
          <span className={styles.date}>{formatDate(task.deadline)}</span>
        </div>
      </div>
      <button className={styles.btn} onClick={() => toggleCompletion(task.id)}>
        {completed ? "Mark as incomplete" : "Mark as completed"}
      </button>
    </div>
  );
}

export default TaskItem;
