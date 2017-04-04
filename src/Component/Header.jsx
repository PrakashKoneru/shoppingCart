import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CartImg from '../Images/cart.svg';
import '../Styles/Header.css';

/* this will component will display website name 
    and no of items present in cart */
class Header extends Component {
  render() {
    return (
      <div>
        <nav className="Header">
          <div className="Title">
            <Link to="/">
              <h1>Shopify</h1>
            </Link>
          </div>
          <div className="MenuList">
            <Link to="/cart">
              <div className="Each">
                <img src={CartImg} alt="cart"/>
                <span >{this.props.cartitems && this.props.cartitems.length ? this.props.cartitems.length+' Items':'Empty'}</span>
              </div> 
            </Link>
          </div>
        </nav>
        {this.props.children}
      </div>
      
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cartitems: state.cartitems
  }
}

// connect function will provide access redux store
export default connect(mapStateToProps)(Header);
