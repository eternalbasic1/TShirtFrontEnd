import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import { deleteProduct, getProducts } from './helper/adminapicall';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const {user,token} = isAuthenticated();

    const preload = () => {
        getProducts().then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setProducts(data);
            }
        })
    }

    useEffect(() => {
      preload();
    }, []);
    
    const deleteThisProduct = productId => {
        deleteProduct(productId,user._id,token).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                preload();
            }
        })
    }

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-md btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {products.length} products</h2>

          {products.map((product,index) => {
            return(<div key={index} className="row text-center mb-2 ">
            <div className="col-4">
              <h3 className="text-white text-left">{product.name}</h3>
            </div>
            <div className="col-4">
              <Link
                className="btn btn-success"
                to={`/admin/product/update/${product._id}`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button onClick={() => {
                deleteThisProduct(product._id) // Generally in onClick Method we can use as onClick ={deleteThisProduct()} In case we don't have any parameter inside but here we having a paramter productId to be passed we use arrow function as onClick{() => { deleteThisProduct(product._id)}} orelse things not gonna work in react 
              }} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>);

          })}
        </div>
      </div>
    </Base>
  )
}

export default ManageProducts;
