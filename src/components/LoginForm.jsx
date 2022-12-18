import React, { useState } from 'react'
import {Stack, TextField, InputAdornment, IconButton, Iconify} from "@mui/material";
const LoginForm = () => {
      const [showPassword, setShowPassword] = useState(false);

  return (
    <>
          <Stack spacing={3}>
            <TextField name="email" label="Email address" >
                  
          </TextField>
             
                  
          
          </Stack> 
    </>
  )
}

export default LoginForm
