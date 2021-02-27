import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        value: ''
    },
    reducers: {
        write: (state, action) => {
            state.value = action.payload as string
        },
        erase: state => {
            state.value = ''
        }
    }
})

export const { write, erase } = messageSlice.actions;

export const selectMessage = (state: {message: {value: string}}) => state.message.value;

export default messageSlice.reducer;