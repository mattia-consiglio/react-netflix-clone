import React, { Component } from 'react'
import MyNavbar from './MyNavbar'
import TVShows from './TVShows'
import Footer from './Footer'

class HomePage extends Component {
	componentDidMount() {
		document.body.dataset.bsTheme = 'dark'
	}
	render() {
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
}

export default HomePage
