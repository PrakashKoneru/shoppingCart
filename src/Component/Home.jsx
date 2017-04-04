import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {updateallitems, addtocart} from '../Actions/index';
import items from '../../store_items';
import '../Styles/Home.css';

/* this will component will display all items present in store_items.json on the /home Route*/
class Home extends Component {

  componentWillMount() {
    if(!this.props.allitems) {
      this.props.initialallitems(items);
    }
  }

  render() {
    if(this.props.allitems) {
      return (
        <div>
          <div className="Items">
            {this.props.allitems.map((eachitem, index) => 
              <div className="Item" key={index}>
                <div className="TopSection">
                  <div className="ItemImg">
                    <img src={eachitem.imgSrc} alt={eachitem.itemName}/>
                  </div>
                  <h4>{eachitem.itemName}</h4>
                  <span>{"price: $"+eachitem.price}</span>
                  <span>In Stock: {eachitem.Qty ? eachitem.quantityRemaining - eachitem.Qty : eachitem.quantityRemaining}</span>
                </div>
                <div className="BottomSection">
                  <button type="button" onClick={()=>this.props.addtochart(eachitem)} disabled={eachitem.Qty===eachitem.quantityRemaining}>{eachitem.Qty===eachitem.quantityRemaining ? 'sold out':'add to cart'}</button>
                </div>   
              </div>
            )}
          </div>
        </div>
        
      )
    }
    return(
      <div>
        <h2>Getting Data</h2>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
      allitems: state.allitems
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initialallitems:(input) => { 
      dispatch(updateallitems(input)) 
    },
    addtochart:(itemindex) => {
      dispatch(addtocart(itemindex))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
