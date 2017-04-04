// this function is used to add and update 'Qty' property of item when it is added to cart
const updateHomeItemQty = (item, itemname, Qty) => {
  if(item.itemName === itemname && Qty) {
    return Object.assign({}, item, {Qty: Qty})
  }else if(item.itemName === itemname){
    if(item.Qty) {
      return Object.assign({}, item, {'Qty': item.Qty +=1})
    }else {
      return Object.assign({}, item, {'Qty': item.Qty =1})
    }
  }
  return item;
}

//this function will reset 'Qty' property of item when it is deleted from cart
const resetHomeItemQty = (item, itemname) => {
  if(item.itemName === itemname) {
    return Object.assign({}, item, {'Qty': 0})
  }
  return item;
}

//this function will create or update cartitems property when ever the new item is added to cart
const addtoCart = (cartItems=[], itemtoadd) => {
  if(cartItems.length>0) {
    let itemAlreadyinCart = false;
    cartItems.map((each) => {
      if(each.itemName === itemtoadd.itemName) {
        itemAlreadyinCart = true; 
        each.cartQty +=1;
        return Object.assign({}, itemtoadd, {'cartQty':each.cartQty})
      }
    })
    if(itemAlreadyinCart){
      return cartItems;
    }
  }
  return [...cartItems,Object.assign({}, itemtoadd, {'cartQty':1})]
}

/* this function will update 'cartQty' 
property(no of each item customer wants to buy) */
const cartItemQty = (item, itemname, Qty) => {
  if(item.itemName === itemname) {
    return Object.assign({}, item, {'cartQty': Qty})
  }
  return item;
}

//this function will delete item for cart
const deleteCartItem = (items, index) => {
  return [...items.slice(0,index),...items.slice(index+1)]
}

//this function will move all cart items to purchaseditems when user clicks buy button
const updatePurchasedItems = ( purchaseditems = [], cartitems) => {
  return [...purchaseditems, ...cartitems]
}

//this function will update quantityRemaining of items which user bought
const updateAllItemsRemainingQuantity = (allitems, cartItems) => {
  return allitems.map((eachitem) => {
    for(let x in cartItems){
      if(cartItems[x].itemName === eachitem.itemName) {
        return Object.assign({},eachitem,{'quantityRemaining':eachitem.quantityRemaining-eachitem.Qty, 'Qty':0})
      }
      return eachitem;
    }
  })
}


//this function contains whole logic for updating redux store whenever user performances any action
const allitems = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_ALLITEMS': 
      return Object.assign({}, state, {'allitems':action.data})

    case 'ADDTO_CART':
      return Object.assign({},state,{
        'allitems' : state.allitems.map((item) => updateHomeItemQty(item, action.data.itemName, undefined)),
        'cartitems': addtoCart(state.cartitems, action.data)
      })

    case 'CHANGE_ITEMQTY':
      return Object.assign({},state,{
        'allitems' : state.allitems.map((item) => updateHomeItemQty(item, action.data.itemName, parseInt(action.qty))),
        'cartitems': state.cartitems.map((item) => cartItemQty(item, action.data.itemName, parseInt(action.qty)))
      })

    case 'DELETE_ITEM':
      return Object.assign({},state,{
        'allitems' : state.allitems.map((item) => resetHomeItemQty(item, action.data.itemName)),
        'cartitems' : deleteCartItem(state.cartitems, action.index)
      })

    case 'EMPTY_CART':
      return Object.assign({}, state,{
        'allitems' : state.allitems.map((item) => resetHomeItemQty(item, item.itemName)),
        'cartitems':[]
      });

    case 'PURCHASE_ITEM':
      return Object.assign({}, state, {
        'allitems': updateAllItemsRemainingQuantity(state.allitems, state.cartitems),
        'purchaseditems': updatePurchasedItems(state.purchaseditems, state.cartitems),
        'cartitems':[]
      })

    default:
      return state;
  }
}

export default allitems;
