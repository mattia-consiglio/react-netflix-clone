import React, { useEffect } from 'react'
import MyNavbar from './MyNavbar'
import TVShows from './TVShows'
import Footer from './Footer'

const HomePage = ({ avatar }) => {
	useEffect(() => {
		document.body.dataset.bsTheme = 'dark'
	}, [])

	return (
		<div className='d-flex flex-column min-vh-100'>
			<header>
				<MyNavbar avatar={avatar} />
			</header>
			<main className='flex-grow-1'>
				<TVShows />
			</main>
			<footer>
				<Footer />
			</footer>
		</div>
	)
}

export default HomePage
