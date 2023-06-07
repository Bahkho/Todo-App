import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
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
      userId: auth?.currentUser?.uid,
    });
    setAddTodo("");
  };
  //-----------------------------------------------------------------------------------------
  //Read todo in firebase
  useEffect(() => {
    const collectionRef = collection(database, "todos");
    const q = query(collectionRef);
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      const todosArr = [];
      querySnapshot.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id };
        if (data.userId === auth?.currentUser?.uid) {
          todosArr.push(data);
        }
      });
      setTodos(todosArr);
    });
    return unSubscribe;
  }, []);
  //-----------------------------------------------------------------------------------------
  //Update todo if completed or not
  const toogleComplete = async (todo) => {
    const docRef = doc(database, "todos", todo.id);
    await updateDoc(docRef, {
      completed: !todo.completed,
    });
  };
  //-----------------------------------------------------------------------------------------
  //Update todo from firebase
  const updateTodo = async (todo, input) => {
    const docRef = doc(database, "todos", todo.id);
    await updateDoc(docRef, {
      text: input,
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
      <div className="flex justify-center items-center h-screen">
        <div className="w-full px-4">
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
              <button className="border p-4 ml-2 bg-green-700 text-white">
                {<AiOutlinePlus />}
              </button>
            </form>
            <ul>
              {todos.map((todo, index) => (
                <Todo
                  todo={todo}
                  toogleComplete={toogleComplete}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
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
            <MdLogout className="inline-block ml-2" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
