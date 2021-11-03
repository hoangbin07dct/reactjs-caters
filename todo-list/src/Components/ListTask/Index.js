import React, { useState } from "react";
import tblStyle from "../../Styles/Table.module.scss";
import TaskItem from "./TaskItem";
import sortUp from "../../images/sortUp.svg";
import sortDown from "../../images/sortDown.svg";

const ListTask = ({ listTask, setListTask, setNewTask }) => {
  const [sort, setSort] = useState({
    isSort: false,
    sortBy: null,
    sortOrder: false, //false : ASC true: DESC
  });
  // Methods

  const sortList = (e) => {
    const { by } = e;
    const { sortOrder } = sort;
    const newOrder = by !== sort.sortBy ? false : !sortOrder ? true : false;
    setSort({
      isSort: true,
      sortBy: by,
      sortOrder: newOrder,
    });
  };

  const setListSort = () => {
    const { isSort, sortBy, sortOrder } = sort;
    let rs = [...listTask];
    if (isSort) {
      const arrAsc = [...listTask].sort((a, b) =>
        (a[sortBy] || "")
          .toString()
          .localeCompare((b[sortBy] || "").toString(), undefined, {
            numeric: true,
          })
      );
      const arrDesc = [...listTask].sort((a, b) =>
        (b[sortBy] || "")
          .toString()
          .localeCompare((a[sortBy] || "").toString(), undefined, {
            numeric: true,
          })
      );
      rs = !sortOrder ? arrAsc : arrDesc;
    }
    return rs;
  };

  const getClassName = (type) => {
    const { isSort, sortBy, sortOrder } = sort;
    if (!isSort || sortBy !== type) {
      return null;
    } else {
      const icon = sortOrder ? sortUp : sortDown;
      return {
        backgroundImage: `url(${icon})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "10px auto",
        backgroundPosition: "center right 10px",
      };
    }
  };
  // Render data
  return (
    <div className={tblStyle.listStyle}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th
              style={getClassName("task_name")}
              onClick={() => sortList({ by: "task_name" })}
            >
              Task name
            </th>
            <th
              style={getClassName("task_deadline")}
              onClick={() => sortList({ by: "task_deadline" })}
            >
              Deadline
            </th>
            <th
              style={getClassName("task_status")}
              onClick={() => sortList({ by: "task_status" })}
            >
              Status
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listTask && listTask.length > 0 ? (
            setListSort().map((task, idx) => (
              <TaskItem
                listTask={listTask}
                setListTask={setListTask}
                setNewTask={setNewTask}
                task={task}
                key={idx}
                position={idx + 1}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5" className={tblStyle.tdCenter}>
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListTask;
