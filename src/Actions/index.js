//action for generating all items property in store
export const updateallitems = (input) => {
  return {
    type:'UPDATE_ALLITEMS',
    data:input
  }
}

//action for adding item to cart
export const addtocart = (input) => {
  return {
    type:'ADDTO_CART',
    data:input
  }
}

//action for each item qty 
export const changeitemqty = (item, qty) => {
  return {
    type:'CHANGE_ITEMQTY',
    data:item,
    qty:qty
  }
}

//action for deleting item from cart
export const deleteitem = (item, index) => {
  return {
    type:'DELETE_ITEM',
    data:item,
    index:index
  }
}

//action for removing all items from cart
export const emptycart = () => {
  return {
    type:'EMPTY_CART'
  }
}

//action for moving items present in cart to purchaseitems
export const purchaseitems = () => {
  return {
    type:'PURCHASE_ITEM'
  }
}
