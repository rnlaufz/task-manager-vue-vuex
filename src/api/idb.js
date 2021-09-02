export default {
	async initDB(){
		const request = indexedDB.open("cards", 1);
		request.onupgradeneeded = e => {
			// @TO_DO: проверить наличие значений в базе данных
			const db = e.target.result;
			const allCards = db.createObjectStore("all_cards", {keyPath: "id"})

			console.log(allCards)
			console.log('upgradition...something')
		}
		request.onsuccess       = e => {
			const db = e.target.result;
			console.log('success')
		}
		request.onerror         = () => {
			console.log('error...')
		}

	}
}

