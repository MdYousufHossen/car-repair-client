import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navigation from './../../Shared/Navigation/Navigation';
import { useForm, Controller } from "react-hook-form";
import { Form } from 'react-bootstrap';
import image from '../../Images/login.jpg'
import icon1 from '../../Images/icon/google.png'
import icon2 from '../../Images/icon/facebook.png'
import icon3 from '../../Images/icon/github.png'

import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';


const Login = () => {
    const { userLogin, GoogleSignIn } = useAuth()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const location = useLocation()
    const navigate = useNavigate()
    const onSubmit = data => {
        userLogin(data.email, data.password, navigate, location)
        reset()
    };

    return (
        <div>
            <Navigation />

            <div className="row my-5">
                <div className="col-lg-6 d-none d-lg-block">
                    <img className="img-fluid" src={image} alt="" />
                </div>
                <div className="col-lg-6 purchase mx-auto ps-5 ">
                    <h2 className="mb-5 primary-color">Please Login</h2>

                    <form onSubmit={handleSubmit(onSubmit)} >
                        <Form.Label>Email address</Form.Label>
                        <i className="fa fa-user icon-1"></i>
                        <input className="form-control ps-5" type="email" defaultValue="" placeholder="Please write your email" {...register("email", { required: true })} />

                        <Form.Label>Password</Form.Label>
                        <i className="fas fa-lock icon-2"></i>
                        <input type="password" className="form-control ps-5 " placeholder="Please write your password" {...register("password", { required: true })} />



                        {errors.exampleRequired && <span>This field is required</span>}

                        <button className="btn btn-primary w-50 mx-auto  mt-5" type="submit" >Login</button>
                    </form>
                    <br /><br /><br />
                    <span className="fw-bold">Or sign in With</span>
                    <img onClick={GoogleSignIn} style={{ width: '35px', marginLeft: '10px' }} src={icon1} alt="" />
                    <img style={{ width: '35px', marginLeft: '10px' }} src={icon2} alt="" />
                    <img style={{ width: '35px', marginLeft: '10px' }} src={icon3} alt="" />

                    <br /> <br /><br />
                    <p>Not a member?<Link to="/register">Signup now</Link></p>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;