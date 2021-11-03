import React, { useEffect, useState } from "react";
import tblStyle from "../../Styles/Table.module.scss";
import Button from "../Common/Button";

const TaskItem = (props) => {
  // Declare variable (state)
  const [task, setTask] = useState({
    task_id: null,
    task_name: "",
    task_deadline: "",
    task_status: 0,
  });

  //Methods
  const editTask = () => {
    props.setNewTask(task);
  };

  const delTask = () => {
    const delList = [...props.listTask].filter(
      (item) => item.task_id !== task.task_id
    );
    localStorage.setItem("tasks", JSON.stringify(delList));
    props.setListTask(delList);
  };

  const convertStatusText = (status) => {
    switch (Number(status)) {
      case 0:
        return "Process";
      case 1:
        return "Resolve";
      default:
        return "Finish";
    }
  };

  // Watch data
  useEffect(() => {
    setTask(props.task);
  }, [props.task]);

  // Render data
  const { task_name, task_deadline, task_status } = task;

  return (
    <tr>
      <td className={tblStyle.tdCenter}>{props.position}</td>
      <td>{task_name}</td>
      <td className={tblStyle.tdCenter}>{task_deadline}</td>
      <td className={tblStyle.tdCenter}>{convertStatusText(task_status)}</td>
      <td className={tblStyle.tdCenter}>
        <Button type="primary" textFill="Edit" handleClick={editTask} />
        <Button type="danger" textFill="Delete" handleClick={delTask} />
      </td>
    </tr>
  );
};

export default TaskItem;
