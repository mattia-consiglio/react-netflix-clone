class API {
	constructor({ method = 'GET', callbackSuccess, callbackError, id = '', body = null }) {
		this.method = method
		this.callbackSuccess = callbackSuccess
		this.callbackError = callbackError
		this.id = id
		this.body = body
		this.request()
	}

	async request() {
		const options = {
			method: this.method,
			headers: {
				'Authorization':
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJiOWVhZTViMjYxNTAwMTk4YTY5NDYiLCJpYXQiOjE3MDczMTg1MzcsImV4cCI6MTcwODUyODEzN30.g8Q0Vz5DBvroTvo0CgjHhjrY0exSitDlfgTA29-HkZg',
			},
		}
		if (this.body) {
			this.body = JSON.stringify(this.body)
			console.log(this.body)
			options.body = this.body
			options.headers['Content-Type'] = 'application/json'
		}

		this.myUrl = 'https://striveschool-api.herokuapp.com/api/comments/'
		if (this.id !== '') {
			this.myUrl += `${this.id}`
		}

		return fetch(this.myUrl, options)
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText)
				}
				return response.json()
			})
			.then(data => {
				this.callbackSuccess(data, this.method)
			})
			.catch(err => {
				this.callbackError(err)
			})
	}
}
export default API
