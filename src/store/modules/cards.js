import idb from '../../api/idb';

const state = {
	cards: []
};
const actions = {
	async fetchCards({commit}) {
		idb.initDB()
		let promise = idb.getCards()
		// Получение заданий из IndexedDB
		await fetch(promise)
			.then(() => {return promise})
			.then((data) => {
				commit('setCards', data)
			})
	},
	async addCard({commit}, data) {
		commit('newCard', data)
		idb.addNewCard(data);
	},

	async manageCards({commit}, id) {
		idb.sortCards(id)
		commit('manageCards')
	},
	async countHours({commit}, data){
		idb.countHours(data);
		commit("countHours")
	},
	async editCard({commit}, data) {
		idb.editCards(data)
		commit('editCard', data)
	},
	async deleteCard({commit}, id) {
		idb.deleteCard(id)
		commit('deleteCard', id)
	}
}
const getters   = {
	allCards: (state) => state.cards
}
const mutations = {
	setCards:    (state, cards) => (state.cards = cards),
	newCard:     (state, card) => state.cards.unshift(card),
	editCard:    (state, edited) => {
		state.cards.map((card) => {
			if (card.id === edited.id) {
				let start = state.cards.indexOf(card);
				state.cards.splice(start, 1, edited);
			}
		})
	},
	deleteCard:  (state, id) => {
		state.cards.map((card) => {
			if (card.id === id) {
				let start = state.cards.indexOf(card);
				state.cards.splice(start, 1);
			}
		})
	},
	manageCards: state => state,
	countHours: state => state
}
export default {
	state,
	getters,
	actions,
	mutations
};