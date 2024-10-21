import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ProductForm = ({ initialValues, onSubmit, formType }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/products/category/get/"
        );
        const formattedCategories = response.data.map((category) => ({
          value: category.id,
          label: category.name,
        }));
        setCategories(formattedCategories);
      } catch (error) {
        toast.error("Error fetching categories");
      }
    };
    getCategory();
    
    
  }, []);
  
  useEffect(()=> {
    if (formType === "edit") {
      formik.values.category = {
        value: initialValues.category.id,
        label: initialValues.category.name,
      };
    }
  },[initialValues,formType])


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name is too short")
        .required("Name is required"),
      image: Yup.mixed().required("Image is required"),
      price: Yup.number()
        .typeError("Must be a number")
        .required("Price is required"),
      stock: Yup.number()
        .typeError("Must be a number")
        .required("Stock is required"),
      category: Yup.object().shape({
        value: Yup.string().required("Category is required"),
        label: Yup.string().required("Category is required"),
      }),
    }),

    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        category: values.category.value,
      };
      onSubmit(formattedValues);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      encType="multipart/form-data"
      className="mx-auto h-fit p-10 bg-slate-100 shadow-xl"
    >
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Product Name
        </label>
        {formik.touched.name && formik.errors.name ? (
          <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
        ) : null}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        {formType === "edit" &&
          formik.values.image &&
          !(formik.values.image instanceof File) && (
            <div className="mb-3">
              <img
                src={`data:image/jpeg;base64,₹{formik.values.image}`}
                alt="Current Product"
                className="h-32 w-32 object-cover ml-32"
              />
            </div>
          )}
        <input
          type="file"
          name="image"
          id="floating_image"
          accept="image/*"
          onChange={(event) =>
            formik.setFieldValue("image", event.currentTarget.files[0])
          }
          onBlur={formik.handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        <label
          htmlFor="image"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {formType === "edit" ? "Change Image" : "Add Image"}
        </label>
        {formik.touched.image && formik.errors.image ? (
          <p className="mt-1 text-sm text-red-600">{formik.errors.image}</p>
        ) : null}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <label htmlFor="category" className="text-xs text-gray-500 ">
          Category
        </label>
        <Select
          id="category"
          name="category"
          options={categories}
          value={formik.values.category || null}
          onChange={(option) => formik.setFieldValue("category", option)}
          onBlur={formik.handleBlur}
          className="z-10 opacity-100 relative"
        />
        {formik.touched.category && formik.errors.category ? (
          <p className="mt-1 text-sm text-red-600">
            {formik.errors.category.label}
          </p>
        ) : null}
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="stock"
            value={formik.values.stock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="stock"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Stock
          </label>
          {formik.touched.stock && formik.errors.stock ? (
            <p className="mt-1 text-sm text-red-600">{formik.errors.stock}</p>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="price"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Price
          </label>
          {formik.touched.price && formik.errors.price ? (
            <p className="mt-1 text-sm text-red-600">{formik.errors.price}</p>
          ) : null}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
        >
          {formType === "edit" ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
