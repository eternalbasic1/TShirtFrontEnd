import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper';
import Base from './Base';

const Signup = () => {

  const [values,setValues] = useState({
    name:"",
    email:"",
    password:"",
    error:"",
    success:false
  });

  const {name,email,password,error,success} = values;

  const handleChange = name => event => {
    setValues({...values,error:false, [name]: event.target.value});
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({...values,error:false});
    signup({name,email,password})
    .then( data => {
      //console.log(data);
      // if(data.err){
      //   console.log( "Error working in signup form new one" );
      //   console.log(typeof(data.err));
      //   setValues({...values, error: data.err, success:false})
      // }
      if(data.errors || data.err){
        const errorValue = data.errors || data.err
        //console.log( "Error working in signup form" );
        setValues({...values, error: errorValue, success:false})
      }else{
        setValues({
          ...values,
          name:"",
          email:"",
          password:"",
          error:"",
          success:true
        });
      }
    })
    .catch(
      error? console.log(`Error in Signup ${error}`):console.log("User Successfully signed Up")
      );
    
  }

  const signUpForm = () => {
    return (
      <div className='row'>
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input 
              disabled={success}
              className="form-control" 
              onChange={handleChange("name")}
              value={name}
               type="text"/>
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input 
              disabled={success}
              className="form-control"  
              onChange={handleChange("email")}
              value={email}
              type="email"/>
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input 
              disabled={success}
              className="form-control"
              onChange={handleChange("password")}
              value={password}
              type="password"/>
            </div>
            <button disabled={success} onClick={onSubmit} className="btn btn-success w-100 d-block mt-2">Submit</button>
          </form> 
        </div>
      </div>
    )
  }

  const successMessage = () => {
    return (
    <div className='row'>
      <div className="col-md-6 offset-sm-3 text-left">
        <div
        className="alert alert-success"
        style={{display: success ? "" : "none"}}
        >
          New Account was created Successfully. Please <Link to= "/signin"> Login Here </Link>
        </div>
      </div>
    </div>
    )
  };

  const errorMessage = () => {
    return (
    <div className='row'>
      <div className="col-md-6 offset-sm-3 text-left">
        <div
        className="alert alert-danger"
        style={{display: error ? "" : "none"}}
        >
        {error}
        </div>
      </div>
    </div>
    )
  };



  return (
    <Base  title='SignUp' description='Sign-up today and get a FLAT 33% Discount'>
      {errorMessage()}
      {successMessage()}
      {signUpForm()} 
      {/* we have parenthises here and in button tag above onSubmit doesn't have it  because here in {signUpForm()} we want to fire up the code immediately without waiting of anything but above in {onSubmit} with () means just wait for some event or some time  */}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
   
  )
}

export default Signup