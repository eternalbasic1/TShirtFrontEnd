import React, { useState, useEffect } from 'react'
import { Link, useParams} from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import "../styles.css"
import { getCategories, getProduct, updateProduct } from './helper/adminapicall'



const UpdateProduct = (props) => {
  
  let {productId} = useParams();

  const {user, token} = isAuthenticated();
  // const {success, setSuccess} = useState(false);
  const [values, setValues] = useState({
    name:"",
    description:"",
    price:"",
    stock:"",
    photo:"",
    categories:[],
    category:"",
    loading:false,
    error:"",
    createdProduct:"",
    getRedirect:false,
    formData:""
  });

  const preload = ({productId}) => {
    //TODO: there is a bug over here
    //console.log('Next checkpoint',productId)
    getProduct(productId).then(data => {
      // console.log('The Data is',data);
      if(data.error){
        setValues({...values,error:data.error});
      }else{
        preloadCategories();
        setValues({
          ...values,
          name:data.name,
          price:data.price,
          description:data.description,
          category:data.category._id,
          stock:data.stock,
          formData: new FormData(),
        });
      }
    });
  };

  const preloadCategories = () => {
    getCategories().then(data => {
      if(data.error){
        setValues({...values,error:data.error});
      }
      else{
        setValues({
          categories:data,
          formData: new FormData()
        });
      }
    });
  }

  useEffect(() => {
   // console.log('product ID is ', productId)
   preload({productId});
  }, [])


  

  const {name,description,price,stock,categories,category,loading,error,createdProduct,getRedirect,formData} = values;

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({...values, [name]:value});
  }

  const successMessage = () => {
    return (
      <div className='alert alert-success mt-3 '
      style={{display: createdProduct ? "" : "none"}}
      >
        <h4>{createdProduct} Updated Successfully</h4>
      </div> 
      )
}

  const errorMessage = () => {
    
    // setSuccess(true);
    return (<div className='alert alert-warning mt-3 '
    style={{display: error ? "" : "none"}}
    >
      <h4>{error}</h4>
    </div>) 
}

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values,error:"",loading:true});


    updateProduct(productId,user._id, token, formData).then(data => {
      if (data.error){
        setValues({...values,error: data.error,getRedirect:false});
      }else{
        setValues({...values,
        name:"",
      description:"",
      price:"",
      stock:"",
      error:"",
      loading:false,
      createdProduct: data.name,
      getRedirect:true,

    });
    setTimeout(() => {
      window.location.href = '/';
    },1000);
      }
    })
    
  }


  const createProductForm = () => (
    <form >
      <span ><h5>Post Photo</h5></span>
      <div className="form-group m-2">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group m-2">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group m-2">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group m-2">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group m-2">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories && 
          categories.map((cate, index) => (
            <option key={index} value={cate._id}>{cate.name}</option>
          ))
          }
        </select>
      </div>
      <div className="form-group m-2">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="stock"
          value={stock}
        />
      </div>
      
      <button type="submit" onClick={onSubmit} className="btn btn-outline-success m-2">
        Update Product
      </button>
    </form>
  );



  
  
  return (
    <Base
    title='Add a Product here!'
    description='Welcome to product creation section'
    className='container bg-info p-4'
    >
      <Link to='/admin/dashboard' className='btn btn-md btn-dark mb-3'>
        ⬅ Admin Home
      </Link>
      <div className="row bg-white text-black rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  )
}

export default UpdateProduct;