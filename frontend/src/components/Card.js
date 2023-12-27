import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';


const Card = (props) => {
 
  let dispatch = useDispatchCart()
  let data = useCart();
  const priceRef = useRef()
  let options = props.options; 
  let priceOptions = Object.keys(options) // because option is in database value in 0
  
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  
  const handleAddToCart = async () => {
    let food = [];
    for(const item of data){
      if(item.id === props.foodItem._id){
        food = item;

        break;
      }
    }

    if(food != []){
      if(food.size === size){
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty
        })
        return
      }else if(food.size === size){
        await dispatch({
          type: "ADD", 
          id:props.foodItem._id, 
          name:props.foodItem.name,
          price:finalPrice,
          qty: qty,
          size: size
        })
        return
      }
      // console.log(data)
    }
      await dispatch({
        type: "ADD", 
        id:props.foodItem._id, 
        name:props.foodItem.name,
        price:finalPrice,
        qty: qty,
        size: size})
    
  }
  // final price 
  let finalPrice = size ? qty * parseInt(options[size]): 0;
  useEffect(() => {
  setSize(priceRef.current.value)
  }, [])

  return (
       <div>
      <div className="card mt-3" style={{"width": "16rem", "maxHeight": "36rem"}}>
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height: "12rem", objectFit: "fill"}} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100">
            <select className="m-2 h-100 rounded" 
            onChange={(e) => setQty(parseInt(e.target.value))}
            style={{"background" : "green"}} >
              {Array.from(Array(6), (e,i) =>{
                return(
                  <option key={i+1} value={i+1}>{i+1}</option>
                )
              })}
            </select>

            <select className="m-2 h-100 bg-success rounded"
            ref={priceRef} 
            onChange={(e) => setSize(e.target.value)}
            style={{"background" : "green"}}>
              {
                priceOptions.map((price) => {
                  return  <option key={price} value={price}>{price}</option>
                })
              }
            </select>
            <div className="d-inline h-100 fs-5">
              {finalPrice}/-
            </div>
            </div>  
            <hr>
            </hr>
            <button className='btn btn-success justify-center ms-2'
            onClick={handleAddToCart}
            style={{background: "green", color: "white"}}>Add to Cart</button>
        </div>
      </div>
      </div> 
  )
}

export default Card