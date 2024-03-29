import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const desc= "Apresentamos o Relógio Inteligente StellarTech XYZ Pro, o companheiro definitivo para seu estilo de vida ativo. Projetado com tecnologia de ponta e design elegante, este smartwatch está repleto de recursos para aprimorar sua rotina diária."

const ProductDisplay = ({item}) => {
    //console.log(item);
    const {name, id, price, seller, ratingsCount, quantity, img}= item;

    const [preQuantity,setQuantity]= useState(quantity);
    const [coupon, setCoupon]= useState("");
    const [size,setSize]= useState("Select Size");
    const [color,setColor]= useState("Select Color");

    const handleSizeChange= (e)=>{
        setSize(e.target.value);
    }
    const handleColor= (e)=>{
        setColor(e.target.value);
    }
    const handleDecrease= ()=>{
         if(preQuantity > 1){
            setQuantity(preQuantity-1)
         }
    }
    const handleIncrease= ()=>{
        setQuantity(preQuantity+1)

    }

    const handleSubmit= (e)=>{
        e.preventDefault();
        const product={
            id:id,
            img:img,
            name: name,
            price: price,
            quantity: preQuantity,
            size: size,
            color: color,
            coupon: coupon
        }
        //console.log(product)
        const existingCart= JSON.parse(localStorage.getItem("cart")) || [];

        const existingProductIndex= existingCart.findIndex((item)=>item.id=== id);

        if(existingProductIndex !== -1){
            existingCart[existingProductIndex].quantity += preQuantity;
        }
        else
        {
           existingCart.push(product);
        }

        //update local storage
        localStorage.setItem("cart",JSON.stringify(existingCart));

        //reset form fields
        setQuantity(1);
        setSize("Select Size");
        setColor("Select Color");
        setCoupon("");
    }
  return (
    <div>
        <div>
            <h4>{name}</h4>
            <p className='rating'>
            <i className='icofont-star'></i>
            <i className='icofont-star'></i>
            <i className='icofont-star'></i>
            <i className='icofont-star'></i>
            <i className='icofont-star'></i>
            <span>{ratingsCount}review</span>
            </p>
            <h4>${price}</h4>
            <h6>{seller}</h6>
            <p>{desc}</p>
        </div>

        {/* cart component */}
        <div>
            <form onSubmit={handleSubmit}>
            {/* sizing */}
                <div className='select-product size'>
                    <select value={size} onChange={handleSizeChange}>
                        <option>Select Size</option>
                        <option value="SM">SM</option>
                        <option value="MD">MD</option>
                        <option value="LG">LG</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                    <i className='icofont-rounded-down'></i>
                </div>
            {/* color */}
                <div className='select-product color'>
                    <select value={color} onChange={handleColor}>
                        <option>Select Color</option>
                        <option>Violet</option>
                        <option>Blue</option>
                        <option>Yellow</option>
                        <option>Indigo</option>
                        <option>Pink</option>
                    </select>
                    <i className='icofont-rounded-down'></i>
                </div>

                {/* cart plus minus */}
                <div className='cart-plus-minus'>
                   <div className='dec qtybutton' onClick={handleDecrease}>-</div>
                   <input className="cart-plus-minus-box" type="text" name="qtybutton" id="qtybutton" value=
                   {preQuantity} onChange={(e)=>setQuantity(parseInt(e.target.value,10))}/>
                   <div className='inc qtybutton' onClick={handleIncrease}>+</div>
                </div>

                {/* coupon field */}
                <div className='discount-code mb-2'>
                    <input type="text" placeholder='Enter Discount Code' onChange={(e)=>setCoupon(e.target.
                    value)}/>
                </div>

                {/* button section */}
                <button type='submit' className='lab-btn'>
                <span>Add to Cart</span>
                </button>
                <Link to="/cart-page" className='lab-btn bg-primary'>
                <span>Check Out</span>
                </Link>
            </form>
        </div>
    </div>
  )
}

export default ProductDisplay;