import idb from '../../api/idb';
const state = {
	cards: []
};

const getters = {
	allCards: (state) => state.cards
}

const actions = {

	async fetchCards({commit}) {
		await fetch("/cards.json")
			.then((res) => {return res.json()})
			.then((data) => {
				commit('setCards', data)
			})
		idb.initDB()
	},
	async addCard({commit}, data) {
		commit('newCard', data)
	},

	async editCard({commit}, data) {
		commit('editCard', data)
	},
	async deleteCard({commit}, id) {
		commit('deleteCard', id)
	}
}

const mutations = {
	setCards:   (state, cards) => (state.cards = cards),
	newCard:    (state, card) => state.cards.unshift(card),
	editCard:   (state, edited) => {
		state.cards.map((card) => {
			if (card.id === edited.id) {
				let start = state.cards.indexOf(card);
				state.cards.splice(start, 1, edited);
			}
		})
	},
	deleteCard: (state, id) => {
		state.cards.map((card) => {
			if (card.id === id) {
				let start = state.cards.indexOf(card);
				state.cards.splice(start, 1);
			}
		})
	}
}

export default {
	state,
	getters,
	actions,
	mutations
};