import React, { useEffect, useState } from "react";
import Delete from "../../icons/Group 33150.png";
import Edit from "../../icons/Group 307.png";
import './ManageProduct.css'

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://salty-ravine-96873.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const deleteProduct = (id)=> {
      fetch(`https://salty-ravine-96873.herokuapp.com/delete/${id}`, {
        method: 'DELETE',
      })
      .then(res => res.json())
      .then(result => {
        console.log('delete successfully');
      })
  }

  return (
    <>
        <div class="d-flex justify-content-between productHeader">
                <p>Product Name</p>
                <p>Price</p>
                <p>Action</p>
        </div>
        <div>
          {products.map(product => (
            <div class="d-flex justify-content-between">
                <p>{product.name}</p>
                <p>{product.price}</p>
              <div>
                <img
                  style={{
                    height: "25px",
                    marginRight: "5px",
                    marginBottom: "10px",
                  }}
                  src={Edit}
                  alt=""
                />
                <img
                  onClick = {()=>deleteProduct(product._id)}
                  style={{ height: "25px", marginBottom: "10px", cursor: "pointer" }}
                  src={Delete}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
        
      </>
  );
};

export default ManageProduct;


