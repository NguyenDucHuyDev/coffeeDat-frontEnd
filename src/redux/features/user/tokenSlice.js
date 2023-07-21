//import library
import { createSlice } from '@reduxjs/toolkit'


// handle and export
const initialState = {
  checkToken: false,
}

export const tokenSlice = createSlice({
  name:"checkToken",
  initialState,
  reducers:{
    checkToken:(state,action) => {state.checkToken = action.payload},
  }
})

export const {checkToken} = tokenSlice.actions

export default tokenSlice.reducer

