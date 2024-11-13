import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import styles from "./Dashboard.module.css";
import { AiOutlineLogout } from "react-icons/ai";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Modal from "../utility/Modal";
import CreateTask from "../modalWindows/CreateTask";
import TaskItem from "../components/TaskItem";
import { useState } from "react";

function Dashboard() {
  const [priorityFilter, setPriorityFilter] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { user, tasks, logout } = useUser();

  console.log(tasks);

  const isOverdue = (deadline) => new Date(deadline) < new Date();
  const isUpcoming = (deadline) => !isOverdue(deadline);

  const filterByPriority = (tasks) => {
    if (!priorityFilter) return tasks;
    return tasks.filter((task) => task.priority.value === priorityFilter);
  };

  const filterBySearchQuery = (tasks) => {
    if (!search) return tasks;
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  };

  const upcomingTasks = filterBySearchQuery(
    filterByPriority(
      tasks
        .filter((task) => !task.completed && isUpcoming(task.deadline))
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    )
  );
  const overdueTasks = filterBySearchQuery(
    filterByPriority(
      tasks
        .filter((task) => !task.completed && isOverdue(task.deadline))
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    )
  );
  const completedTasks = filterBySearchQuery(
    filterByPriority(
      tasks
        .filter((task) => task.completed)
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    )
  );

  function handleLogout() {
    logout();
    navigate("/");
  }

  function handlePriorityChange(e) {
    setPriorityFilter(e.target.value);
  }

  return (
    <main className={styles.main}>
      <header>
        <div className={styles.h_f}>
          <div className={styles.g_l}>
            <div className={styles.username}>
              <span className={styles.hand}>👋</span>
              <span>{user}</span>
            </div>
            <AiOutlineLogout
              className={styles.logout}
              title="logout"
              onClick={handleLogout}
            />
          </div>
          <div className={styles.s_a}>
            <div className={styles.search}>
              <input
                type="text"
                placeholder="search task..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FaMagnifyingGlass
                style={{ cursor: "pointer", marginRight: "1rem" }}
              />
            </div>
            <Modal>
              <Modal.Open opens="create-project">
                <button>+ Add task</button>
              </Modal.Open>
              <Modal.Window name={"create-project"}>
                <CreateTask />
              </Modal.Window>
            </Modal>
          </div>
        </div>
        <div className={styles.filter}>
          <div>Filter by priority:</div>
          <select name="filter by" id="" onChange={handlePriorityChange}>
            <option value="">All task</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </header>
      {tasks.length === 0 ? (
        <div className={styles.no_task}>
          <div className={styles.task_svg}>
            <svg
              fill="#b9b9b9"
              height="10rem"
              width="10rem"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 470.767 470.767"
              xml:space="preserve"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path d="M362.965,21.384H289.62L286.638,7.99C285.614,3.323,281.467,0,276.685,0h-82.618c-4.782,0-8.913,3.323-9.953,7.99 l-2.967,13.394h-73.36c-26.835,0-48.654,21.827-48.654,48.662v352.06c0,26.835,21.819,48.662,48.654,48.662h255.179 c26.835,0,48.67-21.827,48.67-48.662V70.046C411.635,43.211,389.8,21.384,362.965,21.384z M379.831,422.105 c0,9.295-7.563,16.858-16.866,16.858H107.786c-9.287,0-16.85-7.563-16.85-16.858V70.046c0-9.295,7.563-16.857,16.85-16.857h66.294 l-1.692,7.609c-0.684,3.02,0.062,6.188,1.988,8.596c1.94,2.415,4.876,3.82,7.965,3.82h106.082c3.091,0,6.026-1.405,7.951-3.82 c1.942-2.415,2.687-5.575,2.004-8.596l-1.692-7.609h66.279c9.303,0,16.866,7.563,16.866,16.857V422.105z"></path>{" "}
                  <path d="M170.835,188.426h43.249l-10.279-7.019c-14.506-9.899-18.232-29.693-8.325-44.197c9.893-14.489,29.693-18.239,44.197-8.324 l1.694,1.157v-12.136c0-7.866-6.383-14.248-14.242-14.248h-56.294c-7.857,0-14.24,6.383-14.24,14.248v56.271 C156.595,182.045,162.978,188.426,170.835,188.426z"></path>{" "}
                  <path d="M303.256,110.313l-49.85,47.194l-22.704-15.49c-7.221-4.962-17.13-3.083-22.099,4.162 c-4.954,7.251-3.09,17.144,4.178,22.098l33.28,22.727c2.718,1.864,5.839,2.772,8.961,2.772c3.96,0,7.888-1.474,10.933-4.356 l59.167-56.014c6.382-6.033,6.645-16.104,0.62-22.479C319.686,104.552,309.637,104.28,303.256,110.313z"></path>{" "}
                  <path d="M170.835,297.669H214.1l-10.295-7.027c-14.506-9.901-18.232-29.693-8.325-44.197c9.893-14.498,29.693-18.248,44.197-8.325 l1.694,1.158v-12.136c0-7.865-6.383-14.248-14.242-14.248h-56.294c-7.857,0-14.24,6.383-14.24,14.248v56.279 C156.595,291.286,162.978,297.669,170.835,297.669z"></path>{" "}
                  <path d="M303.256,219.555l-49.85,47.186l-22.704-15.49c-7.221-4.97-17.13-3.098-22.099,4.162 c-4.954,7.253-3.09,17.144,4.178,22.099l33.28,22.727c2.718,1.864,5.839,2.772,8.961,2.772c3.96,0,7.888-1.476,10.933-4.356 l59.167-56.007c6.382-6.033,6.645-16.096,0.62-22.479C319.686,213.793,309.637,213.529,303.256,219.555z"></path>{" "}
                  <path d="M227.129,322.135h-56.294c-7.857,0-14.24,6.383-14.24,14.248v56.271c0,7.865,6.383,14.248,14.24,14.248h56.294 c7.859,0,14.242-6.383,14.242-14.248v-56.271C241.371,328.518,234.988,322.135,227.129,322.135z"></path>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
          <p>
            You do not have any tasks to work on, to create new task use <br />
            add task button above
          </p>
        </div>
      ) : (
        <div className={styles.tasks_club}>
          <div className={styles.task_col}>
            <h2>Upcoming tasks</h2>
            {/* will be creating task using tasks array */}
            <div className={styles.task_list}>
              {upcomingTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>

          <div className={styles.task_col}>
            <h2>Overdue tasks</h2>
            {/* will be creating task using tasks array */}
            <div className={styles.task_list}>
              {overdueTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>

          <div className={styles.task_col}>
            <h2>Completed tasks</h2>
            {/* will be creating task using tasks array */}
            <div className={styles.task_list}>
              {completedTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Dashboard;
