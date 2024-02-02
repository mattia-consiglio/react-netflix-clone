import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Loading from './Loading'

export class MovieGrid extends Component {
	state = {
		movies: [],
		loading: true,
		error: false,
	}
	getMovies() {
		fetch('https://www.omdbapi.com/?apikey=26df6b83&s=' + encodeURIComponent(this.props.q))
			.then(res => {
				if (!res.ok) {
					throw new Error('Network response was not ok')
				}
				return res.json()
			})
			.then(data => {
				this.setState({
					movies: data.Search,
					loading: false,
				})
			})
			.catch(err => {
				this.setState({
					error: true,
					loading: false,
				})
			})
	}

	componentDidMount() {
		this.getMovies()
	}
	render() {
		const { title, className } = this.props
		return (
			<section className={className}>
				<Container>
					<Row>
						<Col>
							<h3>{title}</h3>
						</Col>
					</Row>
					<Row className='flex-nowrap gx-1 position-relative overflow-x-visible'>
						<div className='slider-btn prev-btn '>
							<i className='bi bi-chevron-compact-left'></i>
						</div>
						<div className='slider-btn next-btn'>
							<i className='bi bi-chevron-compact-right'></i>
						</div>
						{this.state.loading && <Loading className='loader' />}
						{!this.state.loading &&
							this.state.movies.map(movie => {
								return (
									<Col xs={6} md={4} lg={3} key={movie.imdbID} className='movie-card'>
										<img src={movie.Poster} alt={movie.Title} className='img-fluid' />
									</Col>
								)
							})}
					</Row>
				</Container>
			</section>
		)
	}
}

export default MovieGrid
