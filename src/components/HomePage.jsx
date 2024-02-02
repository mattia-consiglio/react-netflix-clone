import React from 'react'
import MyNavbar from './MyNavbar'
import TVShows from './TVShows'
import Footer from './Footer'

function HomePage() {
	return (
		<>
			<header>
				<MyNavbar />
			</header>
			<main>
				<TVShows />
			</main>
			<footer>
				<Footer />
			</footer>
		</>
	)
}

export default HomePage
