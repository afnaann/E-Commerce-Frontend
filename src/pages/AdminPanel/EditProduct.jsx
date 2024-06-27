import React, { useEffect, useState } from "react";
import ProductForm from "../../components/productForm";
import axios from "axios";
import { toast } from "react-toastify";

function EditProduct({ id , setIsVisible}) {
  const [initialValues, setInitialValues] = useState(null);
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/products/${id}`)
        .then((res) => {
          setInitialValues(res.data);
        })
        .catch((err) => {
          console.log("Error Fetching!");
        });
    }
  }, [id]);

  const handleSubmit = (values) => {
    axios
      .patch("http://localhost:8000/products/" + id, values)
      .then((res) => {
    
        toast.success("Updated Product Successfully!");

      })
      .catch(() => {
        toast.error("Error Updating Data");
      });
    console.log(values);
  };
  if (!initialValues) {
    return <div>Loading...</div>;
  }
  return (
    <div className="relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute end-4 top-4 text-gray-600 transition hover:scale-150"
        >
          <span className="sr-only">Close cart</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <ProductForm
      
          initialValues={initialValues}
          onSubmit={handleSubmit}
          formType="edit"
        />
    </div>
    // <h2>editing Processing!</h2>
  );
}

export default EditProduct;
