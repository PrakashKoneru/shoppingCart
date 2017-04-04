import React, { Component} from 'react';
import { connect } from 'react-redux';

// this component will display all the items that user have purchased below the cart component on /cart route
class Purchases extends Component {
  render() {
    let purchases = this.props.purchaseditems;
    if(purchases) {
      return (
        <div>
          <div className="Title">
            <h2>Your Purchases</h2>
          </div>
          <div className='Items'> 
            {this.props.purchaseditems.map((eachitem, index)=>
              <div className="Item" key={index}>
                <div className="TopSection">
                  <div className="ItemImg">
                    <img src={eachitem.imgSrc} alt={eachitem.itemName}/>
                  </div>
                  <h4>{eachitem.itemName}</h4>
                  <span>{"price: $"+eachitem.price}</span>
                  <span>{"qty: "+eachitem.cartQty}</span>
                </div>  
              </div>
            )}
          </div>
        </div>
      )
    }

    return(
      <div className="Title">
        <h2>No Purchases</h2>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    purchaseditems:state.purchaseditems
  }
}

export default connect(mapStateToProps)(Purchases);

