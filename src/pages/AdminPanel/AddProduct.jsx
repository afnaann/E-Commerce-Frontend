import React from 'react';
import ProductForm from '../../components/Modals/productForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AddNewProduct, fetchProducts } from '../../Redux/features/products/productsThunk';
import useAxios from '../../components/utils/useAxios';
function AddProduct({ setIsAdd }) {
    const dispatch = useDispatch()
    const api = useAxios()
    const initialValues = {
        name: "",
        image: "",
        price: "",
        stock: "",
        category: "",
    };

    const handleSubmit = (values) => {
        console.log(values)
        dispatch(AddNewProduct({api:api,values:values}))
        setIsAdd(false)
        // api
        //     .post('http://127.0.0.1:8000/products/post/', values,{
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     })
        //     .then((res) => {
        //         console.log(res)
        //         toast.success('Successfully Added');
        //         setIsAdd(false); 
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         toast.error('Failed Adding Item');
        //     });
    };

    return (
        
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
            <div className='bg-white rounded-lg p-8 shadow-lg'>
                <div className='flex space-x-60 place-items-center'>

                <h2 className='text-xl font-bold mb-4'>Add New Product</h2>
                <button 
                    onClick={() => setIsAdd(false)} 
                    className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 mb-4'
                    >
                    Close
                </button>
                    </div>
                <ProductForm 
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    formType="add"
                />
            </div>
        </div>
    );
}

export default AddProduct;
