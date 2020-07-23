import React from 'react' 

const CardsTodo = (props) => {
    return (
        <div className="cards">
            <center>
              <img src={props.image} alt="props.imageAlt" />
              <br />
              <h2 className="cardTitle">{props.title}</h2>
            </center>
            <p>
              {props.description}
            </p>
          </div>
    )
}

export default CardsTodo
