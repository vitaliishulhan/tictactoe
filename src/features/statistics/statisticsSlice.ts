import { createSlice } from '@reduxjs/toolkit'
import { stat } from 'fs'

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: {
        wonX: 0,
        wonO: 0,
        draw: 0
    },
    reducers: {
        incrementWon: (state, action) => {
            state[`won${action.payload}` as keyof typeof state]++
        },
        incrementDraw: state => {
            state.draw++
        },
    }
})

export const { incrementWon, incrementDraw } = statisticsSlice.actions

export const selectWonX = (state: {statistics: {wonX: number}}) => state.statistics.wonX
export const selectWonO = (state: {statistics: {wonO: number}}) => state.statistics.wonO
export const selectDraw = (state: {statistics: {draw: number}}) => state.statistics.draw

export default statisticsSlice.reducer