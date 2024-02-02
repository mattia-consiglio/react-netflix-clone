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
			profileName: 'Mattia',
		}
	}

	componentDidMount() {
		const images = importAll(require.context('./assets/imgs/avatars', false, /\.(png|jpe?g|svg)$/))
		const localSettings = localStorage.getItem('netflixSettings')
		const settings = { images, avatar: images[0], profileName: this.state.profileName }
		if (localSettings) {
			const parsedLocalSetting = JSON.parse(localSettings)
			settings.avatar = parsedLocalSetting.avatar
			settings.profileName = parsedLocalSetting.profileName
		}
		this.setState(settings)
	}

	componentDidUpdate(prevState) {
		if (
			prevState.avatar !== this.state.avatar ||
			prevState.profileName !== this.state.profileName
		) {
			localStorage.setItem(
				'netflixSettings',
				JSON.stringify({ avatar: this.state.avatar, profileName: this.state.profileName })
			)
		}
	}

	render() {
		console.log(this.state)
		return (
			<BrowserRouter>
				<Routes>
					<Route
						exact
						path='/'
						element={<HomePage avatar={this.state.avatar} profileName={this.props.profileName} />}
					/>
					<Route
						exact
						path='/profile'
						element={
							<ProfilePage
								avatar={this.state.avatar}
								setAvatar={avatar => {
									this.setState({ avatar })
								}}
								images={this.state.images}
								profileName={this.state.profileName}
								setProfileName={profileName => {
									this.setState({ profileName })
								}}
							/>
						}
					/>
					<Route
						path='/account'
						element={<Account avatar={this.state.avatar} profileName={this.props.profileName} />}
					/>
				</Routes>
			</BrowserRouter>
		)
	}
}

export default App
