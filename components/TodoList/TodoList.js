import { Typography } from "@mui/material";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import Todo from "../Todo/Todo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const {currentUser} = useContext(AuthContext)
  useEffect(() => {
    const ref = collection(db, "todos");
    const q = query(ref, where("kullaniciEmail","==",currentUser?.email),orderBy("tarih", "desc"));

    const unsub = onSnapshot(q, (snap) => {
      setTodos(
        snap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          tarih: doc.data().tarih?.toDate().getTime(),
        }))
      );
    });

    return unsub;
  }, []);
  return (
    <div>
      {todos.length === 0 ? (
        <>
          <Typography
            variant="h5"
            sx={{ mt: 5, fontWeight: "bold", textAlign: "center" }}
          >
            Henüz yazı eklenmedi.
          </Typography>
        </>
      ) : (
        <>
          <Typography
            variant="h3"
            sx={{ mt: 5, fontWeight: "bold", textAlign: "center" }}
          >
            Todo Listesi
          </Typography>
        </>
      )}
      {todos && (
        <>
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo}></Todo>
          ))}
        </>
      )}
    </div>
  );
};

export default TodoList;
