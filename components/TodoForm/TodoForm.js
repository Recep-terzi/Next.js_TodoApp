import { Button, TextField, Typography } from "@mui/material";
import { addDoc, collection, serverTimestamp, updateDoc,doc } from "firebase/firestore";
import React, { useContext, useRef, useEffect} from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { TodoContext } from "../../contexts/TodoContext";
import { db } from "../../firebase";


const TodoForm = () => {
  const { showAlert, todo,setTodo } =
    useContext(TodoContext);
  const {currentUser} = useContext(AuthContext)
  const inputRef = useRef();
  useEffect(() => {
    const tiklanmaKontrol = (e) => {
      if (!inputRef.current.contains(e.target)) {
        console.log("inputlara tıklandı.")
        setTodo({baslik:'',aciklama:''})
      } else {
        console.log("inputlar harici tıklandı");
      }
    };
    document.addEventListener("mousedown", tiklanmaKontrol);
    return () => {
      document.removeEventListener("mousedown", tiklanmaKontrol);
    };
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    // console.log(baslik,aciklama);
    if (todo.baslik == "" || todo.aciklama == "") {
      showAlert("error", "Başlık ya da açıklama kısmı boş olamaz!");
      return;
    }
    if (todo?.hasOwnProperty("id")){
      // güncelleme
      const ref = doc(db,"todos",todo.id)
      const newTodo = {baslik:todo.baslik,aciklama:todo.aciklama,id:todo.id,sonGuncellemeTarihi:serverTimestamp()}
      updateDoc(ref,newTodo)
      setTodo({baslik:'',aciklama:''})
      showAlert('success',todo.id + "li todo başarıyla güncellendi.")
    }
    else{
      // ekleme
      const ref = collection(db, "todos");
    const docRef = await addDoc(ref, {
      ...todo,
      tarih: serverTimestamp(),
    });
    console.log(docRef.id);
    setTodo({baslik:'',aciklama:''})
    showAlert("success", `${docRef.id}'li todo başarıyla eklendi`);
    }
    
  };

  return (
    <div ref={inputRef}>
      
      <Typography
        sx={{ mt: 3, fontWeight: "bold" }}
        variant="h5"
        color="darkgreen"
      >
        Yeni Todo Ekle
      </Typography>
      <TextField
        fullWidth
        label="Başlık"
        margin="normal"
        value={todo.baslik}
        onChange={(e) => setTodo({...todo,baslik:e.target.value})}
      ></TextField>
      <TextField
        fullWidth
        label="Açıklama"
        multiline
        maxRows={3}
        value={todo.aciklama}
        onChange={(e) => setTodo({...todo,aciklama:e.target.value})}
        margin="normal"
      ></TextField>
      {
        todo?.hasOwnProperty("id") ? (<Button
          sx={{ mt: 3 }}
          variant="outlined"
          color="warning"
          fullWidth
          onClick={handleClick}
        >
          {" "}
          Todo Güncelle
        </Button>) : (<Button
        sx={{ mt: 3 }}
        variant="outlined"
        color="success"
        fullWidth
        onClick={handleClick}
      >
        {" "}
        Todo Ekle
      </Button>)
      }
    </div>
  );
};

export default TodoForm;
