import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';

const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [checkout, setCheckout] = useState();
    useEffect(() =>{
        fetch('https://salty-ravine-96873.herokuapp.com/orders?email='+loggedInUser.email, {
            method: 'GET',
            headers: {'Content-Type': 'application/json',
            
            
        }
        })
        .then(res => res.json())
        .then(data => setCheckout(data));
    },[])
    return (
        <div>
           {
                checkout.map(order =>(<p>{order.name}</p>))
           }
            
        </div>
    );
};

export default Orders;