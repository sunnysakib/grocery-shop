import React, { useState } from 'react';
import AddProduct from '../AddProduct/AddProduct';
import ManageProduct from '../ManageProduct/ManageProduct';
import './Admin.css'

const Admin = () => {
    const [ showUi, setShowUi] = useState(true)
    console.log(showUi);
    
    
    const handleManage = () => {
        setShowUi(false)
    }
    const handle = () => {
        setShowUi(true)
    }

    return (
            <div class="row adminStyle">
                <div class="col-3 sidebar">
                    <h6 onClick = {handle}>Add Product</h6>
                    <h6 onClick = {handleManage}>Manage Product</h6>
                </div>
                <div class="col-9 adminProduct">
                   <div className = "addProduct">
                        {
                            showUi ? <AddProduct/> : <ManageProduct/>
                        }
                   </div>
                </div>
            </div>
    );
};

export default Admin;