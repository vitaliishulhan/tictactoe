import React, { useState } from 'react';
import { 
    selectValueById
} from '../../boardSlice'
import { 
    useSelector, 
} from 'react-redux'
import './Cell.style.css';
import "animate.css";

export interface CellProps {
    id: number,
    onClick(id: number): void,
    win: boolean
}


export default function Cell({id, onClick, win}: CellProps) {
    const [classNameForAnimation, setClassNameForAnimation] = useState('')
    const value = useSelector(selectValueById(id))
    let [isClicked, setIsClicked] = useState(false)

    const handleClick = () => {
        if (!isClicked) {
            if (!!value) {
                setIsClicked(previous => true)
                setClassNameForAnimation('animate__jello')
                setTimeout(() => {
                    setClassNameForAnimation('')
                    setIsClicked(previous => false)
                }, 1000)
            } else {
                console.log('hello')
                onClick(id)
                setIsClicked(previous => true)
                setClassNameForAnimation('animate__bounceIn')
                setTimeout(() => {
                    setClassNameForAnimation('')
                    setIsClicked(previous => false)
                }, 1000)
            }
        }
    }

    return (
        <div id={'' + id} className={"tictactoe-cell " + (win ? "tictactoe-wincells" : "")} onClick={() => {handleClick()}}>
            <div className={"animate__animated " + classNameForAnimation}>
                {value}
            </div>
        </div>
    )
}