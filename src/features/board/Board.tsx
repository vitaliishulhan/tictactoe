import React, { useEffect, useState } from 'react';
import './Board.style.css'
import Cell from './features/cell/Cell'
import { useDispatch, useSelector } from 'react-redux'
import {
    fillCell, 
    emptyCells,
    selectValues,
    selectValuesIdsBySign,
    selectSize
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



export default function Board() {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const role = useSelector(selectRole)
    const boardSize = useSelector(selectSize)
    const values = useSelector(selectValues)
    const [winningCells, setWinningCells] = useState([] as number[])
    const [winSituations, setWinSituations] = useState([] as number[][])

    const playerXHand = useSelector(selectValuesIdsBySign('X'))
    const playerOHand = useSelector(selectValuesIdsBySign('O'))

    const verifyWinner = (hand: number[]) => {
        if (hand.length >= 3) {
            for (let situation of winSituations) {
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
            return
        }

        if (!values.filter(item => !item).length) {
            dispatch(write('Draw'))
            dispatch(incrementDraw())
            setOpen(true)
        }

    }, [values])

    useEffect(() => {
        const ids = Object.keys(values).map(Number)

        const res: number[][] = []



        for (let i = 0; i < boardSize; i++) {
            const temp: number[] = []

            res.push(ids.slice(i*boardSize,boardSize*(i+1)))

            for (let j = 0; j < boardSize; j++) {
                temp.push(i+j*boardSize)
            }

            res.push(temp)
        }

        const diagonal: number[] = []
        const antidiagonal: number[] = []

        for (let i = 0; i < boardSize; i++) {
            diagonal.push((1 + boardSize)*i)
            antidiagonal.push((boardSize - 1) * (i + 1))
        }

        res.push(diagonal)
        res.push(antidiagonal)

        console.log(res)


        setWinSituations(res)
    }, [boardSize])

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
                display: 'flex',
                marginTop: 'var(--header-height)',
                marginBottom: 'var(--footer-height)',
                padding: '2rem 0',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - var(--header-height) - var(--footer-height) - 2rem * 2)'
            }}>
                <div className="tictactoe-board" style={{
                    width: boardSize*100,
                    height: boardSize*100,
                    gridTemplateRows: new Array(boardSize).fill('1fr').join(' '),
                    gridTemplateColumns: new Array(boardSize).fill('1fr').join(' '),
                }}>
                    {
                        Object.keys(values).map(Number).map(id => <Cell win={winningCells.includes(id)} key={id} id={id} onClick={handleOnCellClick} />)
                    }
                </div>
            </div>
            <div 
                onClick={handleEndWindowClick} 
                style={{
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