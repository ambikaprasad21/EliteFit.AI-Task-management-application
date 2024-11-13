import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
      <motion.div
        className={styles.right}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
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
      </motion.div>
      <motion.div
        className={styles["img_container"]}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      >
        <img
          src="images/hero_image.jpg"
          alt="task management image"
          className={styles.img}
        />
      </motion.div>
    </main>
  );
}

export default LandingPage;
