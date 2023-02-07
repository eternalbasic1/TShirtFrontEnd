import React , {useState,useEffect}from 'react'
import {Navigate} from 'react-router-dom'
import { addItemToCart, removeItemFromCart } from './helper/cardHelper';
import ImageHelper from './helper/ImageHelper';

const Card = ({
    product,
    addtoCart = true,
    removeFromCart = false,
    setReload = f => f, //function(f){return f} anonymous function
    reload = undefined
  }) => {
   
    const [redirect, setRedirect] = useState(false);
    const [count,setCount] = useState(product.count);

    const cardTitle = product ? product.name : "A photo of pexels"
    const cardDescription = product ? product.description : "Default description"
    const cardPrice = product ? product.price : "Default"

    const addToCart = () => {
      addItemToCart(product, () => setRedirect(true))
    }
    const getRedirect = redirect => {
      if(redirect){
        return <Navigate to={"/cart"}/>
      }
    }

    const showAddToCart = (addtoCart) => {
        return (
            addtoCart && (
                <button
                onClick={addToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2 "
              >
                Add to Cart
              </button>
            )
        )
    } 

    const showRemoveToCart = (removeFromCart) => {
        return(
            removeFromCart && <button
            onClick={() => {
              removeItemFromCart(product._id);
              setReload(!reload);
              
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
        )
    } 

    return (
        <div className="card text-white bg-dark border border-info">
        <div className="card-header lead text-center fw-bold text-secondary ">{cardTitle}</div>
        <div className="card-body border-3">
            {getRedirect(redirect)}
            <ImageHelper product={product}/>
          <p className="lead bg-success font-weight-normal text-wrap text-center mt-1">
            {cardDescription}
          </p>
          <div className='text-center'>
          <p className="btn btn-success rounded btn-sm px-4">$ {cardPrice}</p>
          </div>
          <div className="row">
            <div className="d-grid col-12 ">
              {showAddToCart(addtoCart)}
            </div>
            <div className="d-grid col-12">
              {showRemoveToCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
         );
      
};

export default Card;
