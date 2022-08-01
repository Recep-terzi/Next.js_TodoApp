import {
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import React from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/index";
import Link from "next/link";
const id = ({ todoProps }) => {
  const todo = JSON.parse(todoProps);
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={4}>
        <Card
          sx={{
            minWidth: 300,
            maxWidth: 600,
            boxShadow: 3,
            bgColor: "#fafafa",
          }}
        >
          <CardContent>
            <Typography variant="h5" components="div">
              {todo.baslik}
            </Typography>
            <Typography
              variant="h5"
              components="div"
              sx={{ mt: 2 }}
              color="GrayText"
            >
              {todo.aciklama}
            </Typography>
          </CardContent>
          <CardActions>
            <Link href="/">
                <Button size="small" >Geri Dön</Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export const getStaticPaths = async () => {
  const snap = await getDocs(collection(db, "todos"));
  const paths = snap.docs.map((doc) => {
    return {
      params: { id: doc.id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const docRef = doc(db, "todos", id);
  const docSnap = await getDoc(docRef);
  return {
    props: { todoProps: JSON.stringify(docSnap.data()) || null },
  };
};

export default id;
