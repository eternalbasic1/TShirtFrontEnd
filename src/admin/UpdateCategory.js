import React,{useEffect, useState} from 'react'
import {  Link, useParams } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getCategory, updateCategory } from './helper/adminapicall';

const UpdateCategory = (props) => {

    let {categoryId} = useParams();

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user,token} = isAuthenticated();

    const goBack = () => (
        <div className='mt-5'>
            <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )

    const handleChange = event => {
        setError("");
        setName(event.target.value)
    };

    
  const preload = ({categoryId}) => {
    //TODO: there is a bug over here
    //console.log('Next checkpoint',productId)
    getCategory(categoryId).then(data => {
      //console.log(data);
      if(data.error){
        setError(false);
      }else{
        setName(data.name);
      }
    });
  };

  useEffect(() => {
   // console.log('product ID is ', productId)
   preload({categoryId});
  }, [])







    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        // Backend request fired
        updateCategory(categoryId,user._id, token, {name}) // Not Directly name but we use as {name}(LIKE A OBJECT) because it should be JSON.stringfy later in body of post 
        .then(data => {
            //console.log("THE updateCategory data is ", data);
            if(data.error){
                setError(true)
            }else{
                setError("");
                setSuccess(true);
                setName("");
            }
        })
        .catch(console.log(error));
    }
    
    const SuccessMessage = () => {
        if(success){
            //return <h4 className='text-success'>Category created Successfully</h4>
            return alert(`Updated Category Successfully`);

        }
    }

    const WarningMessage = () => {
        if(error){
            //return <h4 className='text-warning'>Failed to Create Category</h4>

            return alert(`Failed to update Category`);

        }
    }


    const myCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Enter the category</p>
                <input
                 type="text"
                className=" form-control my-3"
                onChange={handleChange}
                value={name}
                autoFocus
                required
                placeholder='For Ex. Summer' />
                <button onClick={onSubmit} className="btn btn-outline-info">Update Category</button>
            </div>
        </form>
    )

  return (
    <Base title='Create a Category here' description='Add a new Category for new tshirts' className='"container bg-info p-4'>
        <div className="row bg-white rounded p-2">
            <div className="col-md-8 offset-md-2">
                {SuccessMessage()}
                {WarningMessage()}
                {goBack()}
                {myCategoryForm()} 
            </div>
        </div>
    </Base>
  )
}

export default UpdateCategory;