import React from 'react'
import ProductForm from '../../components/productForm'
import axios from 'axios'
import { toast } from 'react-toastify'

function AddProduct() {
    const initialValues = {
        name: "",
        imageSrc: "",
        imageAlt: "",
        price: "",
        color: "",
        type:"",
    }
    const handleSubmit = (values) => {
        axios
        .post('http://localhost:8000/products', values)
        .then((res)=>{
            toast.success('Successfully Added')
        })
        .catch(err=>{
            toast.error('Failed Adding Item')
        })
    }
  return (
    <ProductForm 
    initialValues={initialValues}
    onSubmit={handleSubmit}
    formType="add"
    />
  )
}

export default AddProduct