import { useEffect, useState } from "react";
import styles from "./LandingPage.module.css";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [name, setName] = useState("");
  const { user, tasks, login } = useUser();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (!name) {
      alert("Name is required 😎");
      return;
    }

    login(name);
    navigate("/dashboard");
  }

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  });

  return (
    <main className={styles.main_section}>
      <div className={styles.right}>
        <div className={styles.r_t}>
          <h1>Task management application</h1>
          <p>
            This is a simple task management application made for <br />
            EliteFit.AI/SDE screening test
          </p>
        </div>
        <div className={styles.r_d}>
          <h3>Enter your name to start:</h3>
          <div className={styles.form}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              required
            />
            <button onClick={handleLogin}>Submit</button>
          </div>
        </div>
      </div>
      <div className={styles["img_container"]}>
        <img
          src="images/hero_image.jpg"
          alt="task management image"
          className={styles.img}
        />
      </div>
    </main>
  );
}

export default LandingPage;
