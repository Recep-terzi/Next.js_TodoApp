import { Container, Snackbar, Alert, Typography, Box, Avatar,Button } from "@mui/material";
import { signOut } from "firebase/auth";
import Head from "next/head";
import { useState,useContext } from "react";
import Loading from "../components/Loading/Loading";
import Login from "../components/Login/Login";
import TodoForm from "../components/TodoForm/TodoForm";
import TodoList from "../components/TodoList/TodoList";
import { AuthContext } from "../contexts/AuthContext";
import { TodoContext } from "../contexts/TodoContext";
import { auth } from "../firebase";


export default function Home() {

  const {currentUser} = useContext(AuthContext)


  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const [todo,setTodo]=useState({
    baslik:'',
    aciklama:''
  })

  const showAlert = (type, message) => {
    setAlertMessage(message);
    setAlertType(type);
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <TodoContext.Provider value={{ showAlert,todo,setTodo }}>
      <Container maxWidth="md">
        <Head>
          <title>Pyson Todo App</title>
          <meta name="description" content="next js ile todo app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <Box sx={{display:"flex",justifyContent:"space-between",mt:3}}>
          <Avatar src={currentUser.photoURL} />
          <Typography variant="h5">{currentUser.displayName}</Typography>
          <Button variant="contianed" color="primary" onClick={() => auth.signOut()}>Çıkış Yap</Button>
        </Box>




        <TodoForm />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={alertType} sx={{width: "100%"}}>
            {alertMessage}
          </Alert>
        </Snackbar>
        <TodoList />
      </Container>
      
    </TodoContext.Provider>
  );
}
