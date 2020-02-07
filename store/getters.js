const getters = {
	  cartTotalCount: state => {
	    return state.cart.list.reduce((total, item) => {
	      total += item.count
	      return total
	    }, 0)
	  },
	cartTotalPrice:  state =>  {
	  return state.cart.list.reduce((total, item) => {
		
		  total += item.count * item.price
		return total
	  }, 0)
	},
}

export default getters