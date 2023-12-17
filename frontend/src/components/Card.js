import React from 'react'

const Card = (props) => {
  let options = props.options; 
  let priceOptions = Object.keys(options) // because option is in database value in 0
  return (
    <div>
       <div>
      <div className="card mt-3" style={{"width": "16rem", "maxHeight": "36rem"}}>
        <img src={props.img} className="card-img-top" alt="..." style={{height: "12rem", objectFit: "fill"}} />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <div className="container w-100">
            <select className="m-2 h-100 rounded" style={{"background" : "green"}} >
              {Array.from(Array(6), (e,i) =>{
                return(
                  <option key={i+1} value={i+1}>{i+1}</option>
                )
              })}
            </select>

            <select className="m-2 h-100 bg-success rounded" style={{"background" : "green"}}>
              {
                priceOptions.map((price) => {
                  return  <option key={price} value={price}>{price}</option>
                })
              }
            </select>
            <div className="d-inline h-100 fs-5">
              Total Price
            </div>
            </div>  
        </div>
      </div>
      </div> 
    </div>
  )
}

export default Card