import React, { useContext } from "react";
import { ErrorMessage, useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import myContext from "../components/context";

// import './Registation';
const Login = () => {
  const navigate = useNavigate();
  const {isLoggedIn, setLoggedIn} = useContext(myContext);

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
    onSubmit: (values) => {
      console.log(values);
      axios.get("http://localhost:8000/users/")
      .then((result) => {
        const resp = result.data

        const user = resp.find(
          (user)=> user.email === values.email && user.password === values.password
        );
          if (user) {
            toast.success("Login Successful!");
            setLoggedIn(true)
            navigate("/");
          } else {
            toast.error("INVALID CREDENTIALS !");
          }
        });
     },
    });

  return (
    <div className="h-screen bg-indigo-50 w-full flex justify-center items-center">
      <div className="bg-indigo-100 px-8 py-6 shadow-xl rounded-xl lg:px-16">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <h1 className="font-medium">LOGIN!</h1>

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
                className="text-black"
                onClick={() => navigate("/registration")}
              >
                {" "}
                Go to Signup
              </span>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
