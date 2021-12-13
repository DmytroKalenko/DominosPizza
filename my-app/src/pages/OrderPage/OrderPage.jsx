import "./OrderPage.scss";
import { useState, useEffect } from "react";
function OrderPage(props) {

    let productsOrdered = props.products;
    let [discountprice, setDiscountprice] = useState();
    let [delivery, setDelivery] = useState(false);
    let [newModalWindow, setNewModalWindow] = useState(false);
    let [formValidation, setValidation] = useState(
        {
            phone: false,
            email: false,
            customerName: false,
            privatPolitic: false,
        }
    );


    useEffect(() => {
        if (props.salePrice.length > 0) {
            setDiscountprice(props.salePrice[0].price.toFixed(2));
            document.querySelector('.total_price').classList.add('underline')
        }

    }, []);

    useEffect(() => {
        if (delivery) {
            document.querySelector('.takeInform_top .delivery').classList.add('active');
            document.querySelector('.takeInform_top .takeAway').classList.remove('active');
            document.querySelector('.takeInform_content img[alt="delivery"]').classList.add('active');
            document.querySelector('.takeInform_content img[alt="takeAway"]').classList.remove('active');
        } else {
            document.querySelector('.takeInform_top .delivery').classList.remove('active');
            document.querySelector('.takeInform_top .takeAway').classList.add('active');
            document.querySelector('.takeInform_content img[alt="delivery"]').classList.remove('active');
            document.querySelector('.takeInform_content img[alt="takeAway"]').classList.add('active');
        }


    }, [delivery])

    useEffect(() => {
        if (props.getStoreTakeAway.length > 0) {
            setDelivery(false);
            setNewModalWindow(true)
        }
        
    }, []);

    useEffect(() => {
    }, [newModalWindow]);
    //get time
    function getTime(min) {
        let nowTime = new Date()
        nowTime.setMinutes(nowTime.getMinutes() + min)

        let hours = nowTime.getHours()
        let minutes = nowTime.getMinutes()
        if (minutes < 10) {
            minutes = `0${nowTime.getMinutes()}`
        }
        if (hours < 10) {
            hours = `0${nowTime.getHours()}`
        }

        return `${hours}:${minutes}`
    };
    // showModalWindow
    const showModalWindow = () => {
        if (delivery) {
            props.setModalWindow("delivery")
        } else{
            props.setModalWindow("choose lokal")
        }
    }


    // cheack validationForm 
    function cheackValidate() {
        let flag = true;
        for (const key in formValidation) {
            if (!formValidation[key]) {
                flag = false;
            }
        }
        if (!flag) {
            alert("wymagane wypełnienie wszystkich pól oraz akceptacji polityki prywatności");
        } else {
            showModalWindow();
        }
    }

    return (
        <>
            <div className="order_page">
                <div className="order_page_top">
                    <img className="background" src="https://www.dominospizza.pl/DominosPizza/media/Images/modules/cartconfiguration/bg_1200x471.jpg" alt="dominos" />
                    <div className="takeInform">
                        <div className="takeInform_top">
                            <span className="delivery" onClick={() => {
                                setDelivery(true);
                                setNewModalWindow(false);
                            }}>Dostawa</span>
                            <span className="takeAway" onClick={() => {
                                setDelivery(false);
                                setNewModalWindow(true);
                            }}>Odbiór osobisty</span>
                        </div>
                        <div className="takeInform_content" >
                            <div className="content_item" onClick={() => {
                                setDelivery(true);
                                setNewModalWindow(false);
                            }} >
                                <img src="https://www.dominospizza.pl/getmedia/01a4fbdd-c165-40c9-882a-62ac87715f37/dominos_skuter.gif.aspx" alt="delivery" />
                                <span>Przybliżony czas dostawy:</span>
                                <span className="item_time">{getTime(25)}</span>
                            </div>

                            <div className="content_item" onClick={() => {
                                setDelivery(false)
                                setNewModalWindow(true);
                            }}>
                                <img src="https://www.dominospizza.pl/getmedia/d6c4e4a2-f52a-45a1-b3bc-c7da00e4f58f/odbior_osobisty.gif.aspx" alt="takeAway" />
                                <span>Przybliżony czas odbioru:</span>
                                <span className="item_time">{getTime(15)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="orderChoose">
                        <form action="">
                            <div>
                                <label htmlFor="pay">Płatność</label>
                                <select className="selects" name="pay" id="pay">
                                    <option value="cash">Gotówka</option>
                                    <option value="card">Karta (przy odbiorze) </option>
                                    <option value="online">Online</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="phone">Telefon*</label>
                                <input className="inputs" type="tel" name="phone" id="phone" onChange={(e) => {
                                    let label = e.target.previousElementSibling;
                                    let regulaExpression = /^[0-9]+$/;
                                    if ((regulaExpression.test(e.target.value)) && (e.target.value.length > 0)) {
                                        setValidation({ ...formValidation, phone: true });
                                        label.classList.remove('required')
                                    } else {
                                        label.classList.add('required');
                                        setValidation({ ...formValidation, phone: false });
                                    }
                                }} />
                            </div>
                            <div>
                                <label htmlFor="email">Email*</label>
                                <input className="inputs" type="email" name="email" id="email" onChange={(e) => {
                                    let label = e.target.previousElementSibling;
                                    let regulaExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                                    if ((regulaExpression.test(e.target.value)) && (e.target.value.length > 5)) {
                                        setValidation({ ...formValidation, email: true });
                                        label.classList.remove('required')
                                    } else {
                                        label.classList.add('required');
                                        setValidation({ ...formValidation, email: false });
                                    }

                                }} />
                            </div>
                            <div className="person">
                                <label htmlFor="persone">Imię odbiorcy*</label>
                                <input className="inputs" type="text" name="persone" id="persone" onChange={(e) => {
                                    let label = e.target.previousElementSibling;
                                    let regulaExpression = /[a-zA-Z]+$/;
                                    if ((regulaExpression.test(e.target.value)) && (e.target.value.length > 2)) {
                                        setValidation({ ...formValidation, customerName: true });
                                        label.classList.remove('required')
                                    } else {
                                        label.classList.add('required');
                                        setValidation({ ...formValidation, customerName: false });
                                    }
                                }} />
                            </div>
                            <div>
                                <p>Administratorem Twoich danych osobowych jest DP Polska S.A. z siedzibą w Warszawie, ul. Dąbrowieckiej 30.</p>
                                <div className="privatePolitic">
                                    <input type="checkbox" name="privatePolitic" id="privatePolitic" onChange={(e) => {
                                        if (e.target.checked) {
                                            setValidation({ ...formValidation, privatPolitic: true });
                                            e.target.nextElementSibling.classList.remove('required')
                                        } else {
                                            setValidation({ ...formValidation, privatPolitic: false });
                                            e.target.nextElementSibling.classList.add('required')
                                        }

                                    }} />
                                    <span>Akceptuję <a href="https://www.dominospizza.pl/getmedia/0846bb39-0f3f-4a8b-a858-831deb55035e/Regulamin_WWW_Dominos_Pizza.pdf" target="_blank">regulamin</a> serwisu Domino's Pizza </span>
                                </div>
                            </div>

                            <button className="solid" onClick={(e) => {
                                e.preventDefault();
                                cheackValidate()
                            }
                            }>Zamawiam z obowiązkiem zapłaty {props.totalPrice} zł</button>
                        </form>
                    </div>
                    <div className="takeContent">
                        <div className="content_item">

                        </div>
                        <div className="recapitulation">
                            <span className="recap_title">Podsumowanie</span>
                            <ul className="listProducts">
                                {productsOrdered.map((currentValue, index) =>
                                    <li key={index} className='choosedProduct'>
                                        <div className="aboutProduct">
                                            <span className="product_name"> {currentValue.name}</span>
                                            <span className="product_descrip">{currentValue.description}</span>
                                        </div>
                                        <span className="product_price">{currentValue.price} zł</span>
                                    </li>)
                                }
                            </ul>
                            <div className="total">
                                <span>suma</span>
                                <span className="total_price">{props.totalPrice} zł</span>
                            </div>
                            {props.salePrice.length > 0 ?
                                <div className="salePrice">
                                    <span className="discount">Zniżka {props.salePrice[0].coupon}</span>
                                    <span className="discountPrice">ze zniżką {discountprice} zł</span>
                                </div>
                                : null}


                        </div>
                    </div>
                </div>
            </div>
        </>
    )

};

export default OrderPage;