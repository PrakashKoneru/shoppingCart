import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Purchases from './Purchases';
import '../Styles/Home.css';
import { changeitemqty, deleteitem, emptycart, purchaseitems } from '../Actions/index'; 

// this Component will display items added to cart on the /cart Route
class Cart extends Component {
  generateOptions(input){
    let output= []
    for(let x=1; x<=input; x++){
      output.push(x);
    }
    return output.map((each)=><option key={each}>{each}</option>)
  }

  render(){
    if(this.props.cartitems && this.props.cartitems.length) {
      let totalamount = 0;
      this.props.cartitems.map((eachitem)=>{
        totalamount += eachitem.cartQty*eachitem.price;
      });
      return(
        <div className="CartContainer">
           <div className="Title">
            <h2>Cart Items</h2>
          </div> 
          <div className='Items'>
            {this.props.cartitems.map((eachitem, index)=>
              <div className="Item" key={index}>
                <div className="TopSection">
                  <div className="ItemImg">
                    <img src={eachitem.imgSrc} alt={eachitem.itemName}/>
                  </div>
                  <h4>{eachitem.itemName}</h4>
                  <span>{"price: $"+eachitem.price}</span>
                  <span>
                      <label htmlFor="Qty">Qty: </label>
                      <select id="Qty" 
                        value={eachitem.cartQty} 
                        onChange={(input)=>{this.props.changeitemqty(eachitem, input.target.value)}}>
                        {this.generateOptions(eachitem.quantityRemaining)}  
                      </select>
                  </span>
                  <span>{"Total: "+eachitem.cartQty*eachitem.price}</span> 
                </div>
                <div className="BottomSection">
                  <button type="button" onClick={()=>this.props.deleteitem(eachitem, index)} >Delete</button>
                </div>
              </div>
            )}
          </div>
          <div className='Summary'>
            <span>Total Amount: {totalamount}</span>
          </div>
          <div className='Summary'>
            <button type="button" onClick={() => this.props.emptycart()}>Empty Cart</button>
            <button type="button" onClick={() => this.props.purchaseitems()}>Buy</button>
          </div>
          <Purchases />
        </div> 
      )
    }

    if(this.props.purchaseditems) {
      return (
        <div className="CartContainer">
          <div className="Title">
            <h2>Cart is Empty</h2>
          </div>  
          <Purchases />
        </div>
      )
    }

    return (
      <div className="CartContainer">
        <div className="Title">
          <h2>Cart is Empty</h2>
        </div> 
        <div className="Title">
          <h2>No Purchases</h2>
        </div> 
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cartitems: state.cartitems,
    purchaseditems:state.purchaseditems
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeitemqty:(item, index) => { 
      dispatch(changeitemqty(item, index)) 
    },
    deleteitem:(item, index) => { 
      dispatch(deleteitem(item, index)) 
    },
    emptycart:() => {
      dispatch(emptycart())
    },
    purchaseitems:() => {
      dispatch(purchaseitems())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);


