import React, { useEffect, useState } from 'react';
import './Board.style.css'
import Cell from './features/cell/Cell'
import { useDispatch, useSelector } from 'react-redux'
import {
    fillCell, 
    emptyCells,
    selectValues,
    selectValuesIdsBySign,
} from './boardSlice'
import {
    change,
    selectRole
} from '../role/roleSlice'
import {
    incrementWon,
    incrementDraw
} from '../statistics/statisticsSlice'
import { erase, write } from '../message/messageSlice';

const win_situations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

export default function Board() {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const role = useSelector(selectRole)
    const values = useSelector(selectValues)
    const [winningCells, setWinningCells] = useState([] as number[])

    const playerXHand = useSelector(selectValuesIdsBySign('X'))
    const playerOHand = useSelector(selectValuesIdsBySign('O'))

    const verifyWinner = (hand: number[]) => {
        if (hand.length >= 3) {
            for (let situation of win_situations) {
                if (situation.reduce((acc: boolean, curr: number) => acc && hand.includes(curr), true)) {
                    setWinningCells(situation.slice())
                    return true
                }
            }
        }
        return false
    }

    useEffect(() => {
        
        if (verifyWinner(playerXHand) || verifyWinner(playerOHand)) {
            let real_role = role === 'X' ? 'O' : 'X'
            dispatch(write(`Player ${real_role} is winner`))
            dispatch(incrementWon(real_role))
            setOpen(true)
        }

        if (!values.filter(item => !item).length) {
            dispatch(write('Draw'))
            dispatch(incrementDraw())
            setOpen(true)
        }
        

    }, [values])

    const handleOnCellClick = (id: number) => {
        dispatch(fillCell({id,value: role}))
        dispatch(change())
    }

    const handleEndWindowClick = () => {
        dispatch(erase())
        setWinningCells([])
        dispatch(emptyCells())
        setOpen(false)
    }

    return (
        <>
        <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className="tictactoe-board">
                {
                    [0,1,2,3,4,5,6,7,8].map(id => <Cell win={winningCells.includes(id)} key={id} id={id} onClick={handleOnCellClick} />)
                }
            </div>
        </div>
        <div onClick={handleEndWindowClick} style={{
            display: open ? 'block' : 'none',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            cursor: 'pointer',
            zIndex: 3001
        }} />
        </>
    )
}