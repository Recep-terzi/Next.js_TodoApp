import { Grid,Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import React from 'react'
import { auth,provider } from '../../firebase'
import { signInWithPopup } from 'firebase/auth'
const Login = () => {
  const loginGoogle = () => {
    signInWithPopup(auth,provider)
  }
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
        <Button variant="contained" startIcon={<GoogleIcon />} onClick={loginGoogle}>Google ile giriş yap</Button>
    </Grid>
  )
}

export default Login