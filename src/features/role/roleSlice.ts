import { createSlice } from '@reduxjs/toolkit'

export interface State {
    role: {
        value: string
    }
}

const roleSlice = createSlice({
    name: 'role',
    initialState: {
        value: 'X'
    },
    reducers: {
        change: state => {
            state.value = state.value === 'X' ? 'O' : 'X'
        }
    }
})

export const { change } = roleSlice.actions;

export const selectRole = (state: unknown) => (state as State).role.value

export default roleSlice.reducer;