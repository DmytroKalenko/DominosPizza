import './Styles/Header.scss'


function Header(props){

    return(
        <>
        <header>
            <img className="logo" src="https://www.dominospizza.pl/getmedia/79f93de9-efbb-4c66-b3e6-191159e89dd0/dominos_logo.svg" alt="dominospizza" height='33' width='150'/>    
            <div className="basket">
                <div className="total">{props.totalPrice}</div>
                <div className="salePrice">{props.salePrice[0] === undefined ? "": props.salePrice[0].price.toFixed(2)}</div>
                {/* <div className="countBasket">{props.countProducts}</div> */}
            </div>
        </header> 
        </>
    )
}
 export default Header;