const state = {
	list:[]
}

const mutations = {
	ADD_TO_CART : (state, newItem) => {
		const isInCart = state.list.some(item => item.id === newItem.id)
		if(isInCart){
			
			state.list = state.list.map(item => (item.count = item.id === newItem.id ? ++item.count : item.count, item))
		}else{
			state.list.push({...newItem,count:1})
		}
	},
	INCREMENT_CARTITEM_COUNT: (state, id) => {
		
		state.list = state.list.map(item => (item.count = item.id === id ? ++item.count : item.count, item ))
	},
	DECREMENT_CARTITEM_COUNT: (state, id) => {
		state.list = state.list.map(item => (item.count = item.id === id && item.count > 1 ? --item.count : item.count, item ))
	},
	DELETE_CARTITEM:(state, id) => {
		state.list = state.list.filter(item => item.id !== id)
	},
	CLEAN_CART: state => state.list = []
}

const actions = {
	addToCart({commit}, item){
		commit('ADD_TO_CART',item)
	},
	incrementCartItemCount({commit}, id){
		commit('INCREMENT_CARTITEM_COUNT', id)
	},
	decrementCartItemCount({commit}, id){
		commit('DECREMENT_CARTITEM_COUNT', id)
	},
	deleteCartItem({commit}, id){
		commit('DELETE_CARTITEM', id)	
	},
	cleanCart({commit}){
		commit('CLEAN_CART')
	}
}

export default{
	namespaced: true,
	state,
	mutations,
	actions
	}
	

	