export const state = () => ({
  menu: [],
  hotSearch: []
})

export const mutations = {
	setMenu (state, val) {
		state.menu = val;
	},
	setHotSearch (state, val) {
		state.hotSearch = val;
	}
}

export const actions = {
	setMenu ({commit}, menu) {
		commit('setMenu', menu)
	},
	setHotSearch ({commit}, hotSearch) {
		commit('setHotSearch', hotSearch)
	}
}