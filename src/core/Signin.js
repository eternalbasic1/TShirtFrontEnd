import React,{useState} from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { signin,authenticate, isAuthenticated } from '../auth/helper';
import Base from './Base';


const Signin = () => {
  
  const [values,setValues] = useState({
    email:"b@service.com",
    password:"12345",
    error:"",
    loading:false,
    didRedirect:false
  });

  const {email,password,error,loading,didRedirect} = values;
  const {user} = isAuthenticated();

  const handleChange = name => event => {
    setValues({...values,error:false, [name]: event.target.value});
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({...values, error:false, loading:true})
    signin({email,password})
    .then(data => {
      // console.log(data);
      if(data.error){
        setValues({...values,error:data.error,loading:false})
      }else{
        authenticate(data, ()=> {
          setValues({
            ...values,
            didRedirect:true
          })
        })
      }
    })
    .catch( error? console.log(`Error in Signin ${error}`):console.log("User Successfully signedin"));
  }

  const performRedirect = () => {
    if(didRedirect){
      if(user && user.role === 1){
        
        return <Routes><Route path="/" element={ <Navigate to = "/"/> } /></Routes>
        // return <p>redirect to admin</p>
      }else{
        return <Routes><Route path="/" element={ <Navigate to = "/"/> } /></Routes>
      
        //return <>{redirect("http://localhost:3000/")}</> // <p>redirect to userdashboard</p>
      }
     }
    // if(isAuthenticated()){
    //   return redirect("/");
    // }
  }

  const loadingMessage = () => {
    return (
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    )
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
  
  const signInForm = () => {
    return (
      <div className='row'>
        <div className="col-md-6 offset-sm-3 text-left ">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input value = {email} onChange={handleChange("email")}  className="form-control"  type="email"/>
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input value = {password} onChange={handleChange("password")}  className="form-control" type="password"/>
            </div>
            <button onClick={onSubmit} className="btn btn-success w-100 d-block mt-2">Submit</button>
          </form>
        </div>
      </div>
    )
  };

  return (
    <Base  title='SignIn' description='Sign-up today and get a FLAT 33% Discount'>
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className='text-white text-center'>{JSON.stringify(values)}</p>
    </Base>
   
  )
}

export default Signin;