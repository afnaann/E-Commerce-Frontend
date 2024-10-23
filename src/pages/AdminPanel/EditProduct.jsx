import React, { useEffect, useState } from "react";
import ProductForm from "../../components/Modals/productForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../Redux/features/products/productsThunk";
import useAxios from "../../components/utils/useAxios";

function EditProduct({ id, setIsVisible }) {
  const [initialValues, setInitialValues] = useState(null);
  const dispatch = useDispatch()
  const api = useAxios()
  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/products/get/${id}/`)
        .then((res) => {
          setInitialValues({
            name: res.data.name,
            price: res.data.price,
            stock: res.data.stock,
            category: res.data.category, // Assuming it returns an ID
            image: res.data.Image_base64 ? res.data.Image_base64 : null, // Handle base64 image
          });
        })
        .catch((err) => {
          console.error("Error Fetching!",err);
        });
    }
  }, [id]);

  const base64ToFile = (base64, filename) => {
    if (!base64) {
      console.error("Base64 string is null or undefined");
      return null; // or handle the error as needed
    }
    
    const arr = base64.split(',');
    if (arr.length < 2) {
      console.error("Invalid base64 string format");
      return null; // or handle the error as needed
    }
  
    const mime = arr[0].match(/:(.*?);/);
    if (!mime) {
      console.error("MIME type is missing from base64 string");
      return null; // or handle the error as needed
    }
  
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
  
    return new File([u8arr], filename, { type: mime[1] });
  };
  
  
  
  const handleSubmit = (values) => {
    const formData = new FormData();
  
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("stock", values.stock);
    formData.append("category", values.category);
  
    if (values.image) {
      if (values.image instanceof File) {
        // New image uploaded
        formData.append("image", values.image);
      } else {
        // Existing base64 image
        const file = base64ToFile(values.image, "existing-image.jpg");
        if (file) {
          formData.append("image", file);
        } else {
          console.error("Failed to convert base64 to file.");
        }
      }
    } else {
      console.warn("No image provided, skipping image upload.");
    }
  
    api
      .patch(`http://127.0.0.1:8000/products/update/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Updated Product Successfully!");
        dispatch(fetchProducts())
        setIsVisible(false);

      })
      .catch((err) => {
        console.error(err);
        toast.error("Error Updating Data");
      });
  };
  
  

  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 fixed">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
          <button
            onClick={() => setIsVisible(false)}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 mb-4"
          >
            Close
          </button>
        </div>
        <ProductForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          formType="edit"
        />
      </div>
    </div>
  );
}

export default EditProduct;
