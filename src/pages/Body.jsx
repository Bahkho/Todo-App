import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Todo from "../components/Todo";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { database, auth } from "../config/Firebase";

const Body = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [addTodo, setAddTodo] = useState("");
  //-----------------------------------------------------------------------------------------
  //Create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (addTodo === "") {
      alert("Please Enter A Todo");
      return;
    }
    const collectionRef = collection(database, "todos");
    await addDoc(collectionRef, {
      completed: false,
      text: addTodo,
      // userId: auth?.currentUser?.uid,
    });
    setAddTodo("");
  };
  //-----------------------------------------------------------------------------------------
  //Read todo in firebase
  useEffect(() => {
    const collectionRef = collection(database, "todos");
    const q = query(collectionRef);
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      var todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return unSubscribe;
  }, []);
  //-----------------------------------------------------------------------------------------
  //Update todo from firebase
  const toogleComplete = async (todo) => {
    const docRef = doc(database, "todos", todo.id);
    await updateDoc(docRef, {
      completed: !todo.completed,
      // userId: auth?.currentUser?.uid,
    });
  };
  //-----------------------------------------------------------------------------------------
  //Delete todo
  const deleteTodo = async (id) => {
    const docRef = doc(database, "todos", id);
    await deleteDoc(docRef);
  };
  //-----------------------------------------------------------------------------------------
  const nextPage = () => {
    navigate("/logout");
  };

  return (
    <>
      <div>
        <div className="max-w-[640px] bg-slate-100 rounded-md w-full shadow-xl mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
            To Do App
          </h1>
          <form onSubmit={createTodo} className="flex justify-between">
            <input
              type="text"
              value={addTodo}
              onChange={(e) => setAddTodo(e.target.value)}
              placeholder="Add Todo"
              className="border p-2 w-full text-xl text-black"
            />
            <button className="border p-4 ml-2 bg-green-700 text-slate-100">
              {<AiOutlinePlus />}
            </button>
          </form>
          <ul>
            {todos.map((todo, index) => (
              <Todo
                todo={todo}
                toogleComplete={toogleComplete}
                deleteTodo={deleteTodo}
                key={index}
              />
            ))}
          </ul>
          {todos.length < 1 ? null : (
            <p className="text-center p-2">{`You have ${todos.length} todos`}</p>
          )}
        </div>
        <div
          className="max-w-[640px] cursor-pointer bg-slate-100 rounded-md text-center w-full shadow-xl px-4 py-2 mt-6 mx-auto "
          onClick={nextPage}
        >
          Next Page To Logout
        </div>
      </div>
    </>
  );
};

export default Body;
