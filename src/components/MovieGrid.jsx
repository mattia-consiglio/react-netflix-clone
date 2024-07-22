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
	const [cardWidth, setCardWidth] = useState(0)
	const [step, setStep] = useState(0)
	const [stepIncrement, setStepIncrement] = useState(2)
	const [cardsInSlider, setCardsInSlider] = useState(0)
	const sliderBtnWidth = 57

	const navigate = useNavigate()

	const calculateCardWidth = () => {
		const card = document.querySelector('.movie-card')
		if (card) {
			const tmpCardWidth = card.offsetWidth
			setCardWidth(card.offsetWidth)
			const tmpCardsInSlider = Math.ceil((window.innerWidth - sliderBtnWidth * 2) / tmpCardWidth)
			setCardsInSlider(tmpCardsInSlider)
			setStepIncrement(tmpCardsInSlider)
		}
	}

	useEffect(() => {
		calculateCardWidth()
		window.addEventListener('resize', calculateCardWidth)
		return () => window.removeEventListener('resize', calculateCardWidth)
	}, [])

	useEffect(() => {
		calculateCardWidth()
	}, [movies])

	const getMovies = (page = 1) => {
		fetch(`https://www.omdbapi.com/?apikey=26df6b83&s=${encodeURIComponent(q)}&page=${page}`)
			.then(res => {
				if (!res.ok) {
					throw new Error('Network response was not ok')
				}
				return res.json()
			})
			.then(data => {
				setMovies([...movies, ...data.Search])
				setLoading(false)
			})
			.catch(err => {
				setError(true)
				setLoading(false)
			})
	}

	const updateStep = direction => {
		if (direction === 'prev') {
			if (Math.abs(step) + stepIncrement < movies.length) {
				setStep(step - stepIncrement)
			} else if (step + movies.length > 1) {
				console.log('entra')
				setStep((step + movies.length) * -1 + step + 1)
			} else {
				setStep(0)
			}
		}
		if (direction === 'next') {
			if (step < 0) {
				setStep(step + stepIncrement)
			}
		}
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
				<Row className='mx-4 bg-body px-3'>
					<Col>
						<h3>{title}</h3>
					</Col>
				</Row>
				<div className='position-relative slider-warpaper'>
					<button
						className='slider-btn prev-btn'
						onClick={() => updateStep('next')}
						style={{ display: step === 0 ? 'none' : 'flex' }}
					>
						<i className='bi bi-chevron-compact-left'></i>
					</button>
					<button className='slider-btn next-btn' onClick={() => updateStep('prev')}>
						<i className='bi bi-chevron-compact-right'></i>
					</button>
					<Row
						className='flex-nowrap gx-1 position-relative overflow-x-visible movies-warpaper'
						style={{ transform: `translateX(${step * cardWidth}px)` }}
					>
						{loading && <Loading className='loader' />}
						{!loading &&
							movies.map((movie, i) => {
								return (
									<Col
										key={movie.imdbID + i}
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
				</div>
			</Container>
		</section>
	)
}

export default MovieGrid
