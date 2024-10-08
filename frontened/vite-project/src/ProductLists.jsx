import Product from './Product';
import { useEffect, useState } from 'react';
import ProductsData from'./data.js';
import axios from 'axios';
axios.defaults.baseUrl = 'http://localhost:8000';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZ21haWwuY29tIiwiaWF0IjoxNjc2NDkzNTI4fQ.VNWQDQJM9jDXrGofVLk3brpqlcNwFzjDmLLwfP9Rw4TM20IIuayvzubPJPfrkJb4kcRAUchdg7uy36rf9z-n9eLdcCw6FQLBBP7t0IA0NhFwjc0NjsJ50zUFgqPi8TAeVclD3DpjEoIRGbSrJpeVIBnLy6DeY7NcugJRbzKpW7iVq9WR9hO-mJ9n01zzEs3xJZ9Kyvq0dir680qPAtEdqLIvPstK8tDRNoYwcZXUthxSoDEAf-sp-E1qbuVv1WDlNpmBncWcUKFUgxeAuoFKRaYOy-9xrATE33C3wUW26Q9nUWJjDHiDw_Oe695P1UpTsKntGAWI_ECytTZhlA_pug';

const ProductList = () => {
  const [products, setProducts] = useState([ProductsData]);
  const [total, setTotal] = useState(0);

  const getProducts = async () => {
    const res = await axios.get('http://localhost:8000/api/products');
    console.log(res.data);
    setProducts(res.data);
    // setTotal(res.data.length)
  };

  const handleClick = async (id) => {
    const res = await axios.delete(`http://localhost:8000/api/products/${id}`);
    console.log(res.data);
    if (res.data._id) {
      setProducts(products.filter((p) => p._id !== res.data._id));
    }
    // setProducts(res.data);
  };
  const handlePage = async (page) => {
    const res = await axios.get('http://localhost:8000/api/products?page='+page);
    console.log(res.data);
    setProducts(res.data);
  };
  const handleSort = async (e) => {
    const [field, order] = e.target.value.split(':');
    try {
      const res = await axios.get(`http://localhost:8000/api/products?sort=${field}&order=${order}`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error sorting products:", error);
    }

  };
  useEffect(() => {
    getProducts();
  }, []);


  return (
    <>
     {/* <select onChange={handleSort}>
      <option value="price:desc">Price High to Low</option>
      <option value="price:asc">Price Low to High</option>
      <option value="rating:desc">Rating High to Low</option>
      <option value="rating:asc">Rating Low to High</option>


     </select> */}
    

      {Array(Math.ceil(total / 4))
        .fill(0)
        .map((e, i) => (
          <button onClick={() => handlePage(i + 1)}>{i + 1}</button>
        ))}
      {products.map((product, index) => (
        <Product {...product} key={index} handleClick={handleClick}></Product>
      ))}
       {/* Pagination buttons (for illustration purposes) */}
       {/* <div>
        <button onClick={() => handlePage(1)}>Page 1</button>
        <button onClick={() => handlePage(2)}>Page 2</button>
      </div> */}
    </>
  );
};

export default ProductList;