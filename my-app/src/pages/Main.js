import '../Fonts.scss';
import './Style/Main.scss';
import React, { useState, useEffect } from 'react';
import Slider from "react-slick";

function Main(props) {
    const [lableValidation, setDataValidation] = useState('')
    const [inputValidation, setInputValidation] = useState(false)
    const [checkValidation, setCheckValidation] = useState(false)

    useEffect(() => {
    }, [lableValidation])
    useEffect(() => {
    }, [checkValidation])


    function checkValidateForm(e) {
        e.preventDefault()

        if (!inputValidation) setDataValidation("Invalid email address")
        else if (!checkValidation) setDataValidation("you gotta accept privat politic")
        else {
            setDataValidation("")
            alert('Form has been validat')
        }
    }

    function inputValidate(e) {
        let value = e.target.value
        if (value.includes("@") && value.includes(".") && value.length < 40 && value.length > 4) {
            setDataValidation('')
            setInputValidation(true)
        } else {
            setDataValidation('Invalid email address')
        }
    }

    function validateCheck(e) {
        setCheckValidation(e.target.checked);
    }


    // slick slider
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        nextArrow: <span className="slick-next slick-arrow"></span>,
        prevArrow: <span className="slick-prev slick-arrow"></span>
    };




    return (
        <>
            <div className="layout">
                <div className="containerFirst___item">
                    <div className="--content__item --first ">
                        <Slider className='slider' {...settings}>
                            <div className="slider__item">
                                <div>promocja</div>
                                <h2>2 pizze w cenie 1</h2>
                                <img src="https://www.dominospizza.pl/DominosPizza/media/Images/modules/small%20banners/desktop/1200x1130domin-page_1.jpg" alt="back to school" />
                            </div>

                            <div className="slider__item">
                                <div>promocja</div>
                                <h2>2 pizze w cenie 1</h2>
                                <img src="https://www.dominospizza.pl/DominosPizza/media/Images/modules/mainBanners/desktop/1200x1130_dominos-promo-3dominos-main.webp" />
                            </div>
                            <div className="slider__item">
                                <div>promocja</div>
                                <h2>2 pizze w cenie 1</h2>
                                <img src="https://www.dominospizza.pl/DominosPizza/media/Images/modules/mainBanners/desktop/1200x1130_dominos-promo-2dominos-main.webp" />
                            </div>
                            <div className="slider__item">
                                <div>promocja</div>
                                <h2>2 pizze w cenie 1</h2>
                                <img src="https://www.dominospizza.pl/DominosPizza/media/Images/modules/mainBanners/desktop/1200x1130_dominos-napojdominos-main.webp" />
                            </div>
                        </Slider>
                    </div>
                    <div className="--content__item --second">
                        <h2 className="item__title"> Masz ochot?? na pizz???</h2>
                        <div className="item__content_wrapper">
                            <div className="item__content">
                                <img src="https://www.dominospizza.pl/getmedia/01a4fbdd-c165-40c9-882a-62ac87715f37/dominos_skuter.gif.aspx" alt="delivery" />
                                <span>Gotowe ju?? w 30 minut</span>
                                <button className="solid" onClick={() => {
                                    props.setModalWindow("delivery")
                                }}>Zam??w z dostaw??</button>
                            </div>
                            <div className="item__content">
                                <img src="https://www.dominospizza.pl/getmedia/d6c4e4a2-f52a-45a1-b3bc-c7da00e4f58f/odbior_osobisty.gif.aspx" alt="takeAway" />
                                <span>Gotowe ju?? w 15 minut</span>
                                <button className="solid" onClick={() => {
                                    props.setModalWindow("takeaway")
                                }}> Zam??w z odbiorem</button>
                            </div>

                        </div>
                        <div className="contact">
                            <a href="tel:+48 22 209 00 00"><span className="icon icon__phone"></span> +48 22 209 00 00</a>
                        </div>
                    </div>
                </div>
                <div className="containerFirst___item --second">
                    <img className="newsletter__background" src="https://www.dominospizza.pl/DominosPizza/media/Images/modules/mainNewsletter/desktop/NEWbanner-glowna-dominos.webp" alt="" />
                    <div className="newsletter">
                        <h2 className="newsletter__title">Odbierz rabat -50% na drug?? pizz?? </h2>
                        <p className="newsletter__subtittle">Zapisz si?? do naszego newslettera i otrzymuj najlepsze promocje</p>

                        <form action="">
                            <input type="email" name="email" id="email" placeholder="enter you e-mail" onChange={inputValidate} />
                            <label htmlFor="email">{lableValidation}</label>
                            <div className="privatPolitic">
                                <input type="checkbox" name="privatPolitic" id="privatPolitic" onChange={validateCheck} />
                                <p>Wyra??am zgod?? na kontaktowanie si?? ze mn??, w tym na przesy??anie informacji handlowych i marketingowych o Pizza Domino???s od DP Polska S.A. z siedzib?? w Warszawie za po??rednictwem ??rodk??w komunikacji elektronicznej (e-mail), jak r??wnie?? wyra??am zgod?? na przetwarzanie w tym celu danych osobowych (adresu e-mail) przez DP Polska S.A. z siedzib?? w Warszawie. Podstaw?? prawn?? przetwarzania danych jest art. 6 ust. 1 lit. a) RODO. Przys??uguje mi prawo do cofni??cia zgody w dowolnym momencie bez wp??ywu na zgodno???? z prawem przetwarzania, kt??rego dokonano na podstawie zgody przed jej cofni??ciem.</p>
                            </div>
                            <button className="solid" type="submit" onClick={checkValidateForm} >Odbierz rabat</button>
                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}
export default Main;