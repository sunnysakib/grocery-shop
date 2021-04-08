import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './AddProduct.css'

const AddProduct = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [ imageUrl, setImageUrl ] = useState(null);
    const onSubmit = data => {
        console.log(data);
        const productData = {
            price: `$${data.price}`,
            name: data.name,
            imageUrl: imageUrl
        };
        
        console.log('product data', productData)
        const url = `https://salty-ravine-96873.herokuapp.com/addProduct`;
        fetch( url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify( productData )
        })
        .then( res => {
            console.log(res);
        })
    };
    
    const handleImageUpload = product => {
        const imageData = new FormData();
        imageData.set( 'key', '83d212ddc9482b93542178c210fd2a52' )
        imageData.append( 'image', product.target.files[0] )

        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setImageUrl(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input type = "text" name='name' defaultValue="" placeholder="Enter Product" {...register("name")} />
            <input type = "number" name='number' defaultValue="" placeholder="Enter Price" {...register("price")} />
            <br/>
           <input type = "text" name='wight' defaultValue="" placeholder="Enter Wight" {...register("wight")} />
           <input className = "imgBtn" type="file" onChange={handleImageUpload}/>
            <input className = "submitBtn" type="submit"/>
            </form> 
        </>
    );
};

export default AddProduct;