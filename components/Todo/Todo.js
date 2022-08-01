import React, { useContext } from "react";
import { ListItem, ListItemText, IconButton, Icon } from "@mui/material";
import moment from "moment";
import "moment/locale/tr";
import { Delete, MoreVert } from "@mui/icons-material";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { TodoContext } from "../../contexts/TodoContext";
import {useRouter} from "next/router"
const Todo = ({ todo }) => {
  const { id, baslik, aciklama, tarih } = todo;
  const router = useRouter();
  const { showAlert,setTodo } = useContext(TodoContext);
  const handleDelete = async (id, e) => {
    e.preventDefault();
    const ref = doc(db, "todos", id);
    await deleteDoc(ref);
    showAlert('warning',id + "'li todo başarıyla silindi.")
  };
  const handleMore = (id,e) => {
    router.push(`/todos/${id}`)
  }
  return (
    <ListItem
      sx={{ mt: 3, boxShadow: 3 }}
      style={{ backgroundColor: "#fafafa" }}
      onClick={() => setTodo({id,baslik,aciklama,tarih})}
      secondaryAction={
        <>
          <IconButton onClick={(e) => handleDelete(id, e)}>
            <Delete />
          </IconButton>
          <IconButton onClick={(e) => handleMore(id,e)} >
            <MoreVert />
          </IconButton>
        </>
      }
    >
      <ListItemText primary={baslik} secondary={moment(tarih).format("LLL")} />
    </ListItem>
  );
};

export default Todo;
