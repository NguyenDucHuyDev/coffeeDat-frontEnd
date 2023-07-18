//import library
import { createSlice } from '@reduxjs/toolkit'

// handle and export
const initialState = {
  userInfo: null,
}

export const userSlice = createSlice({
  name:"userInfo",
  initialState,
  reducers:{
    setUserInfo:(state,action) => {state.userInfo = action.payload},
  }
})

export const {setUserInfo} = userSlice.actions

export default userSlice.reducer

