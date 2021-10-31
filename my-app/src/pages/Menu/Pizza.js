import React from 'react';
import pizza from '../../data/pizza.json'
import '../Style/Pizza.scss'

import heart from '../../fonts/icons/heart.svg';
import heartHover from '../../fonts/icons/heart_hover.svg';

import Context from '../../Context';
import { ContextFavorit } from '../../Context';
import { useContext , useEffect, useState} from 'react';

import Bestseller from '../../fonts/icons/favourite.svg';
import New from '../../fonts/icons/new.svg';
import Hot from '../../fonts/icons/chili-pepper.svg';
import Vege from '../../fonts/icons/vegan.svg';
import axios from 'axios';


function Pizza() {


    let addPrice = useContext(Context);
    let addFavorit = useContext(ContextFavorit);


    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(10);


    useEffect(()=>{
        const getProducts = async()=>{
            setLoading(true);
            const respons = await axios.get('https://restcountries.com/v3.1/all');
            const respons2 = await axios.get('https://jsonplaceholder.typicode.com/todos')
            setProducts(respons.data);
            setLoading(false);

            console.log(respons.data);
            console.log(respons2.data);

        }
        getProducts()
    }, [])


    const lastProductIndex = currentPage * productsPerPage;
    const firstProductIndex = lastProductIndex - productsPerPage;
    const currentProduct = products.slice(firstProductIndex,lastProductIndex)
    
    const paginate = pageNumber => setCurrentPage(pageNumber)
    const nextPage = ()=>{setCurrentPage(prev => prev+1)}
    const prevPage = ()=>{setCurrentPage(prev => prev-1)}
    
    
    let card = pizza.map(function (elem) {
        return (
            <div className="card" key={elem.id} data-id={elem.id}>
                <div className="addToFavorit" onClick={(e) => {
                    let productFavorit = {
                        name: e.target.parentElement.nextElementSibling.nextElementSibling.firstChild.innerText,
                        img: e.target.parentElement.nextSibling.src,
                        description: e.target.parentElement.parentElement.children[4].innerText,
                        price: e.target.parentElement.nextElementSibling.nextElementSibling.lastChild.innerText,
                        classActive: true,
                        id: e.target.closest('.card').attributes['data-id'].value,
                    }
                    addFavorit(productFavorit)
                    e.target.parentElement.classList.toggle('Active');
                    alert('produkt zostal dodany do ulubionych')
                }}>
                    <img className="heart" src={heart} alt={heart} />
                    <img className="heartHover" src={heartHover} alt={heartHover} />
                </div>
                <img className='product__icon' alt={elem.name} src={elem.img} width="396" height="396" />
                <div className="product__title__wrapper">
                    <span className='product__title'>{elem.name}</span>
                    <span className='product__price'>{elem.price + ' zł'}</span>
                </div>
                <div className="infoTag">
                    {elem.sorte === "Bestseller" ? <img className="tagIcon" src={Bestseller} alt='Bestseller' width='25px' height='25px' /> : ""}
                    {elem.sorte === "New" ? <img className="tagIcon" src={New} alt='New' width='25px' height='25px' /> : ""}
                    {elem.sorte === "Hot" ? <img className="tagIcon" src={Hot} alt='Hot' width='25px' height='25px' /> : ""}
                    {elem.sorte === "Vege" ? <img className="tagIcon" src={Vege} alt='Vege' width='25px' height='25px' /> : ""}
                    <div className="tagIcon">{elem.sorte}</div>
                </div>
                <p className='product__logdescription'>{elem.logdescription}</p>
                <button className='outline' onClick={() => {
                    addPrice[0](elem.name, elem.img, elem.price, elem.logdescription, elem.sorte, 1);
                    alert('produkt zostal dodany do koszyka')
                    
                }}>+add to basket</button>
            </div>
        )
    });

  
    // create paginationButtoms 
    const pageNumbers = []

    for (let index = 1; index < Math.ceil(products.length/productsPerPage); index++) {
        pageNumbers.push(index)
        
    }

    return (
        <>

            <div className="pizza__page">
                <div className="banner">
                    <img src="https://www.dominospizza.pl/DominosPizza/media/Images/modules/menuBanners/mobile/600x240-pizza1.jpg" alt="pizza" width="1200" height="300" />
                    <h1>Pizza</h1>
                </div>
                {/* <div className="cards">{pizza.length>=10 ? console.log('www') :card}</div> */}
              
                {currentProduct.map(function (elem){
                    return (   
                    <li>{elem.flag}</li>
                      )
                    })
                }

                <ul className="pagination">
                 {
                   pageNumbers.map(number=>(
                       <li className="pagination_item" key={number}>
                           <button onClick={()=>{paginate(number)}}>{number}</button>
                       </li>
                   ))  
                 }

                </ul>
                 <button onClick={()=>{prevPage()}}>prev</button>
                 <button onClick={()=>{nextPage()}}>next</button>


            </div>
            
        </>
    )
}
export default Pizza;