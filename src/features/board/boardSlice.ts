import { createSlice } from '@reduxjs/toolkit'

export interface fillCellAction {
    type: string,
    payload: {
        id: number,
        value: string
    }
}

const boardSlice = createSlice({
    name: 'board',
    initialState: {
        values: new Array(9).fill('') as string[],
        size: 3
    },
    reducers: {
        fillCell: (state, {payload: {id, value}}: fillCellAction) => {
            state.values[id] = value
        },
        emptyCells: state => {
            state.values = new Array(state.size**2).fill('') as string[]
        },
        incrementSize: state => {
            if (state.size != 9) {
                state.size++
                state.values = new Array(state.size**2).fill('')
            }
        },
        decrementSize: state => {
            if (state.size != 3) {
                state.size--;
                state.values = new Array(state.size**2).fill('')
            }
        }
    }
})

export const { fillCell, emptyCells, incrementSize, decrementSize } = boardSlice.actions;

export const selectValues = (state: {board: {values: string[]}}) => state.board.values
export const selectValueById = (id: number) => (state: {board: {values: string[]}}) => state.board.values[id]
export const selectValuesIdsBySign = (sign: string)  => (state: {board: {values: string[]}}) => {
    const res = [] as number[]
    for (let [index, value] of Object.entries(state.board.values)) {
        if (value === sign) {
            res.push(Number(index))
        }
    }
    
    return res
}
export const selectSize = (state: {board: {size: number}}) => state.board.size

export default boardSlice.reducer;