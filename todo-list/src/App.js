import { useEffect, useState } from "react";
import moment from "moment";
import cmStyle from "./Styles/Common.module.scss";
import ListTask from "./Components/ListTask/Index";
import NewTask from "./Components/NewTask/Index";

const App = () => {
  // Khai báo state
  const [listTask, setListTask] = useState([]);
  const [newTask, setNewTask] = useState({
    task_id: null,
    task_name: "",
    task_deadline: moment(new Date()).format("YYYY-MM-DD HH:mm"),
    task_status: "", // 0: Process 1: Resolve 2: Finish
  });

  // Methods
  const getData = () => {
    const local = localStorage.getItem("tasks");
    if (local) {
      try {
        const data = JSON.parse(localStorage.getItem("tasks"));
        setListTask(data);
      } catch {
        console.log("invalid Data");
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);
  //Render data
  return (
    <div className={cmStyle.App}>
      <NewTask
        listTask={listTask}
        setListTask={setListTask}
        newTask={newTask}
        setNewTask={setNewTask}
      />
      <ListTask
        listTask={listTask}
        setListTask={setListTask}
        setNewTask={setNewTask}
      />
    </div>
  );
};

export default App;
