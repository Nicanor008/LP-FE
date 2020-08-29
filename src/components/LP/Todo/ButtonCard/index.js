import React from "react"
import "./buttonCard.scss"

const ButtonCard = ({ onclickSwapButton, viewByTodo }) => {
  return (
    <div className="buttonCardWrapper">
      <button className="buttonCard" onClick={onclickSwapButton}>
        {!viewByTodo ? `View By Todo name` : `View By Keywords`}
      </button>
    </div>
  )
}

export default ButtonCard
