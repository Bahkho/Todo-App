import React from "react";
import Swal from "sweetalert2";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";

const Todo = ({ todo, toogleComplete, deleteTodo, updateTodo }) => {
  const handleEditTodo = () => {
    Swal.fire({
      title: "Update Todo",
      input: "text",
      inputValue: todo.text,
      showCancelButton: true,
      confirmButtonText: "OK",
      preConfirm: async (input) => {
        if (input.trim() === "") {
          Swal.showValidationMessage("Please enter a valid todo.");
        } else {
          await updateTodo(todo, input);
        }
      },
    });
  };
  return (
    <li
      className={
        todo.completed
          ? `flex justify-between bg-slate-400 p-4 my-2 capitalize`
          : `flex justify-between bg-slate-200 p-4 my-2 capitalize`
      }
    >
      <div className="flex">
        <input
          onChange={() => toogleComplete(todo)}
          type="checkbox"
          checked={todo.completed ? "checked" : ""}
        />
        <p
          onClick={() => toogleComplete(todo)}
          className={
            todo.completed
              ? `ml-2 cursor-pointer line-through`
              : `ml-2 cursor-pointer`
          }
        >
          {todo.text}
        </p>
      </div>
      <div className="flex gap-4">
        <button className="cursor-pointer" onClick={handleEditTodo}>
          {<HiPencil />}
        </button>
        <button className="cursor-pointer" onClick={() => deleteTodo(todo.id)}>
          {<FaRegTrashAlt />}
        </button>
      </div>
    </li>
  );
};

export default Todo;
