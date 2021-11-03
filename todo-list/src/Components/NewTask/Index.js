import React, { useState } from "react";
import moment from "moment";
import uuid from "react-uuid";
import Datetime from "react-datetime";
import Button from "../Common/Button";
import "react-datetime/css/react-datetime.css";
import frmStyle from "../../Styles/Form.module.scss";

const NewTask = ({ listTask, setListTask, newTask, setNewTask }) => {
  const [error, setError] = useState({
    task_name: false,
    task_deadline: false,
    task_status: false,
  });

  //Methods

  const changeInput = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const checkValidInput = () => {
    let errName = false;
    let errDeadLine = false;
    let errStatus = false;
    const { task_name, task_deadline, task_status } = newTask;
    if (task_name === "") {
      errName = "Please enter task name";
    }
    if (task_deadline === "Invalid date") {
      errDeadLine = "Invalid format";
    }
    if (task_status === "") {
      errStatus = "Please choose a status";
    }
    setError({
      task_name: errName,
      task_deadline: errDeadLine,
      task_status: errStatus,
    });
    if (errName || errDeadLine || errStatus) {
      return false;
    } else {
      return true;
    }
  };

  const addTask = (e) => {
    e.preventDefault();
    let newList = [];

    if (checkValidInput()) {
      // Set default

      setError({
        task_name: false,
        task_deadline: false,
        task_status: false,
      });

      setNewTask({
        task_id: null,
        task_name: "",
        task_deadline: moment(new Date()).format("YYYY-MM-DD HH:mm"),
        task_status: 0, // 0: Process 1: Resolve 2: Finish
      });

      if (!newTask.task_id) {
        const newData = {
          ...newTask,
          task_id: uuid(),
        };
        newList = [newData, ...listTask];
      } else {
        newList = [...listTask].map((item) => {
          if (item.task_id === newTask.task_id)
            return {
              ...item,
              task_name: newTask.task_name,
              task_deadline: newTask.task_deadline,
              task_status: newTask.task_status,
            };
          return item;
        });
      }
      // Add new task into list
      setListTask(newList);

      localStorage.setItem("tasks", JSON.stringify(newList));
    }
  };

  // Render data
  return (
    <div className={frmStyle.frmContainer}>
      <form>
        <div className={frmStyle.frmContainer__inner}>
          <div className={frmStyle.frmContainer__col}>
            <label>Name</label>
            <div className={frmStyle.frmInput}>
              <input
                type="text"
                name="task_name"
                value={newTask.task_name}
                onChange={changeInput}
                placeholder="Task name"
                autoComplete="off"
              />
              {error.task_name && (
                <p className={frmStyle.errTxt}>{error.task_name}</p>
              )}
            </div>
          </div>
          <div className={frmStyle.frmContainer__col}>
            <label>Deadline</label>
            <div className={frmStyle.frmInput}>
              <Datetime
                value={newTask.task_deadline}
                dateFormat="YYYY-MM-DD"
                timeFormat="HH:mm"
                closeOnSelect={true}
                className={frmStyle.frmContainer__calendar}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    task_deadline: moment(new Date(e)).format(
                      "YYYY-MM-DD HH:mm"
                    ),
                  })
                }
              />
              {error.task_deadline && (
                <p className={frmStyle.errTxt}>{error.task_deadline}</p>
              )}
            </div>
          </div>
          <div className={frmStyle.frmContainer__col}>
            <label>Status</label>
            <div className={frmStyle.frmInput}>
              <select
                name="task_status"
                value={newTask.task_status}
                onChange={changeInput}
              >
                <option value="">Please choose</option>
                <option value="0">Process</option>
                <option value="1">Resolve</option>
                <option value="2">Finish</option>
              </select>
              {error.task_status && (
                <p className={frmStyle.errTxt}>{error.task_status}</p>
              )}
            </div>
          </div>
          <div className={frmStyle.frmContainer__col}>
            <Button type="primary" textFill="Apply" handleClick={addTask} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewTask;
