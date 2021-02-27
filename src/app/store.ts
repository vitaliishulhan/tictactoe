import {configureStore} from '@reduxjs/toolkit'
import boardReducer from '../features/board/boardSlice'
import roleReducer from '../features/role/roleSlice'
import statisticsReducer from '../features/statistics/statisticsSlice'
import messageReducer from '../features/message/messageSlice'

export default configureStore({
    reducer: {
        board: boardReducer,
        role: roleReducer,
        statistics: statisticsReducer,
        message: messageReducer
    },
});