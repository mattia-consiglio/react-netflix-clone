import './assets/scss/app.scss'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './components/HomePage'
import ProfilePage from './components/ProfilePage'
import Account from './components/Account'
import { Component } from 'react'
function importAll(r) {
	return r.keys().map(r)
}

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			images: [],
			avatar: '',
		}
	}

	componentDidMount() {
		const images = importAll(require.context('./assets/imgs/avatars', false, /\.(png|jpe?g|svg)$/))
		this.setState({ images, avatar: images[0] })
	}

	render() {
		console.log(this.state.images)
		return (
			<BrowserRouter>
				<Routes>
					<Route exact path='/' element={<HomePage avatar={this.state.avatar} />} />
					<Route
						exact
						path='/profile'
						element={
							<ProfilePage
								avatar={this.state.avatar}
								setAvatar={avatar => {
									this.setState(avatar)
								}}
							/>
						}
					/>
					<Route path='/account' element={<Account avatar={this.state.avatar} />} />
				</Routes>
			</BrowserRouter>
		)
	}
}

export default App
