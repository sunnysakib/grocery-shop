import React, { useEffect, useState } from 'react';
import Products from '../Products/Products';

const Home = () => {
    const [products, setProducts] = useState([])
    useEffect(() =>{
        fetch("https://salty-ravine-96873.herokuapp.com/products")
        .then(res => res.json())
        .then(data =>setProducts(data))
    }, [])

    return (
        <div className="row justify-content-md-center">
            
            {
                products.map(product => <Products product = {product}></Products>)
            }
        </div>
    );
};

export default Home;