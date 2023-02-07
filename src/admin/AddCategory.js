import React,{useState} from 'react'
import {  Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {
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

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        // Backend request fired
        createCategory(user._id, token, {name}) // Not Directly name but we use as {name}(LIKE A OBJECT) because it should be JSON.stringfy later in body of post 
        .then(data => {
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
            return alert(`Created Category Successfully`);

        }
    }

    const WarningMessage = () => {
        if(error){
            //return <h4 className='text-warning'>Failed to Create Category</h4>

            return alert(`Failed to create Category`);

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
                <button onClick={onSubmit} className="btn btn-outline-info">Create Category</button>
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

export default AddCategory;