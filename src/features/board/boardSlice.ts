import { createSlice } from '@reduxjs/toolkit'

export interface fillCellAction {
    type: string,
    payload: {
        id: number,
        value: string
    }
}

export interface State {
    board: {
        values: string[]
    }
}

const boardSlice = createSlice({
    name: 'board',
    initialState: {
        values: new Array(9).fill('') as string[]
    },
    reducers: {
        fillCell: (state, {payload: {id, value}}: fillCellAction) => {
            state.values[id] = value
        },
        emptyCells: state => {
            state.values = new Array(9).fill('') as string[]
        }
    }
})

export const { fillCell, emptyCells } = boardSlice.actions;

export const selectValues = (state: {board: {values: string[]}}) => state.board.values
export const selectValueById = (id: number) => (state: unknown) => (state as State).board.values[id]
export const selectValuesIdsBySign = (sign: string)  => (state: {board: {values: string[]}}) => {
    const res = [] as number[]
    for (let [index, value] of Object.entries(state.board.values)) {
        if (value === sign) {
            res.push(Number(index))
        }
    }
    
    return res
}

export default boardSlice.reducer;