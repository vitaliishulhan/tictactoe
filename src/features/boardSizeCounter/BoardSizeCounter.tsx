import React from 'react';
import './BoardSizeCounter.style.css';
import { 
    useSelector, 
    useDispatch 
} from 'react-redux'
import { 
    selectSize, 
    incrementSize, 
    decrementSize
} from '../board/boardSlice'

export default function BoardSizeCounter() {
    const boardSize = useSelector(selectSize)
    const dispatch = useDispatch()

    return (
        <div className="tictactoe-board-size-counter">
            <span>Board Size</span>
            <div className="counter">
                <div className="plus" onClick={() => {dispatch(incrementSize())}}>+</div>
                <div className="size">{boardSize}</div>
                <div className="minus" onClick={() => {dispatch(decrementSize())}}>-</div>
            </div>
        </div>
    )
}