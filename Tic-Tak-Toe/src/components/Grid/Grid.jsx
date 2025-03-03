import React, { useState } from 'react'
import "./Grid.css"
import Card from '../cards/Card'

const Grid = ({numberofCards}) => {
    const [board,setBoard]=useState(Array(numberofCards).fill(""))
  return (
    <div className="grid">
      {board.map((ele,idx)=><Card key={idx} />)}
    </div>
  )
}

export default Grid
