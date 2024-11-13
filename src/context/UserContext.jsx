import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("username") || null);
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  function login(name) {
    const prevName = localStorage.getItem("username");
    if (prevName && name.toLowerCase() === prevName.toLowerCase()) {
      setUser(prevName);
      setTasks(JSON.parse(localStorage.getItem("tasks")));
      return;
    }
    setUser((item) => (item = name));
    localStorage.setItem("username", name);
    localStorage.setItem("tasks", JSON.stringify([]));
  }

  function logout() {
    setUser(null);
    setTasks([]);
  }

  function updateLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function addTask(newTask) {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  }

  function toggleCompletion(taskId) {
    const updatedTask = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTask);
    updateLocalStorage(updatedTask);
  }

  function editTask(id, data) {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, ...data } : task
      );
      updateLocalStorage(updatedTasks);
      return updatedTasks;
    });
  }

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      updateLocalStorage(updatedTasks);
      return updatedTasks;
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        tasks,
        login,
        logout,
        addTask,
        toggleCompletion,
        editTask,
        deleteTask,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("user context used outside the user provider");
  }
  return context;
}

export { useUser };
