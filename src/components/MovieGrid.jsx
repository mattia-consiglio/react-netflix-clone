import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'

const MovieGrid = ({ q, title, className }) => {
	const [movies, setMovies] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const navigate = useNavigate()

	const getMovies = () => {
		fetch('https://www.omdbapi.com/?apikey=26df6b83&s=' + encodeURIComponent(q))
			.then(res => {
				if (!res.ok) {
					throw new Error('Network response was not ok')
				}
				return res.json()
			})
			.then(data => {
				console.log(data)
				setMovies(data.Search)
				setLoading(false)
			})
			.catch(err => {
				setError(true)
				setLoading(false)
			})
	}

	const sanitizeInput = str => {
		return str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
	}
	useEffect(() => {
		getMovies()
	}, [])

	return (
		<section className={className}>
			<Container fluid className='p-0'>
				<Row className='ps-4 bg-body'>
					<Col>
						<h3>{title}</h3>
					</Col>
				</Row>
				<Row className='flex-nowrap gx-1 position-relative overflow-x-visible movies-warpaper'>
					<div className='slider-btn prev-btn '>
						<i className='bi bi-chevron-compact-left'></i>
					</div>
					<div className='slider-btn next-btn'>
						<i className='bi bi-chevron-compact-right'></i>
					</div>
					{loading && <Loading className='loader' />}
					{!loading &&
						movies.map(movie => {
							return (
								<Col
									key={movie.imdbID}
									xs={6}
									md={3}
									lg={2}
									style={{ maxWidth: '300px' }}
									className='movie-card d-flex align-items-center justify-content-center'
								>
									<img
										src={sanitizeInput(movie.Poster)}
										alt={sanitizeInput(movie.Title)}
										className='img-fluid rounded shadow'
										onClick={() => {
											navigate('/movie/' + movie.imdbID)
										}}
									/>
								</Col>
							)
						})}
				</Row>
			</Container>
		</section>
	)
}

export default MovieGrid
