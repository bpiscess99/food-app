import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { add, update } from '../redux/slices/cartSlice';


const Card = (props) => {
 
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const priceRef = useRef();
  const options = props.options;
  const priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")

  const handleAddToCart = async () => {
    const existingItem = cart.find((item) => item.id === props.foodItem._id);

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        qty: existingItem.qty + qty,
        price: existingItem.price + qty * parseInt(options[size]),
      };

      dispatch(update({ id: props.foodItem._id, updatedItem }));
    } else {
      dispatch(
        add({
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: qty * parseInt(options[size]),
          qty,
          size,
        })
      );
    }
  };

  const finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, [size]); // Update size when the size changes

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