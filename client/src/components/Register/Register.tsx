import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator, { validateForms } from "../../helpers/validateForm";
import { CreateUser } from "../../redux/actions/user";
import { State } from "../../redux/reducers";
import Form from "../form/Form";
import { useNavigate } from "react-router";

import swal from "sweetalert";


import { setPage } from "../../redux/actions/setPage";

interface Inputs {
  name: string;
  lastname: string;
  email: string;
  passUser: string;

}

const Register = (): JSX.Element => {
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user);
  const productsCart = useSelector((state: State) => state.cart.cart);  
  const navigate = useNavigate();

  const [inputs, setInputs] = useState<Inputs>({
    email: "",
    lastname: "",
    name: "",
    passUser: ""

  });
  const [error, setError] = useState<Inputs>({
    email: "",
    lastname: "",
    name: "",
    passUser: ""
   
 
  });

  useEffect(() => {   
    dispatch(setPage(0));
    return () => {
      dispatch(setPage(1));
    };

  }, []);


  const FormChange = (event: any) => {
    event.preventDefault();
    const errores = validator(error, event.target);
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
    setError(errores as Inputs);
  };

  const checkError = (prop: string): string => {
    return prop ? "form-control is-invalid" : "form-control";
  };

  const RegisterFetch = (event: any) => {
    event.preventDefault();
    const res = validateForms(error, inputs);

    if (res) {
      return alert(res);
    }
    const newUser = {
      name: inputs.name,
      surname: inputs.lastname,
      email: inputs.email,
      password: inputs.passUser  
    };
    if (!user) {
      dispatch(
        CreateUser(newUser, () => {
        })
      );
      swal({
        text: "Please check your inbox to validate your account.",
        icon: "success",
      })
      navigate("/login")
    }
  };



  const CreateOrder = () => { 
   console.log('Under construction');
   
  }

  
  return (
    <Form title="Register">
      <div className="div-data">
        <div>
          <input
            type="text"
            placeholder="Name..."
            name="name"
            onChange={FormChange}
            className={checkError(error.name)}
          />
          {error.name && <b className="invalid-feedback">{error.name}</b>}
        </div>
        <div>
          <input
            type="text"
            placeholder="LastName..."
            name="lastname"
            onChange={FormChange}
            className={checkError(error.lastname)}
          />
          {error.lastname && (
            <b className="invalid-feedback">{error.lastname}</b>
          )}
        </div>
        <div>
          <select
            className="form-select"
            id="select"
            name="countryId"
            onChange={FormChange}
          >
        
          </select>
        </div>
      </div>
      <div className="div-inputs">
        <div>
          <input
            type="email"
            placeholder="Email..."
            name="email"
            onChange={FormChange}
            className={checkError(error.email)}
          />
          {error.email && <b className="invalid-feedback">{error.email}</b>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password..."
            name="passUser"
            onChange={FormChange}
            className={checkError(error.passUser)}
          />
          {error.passUser && (
            <b className="invalid-feedback">{error.passUser}</b>
          )}
        </div>
      </div>
      <div className="form-log" >
    
      </div>
      <div className="text-center m-3">
        {validateForms(error, inputs).length ? (
          <button className="btn btn-primary button-links link-Router mx-2" disabled>
            Submit
          </button>
        ) : (
          <button
            className="btn btn-primary button-links link-Router mx-2"
            onClick={RegisterFetch}
          >
            Submit
          </button>
        )}
        <Link
          to="/login"
          className="btn btn-secondary link-Router button-links mx-2"
        >
          Login
        </Link>
      </div>

      <button
        className="btn btn-primary button-links link-Router mx-2"
        onClick={CreateOrder}
      >
        Keep buying
      </button>
    </Form>
  );
};

export default Register;
