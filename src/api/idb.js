export default {
	async initDB() {
		// Инициализация хранилища
		const request           = indexedDB.open("cards", 1);
		request.onupgradeneeded = e => {
			const db = e.target.result;
			// Init primary DB key
			db.createObjectStore("all_cards", {keyPath: "id"});
		}
		// Вызов hard-coded задач
		let cards               = [];
		await fetch("/cards.json")
			.then((res) => {return res.json()})
			.then((data) => {
				cards = data
			})
		request.onsuccess = e => {
			// Сохранение hard-coded задач в хранилище
			const db     = e.target.result;
			const tx     = db.transaction("all_cards", "readwrite");
			const aCards = tx.objectStore("all_cards")
			cards.map((card) => {
				aCards.add(card)
			})
		}
		request.onerror   = (e) => {
			console.log(`Error: ${e.target.error}`)
		}
	},
	async getCards() {
		// массив для передачи в vuex
		let sendCardsToVue = []
		const request      = indexedDB.open("cards", 1);
		request.onsuccess  = e => {
			const db          = e.target.result;
			const tx          = db.transaction("all_cards", "readonly");
			const get         = tx.objectStore('all_cards');
			const request     = get.openCursor();
			request.onsuccess = e => {
				// получение данных
				const cursor = e.target.result;
				if (cursor) {
					// сохранение данных в массив
					sendCardsToVue.push(cursor.value)
					cursor.continue()
				}
			}
		}
		return sendCardsToVue
	},
	// Добавление
	async addNewCard(card) {
		const request     = indexedDB.open("cards", 1);
		request.onsuccess = e => {
			// Сохранение новой задачи
			const db     = e.target.result;
			const tx     = db.transaction("all_cards", "readwrite");
			const aCards = tx.objectStore("all_cards")
			aCards.add(card)
		}
	},
	//  Перемещение
	async sortCards(id) {
		const request     = indexedDB.open("cards", 1);
		request.onsuccess = e => {
			const db          = e.target.result;
			const tx          = db.transaction("all_cards", "readwrite");
			const get         = tx.objectStore('all_cards');
			const request     = get.openCursor();
			request.onsuccess = e => {
				// получение данных
				const cursor = e.target.result;
				if (cursor) {
					const newStatus = cursor.value;
					// пересортировка
					switch (true) {
						case cursor.value.id === id && cursor.value.status === "created":
							newStatus.status = "in-work";
							cursor.update(newStatus)
							break;
						case cursor.value.id === id && cursor.value.status === "in-work":
							newStatus.status = "completed";
							cursor.update(newStatus)
							break;
						//	удаление при статусе "завершено"
						case cursor.value.id === id && cursor.value.status === "completed":
							cursor.delete(id)
							break;
						default:
							break;
					}
					cursor.continue()
				}
			}
		}
	},
	//Пересчет часов работы
	countHours(data) {
		const request     = indexedDB.open("cards", 1);
		request.onsuccess = e => {
			const db          = e.target.result;
			const tx          = db.transaction("all_cards", "readwrite");
			const get         = tx.objectStore('all_cards');
			const request     = get.openCursor();
			request.onsuccess = e => {
				// получение данных
				const cursor = e.target.result;
				if (cursor) {
					const timeSpend = cursor.value;
					const {hours, id} = data
					if (cursor.value.status === "in-work" && cursor.value.id === id) {
						timeSpend.timeSpend = hours;
						cursor.update(timeSpend)
					}
					cursor.continue()
				}
			}
		}
	},
	// Редактирование
	async editCards(card) {
		const request     = indexedDB.open("cards", 1);
		request.onsuccess = e => {
			const db          = e.target.result;
			const tx          = db.transaction("all_cards", "readwrite");
			const get         = tx.objectStore('all_cards');
			const request     = get.openCursor();
			request.onsuccess = e => {
				// получение данных
				const cursor = e.target.result;
				if (cursor) {
					const newCardData = cursor.value;
					if (cursor.value.id === card.id) {
						newCardData.title           = card.title;
						newCardData.description     = card.description;
						newCardData.author          = card.author;
						newCardData.dateOfCreation  = card.dateOfCreation;
						newCardData.dateOfWorkStart = card.dateOfWorkStart;
						newCardData.status          = card.status;
						newCardData.timeSpend       = card.timeSpend;
						cursor.update(newCardData)
					}
					cursor.continue()
				}
			}
		}
	},
	// Удаление
	async deleteCard(id) {
		const request     = indexedDB.open("cards", 1);
		request.onsuccess = e => {
			const db          = e.target.result;
			const tx          = db.transaction("all_cards", "readwrite");
			const get         = tx.objectStore('all_cards');
			const request     = get.openCursor();
			request.onsuccess = e => {
				const cursor = e.target.result;
				if (cursor) {
					if (cursor.value.id === id) {
						cursor.delete(id);
					}
					cursor.continue()
				}
			}
		}
	}
}


