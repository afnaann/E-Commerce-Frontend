import React, { useContext, useEffect } from "react";
import {  useFormik } from "formik";
import * as Yup from "yup";

import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchCart } from "../../Redux/features/cart/cartThunk";
import MainContext from "../../context/context";
import { jwtDecode } from "jwt-decode";
import useAxios from "../../components/utils/useAxios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, user, setAuthTokens } = useContext(MainContext);
  const logged = localStorage.getItem("authTokens");
  const dispatch = useDispatch();
  const api = useAxios()

  useEffect(() => {
    if (logged) {
      navigate("/");
      toast.success("You Already Logged In!");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is Required"),
      password: Yup.string()
        // .min(8, "Password must be at least 8 characters")
        // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        // .matches(/[0-9]/, "Password must contain at least one number")
        .required("Password is Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/users/login/",
          values
        );
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        setAuthTokens(response.data);
        const den = jwtDecode(response.data.access);
        setUser(den);
        toast.success("Successfully Logged In!");

        if (den.staff_status) {
          navigate("/admin");
        } else {
          dispatch(fetchCart({userId:den.user_id,api:api}));
          navigate("/");
        }
      } catch (err) {
        if (err.response.data.non_field_errors){
          toast.warning(err.response.data.non_field_errors[0])
        }
        else{
          toast.error('Invalid Credentials!')
        }
        
      }
    },
  });

  return (
    <div className="h-screen  bg-cover bg-center  w-full flex justify-center items-center gradient">
      <div className="bg-white/10 backdrop-blur-md px-8 py-6 shadow-2xl rounded-xl lg:px-16">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <h1 className="text-2xl text-center">LOGIN!</h1>

          <div>
            <div className="flex">
              <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email:{" "}
              </label>
            </div>
            <input
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="mt-1 text-sm text-orange-600">
                {formik.errors.email}
              </p>
            ) : null}
          </div>
          <div>
            <div className="flex">
              <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password:{" "}
              </label>
            </div>
            <input
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="mt-1 text-sm text-orange-600">
                {formik.errors.password}
              </p>
            ) : null}
          </div>

          <div className="flex justify-center mt-1">
            <button
              type="submit"
              className="bg-white hover:bg-blue-100 text-black font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
          <div>
            <p className="text-gray-500">
              Don't Have an Account?
              <span
                className="text-red-500 hover:cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Go to Signup
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
