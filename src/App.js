import './assets/scss/app.scss'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './components/HomePage'
import ProfilePage from './components/ProfilePage'
import Account from './components/Account'
import { useState, useEffect } from 'react'
import MovieDetail from './components/MovieDetail'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

function importAll(r) {
	return r.keys().map(r)
}

const App = () => {
	const [images, setImages] = useState([])
	const [avatar, setAvatar] = useState('')
	const [profileName, setProfileName] = useState('Mattia')

	useEffect(() => {
		const images = importAll(require.context('./assets/imgs/avatars', false, /\.(png|jpe?g|svg)$/))
		const localSettings = localStorage.getItem('netflixSettings')
		const settings = { images, avatar: images[0], profileName }
		if (localSettings) {
			const parsedLocalSetting = JSON.parse(localSettings)
			settings.avatar = parsedLocalSetting.avatar
			settings.profileName = parsedLocalSetting.profileName
		}

		setImages(settings.images)
		setAvatar(settings.avatar)
		setProfileName(settings.profileName)
	}, [])

	useEffect(() => {
		localStorage.setItem('netflixSettings', JSON.stringify({ avatar, profileName }))
	}, [avatar, profileName])

	return (
		<BrowserRouter>
			<Routes>
				<Route exact path='/' element={<HomePage avatar={avatar} profileName={profileName} />} />
				<Route
					exact
					path='/profile'
					element={
						<ProfilePage
							avatar={avatar}
							setAvatar={setAvatar}
							images={images}
							profileName={profileName}
							setProfileName={setProfileName}
						/>
					}
				/>
				<Route path='/account' element={<Account avatar={avatar} profileName={profileName} />} />
				<Route
					path='/movie/:movieId'
					element={<MovieDetail avatar={avatar} profileName={profileName} />}
				/>
				<Route path='*' element={<h1>404</h1>} />
			</Routes>
			<Analytics />
			<SpeedInsights />
		</BrowserRouter>
	)
}

export default App
