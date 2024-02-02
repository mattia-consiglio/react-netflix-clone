import React, { Component } from 'react'
import MyNavbar from './MyNavbar'
import TVShows from './TVShows'
import Footer from './Footer'

class HomePage extends Component {
	componentDidMount() {
		document.body.dataset.bsTheme = 'dark'
	}
	render() {
		console.log(this.props)
		return (
			<>
				<header>
					<MyNavbar isHome avatar={this.props.avatar} />
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
