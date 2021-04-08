import React, {  useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { userContext } from '../../App';
import './Product.css'


 const Products = (props) => {
    const {name, price, imageUrl} = props.product;
    const [orders, setOrders] = useState({}) 
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    // console.log(orders);
    
    // const history = useHistory();
    const handleBuy = () => {
        const product = props.product;
        const orders = {...loggedInUser, ...product}
        //  setOrders(product);
        fetch('https://salty-ravine-96873.herokuapp.com/orders', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(orders)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
        })

    }
    
    return (
       
            <div className="col-md-3 product">
            <img style={{ height:'140px'}} src={imageUrl} alt="" srcset=""/>
                    <p>{name}</p>
                    <div className='button d-flex justify-content-between align-items-center'>
                        <h5 className='d-flex align-items-center'>{price}</h5>
                        <button onClick={()=>handleBuy(props.product)} type="button" class="btn btn-success btn-sm">Buy Now</button>
                        
                    </div>
        </div>
        
    );
};

export default Products;