import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let result = await fetch("http://localhost:5000/products",{
        headers:{
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      setProducts(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

   const deleteProduct=async(id)=>
    {
       // console.warn(id)
       let result = await fetch(`http://localhost:5000/product/${id}`,{
        method: "Delete",
        headers:{
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
       });
        result= await result.json()
        if(result){
            // alert ("record is deleted")
            getProducts();
        }
    }

    const searchhandle = async(event)=>{
      //console.warn(event.target.value)
      let key = event.target.value;
      if(key){
        let result = await fetch(`http://localhost:5000/search/${key}`, {
          headers:{
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
        });
        result = await result.json();
          if(result){
            setProducts(result)
  
          }

      }else{
          getProducts()
      }
     
    }

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input type="text" className="search-product-box" placeholder="Search Product"
      onChange={searchhandle} />
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Cperation</li>
      </ul>
      {
         products.length>0 ? products.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li><button onClick={()=>deleteProduct(item._id)}>Delete</button></li>
         {/* <Link to={"/update/10" + item._id}>Update</Link> */}
          <Link to={`/update/${item._id}`}>Update</Link>
        </ul>
      ) 
       ) : <h1>No result Found</h1>}
    </div>
  )
};

export default ProductList;




// Errorrs are Found , Not working properly
// import React, {useEffect, useState} from "react"

// const ProductList=() =>{
//     const [Products, setProducts] = useState([]);
//     useEffect(()=>{
//           getProducts();
//     },[])

//     const getProducts = async()=>{
//         let result = await fetch("https://localhost:5000/products");
//         result = await result.json();
//         setProducts(result);
//     }
//     console.warn("products",products);
//     return(
//         <div className="product-list">
//             <h1>Product List</h1>
//             <ul>
//                 <li>S. No</li>
//                 <li>name</li>
//                 <li>price</li>
//                 <li>category</li>
//                 <li>Company</li>
//             </ul>
//             {
//                 products.map((item,index)=>
//             <ul>
//                 <li>{index+1}</li>
//                 <li>{item.name}</li>
//                 <li>{item.price}</li>
//                 <li>{item.category}</li>
//                 <li>{item.Company}</li>
//             </ul>
                
//                 )

//             }
//         </div>
//     )
// }

// export default ProductList;