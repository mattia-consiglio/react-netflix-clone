import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Footer from './Footer'
import MyNavbar from './MyNavbar'
import { useParams } from 'react-router-dom'
import Loading from './Loading'
import API from '../api'
import StarRating from './StarRating'
import Button from 'react-bootstrap/Button'
import { IoTrashBinOutline } from 'react-icons/io5'
import AddReview from './AddReview'

function MovieDetail({ avatar, profileName }) {
	const [movie, setMovie] = useState(null)
	const [comments, setComments] = useState([])
	const [isLoadingMovie, setIsLoadingMovie] = useState(true)
	const [isLoadingComments, setIsLoadingComments] = useState(true)
	const [error, setError] = useState(false)
	const [updated, setUpdated] = useState(false)

	const { movieId } = useParams()

	const deleteComment = id => {
		new API({
			method: 'DELETE',
			callbackSuccess: () => {
				setUpdated(!updated)
			},
			id,
			callbackError: err => {
				setError(true)
			},
		})
	}

	useEffect(() => {
		document.body.dataset.bsTheme = 'dark'
	}, [])

	useEffect(() => {
		fetch('https://www.omdbapi.com/?apikey=26df6b83&i=' + movieId)
			.then(res => {
				if (!res.ok) {
					throw new Error('Network response was not ok')
				}
				return res.json()
			})
			.then(data => {
				console.log(data)
				setMovie(data)
				setIsLoadingMovie(false)
			})
			.catch(err => {
				setError(true)
				setIsLoadingMovie(false)
			})
	}, [movieId])

	useEffect(() => {
		setError(false)
		setIsLoadingComments(true)
		new API({
			method: 'GET',
			callbackSuccess: data => {
				setComments(data)
				setIsLoadingComments(false)
			},
			callbackError: err => {
				setIsLoadingComments(false)
				setError(true)
			},
			id: movieId,
		})
	}, [updated, movieId])

	return (
		<div className='d-flex flex-column min-vh-100'>
			<header>
				<MyNavbar avatar={avatar} />
			</header>
			<main className='flex-grow-1'>
				<Container fluid>
					{isLoadingMovie && (
						<Row style={{ minHeight: '60vh' }}>
							<Col className='d-flex justify-content-center align-items-center'>
								<Loading />
							</Col>
						</Row>
					)}

					{!isLoadingMovie && movie && (
						<Row
							className='justify-content-center p-4 position-relative'
							style={{
								minHeight: '60vh',
								backgroundImage: 'linear-gradient(to bottom, rgb(0 0 0 / 75%) 60%, transparent)',
							}}
						>
							<div className='bgHero' style={{ backgroundImage: `url('${movie.Poster}')` }}></div>
							<Col xs={12} md={6} className='text-center'>
								<img src={movie.Poster} alt={movie.Title} />
							</Col>
							<Col
								xs={12}
								md={6}
								className='d-flex flex-column justify-content-center align-items-center'
							>
								<h1>{movie.Title}</h1>
							</Col>
						</Row>
					)}

					<Row className='justify-content-center pt-4'>
						<Col xs={12} md={6} lg={6}>
							<h3>Comments</h3>
							<AddReview
								movieId={movieId}
								setError={setError}
								setUpdated={setUpdated}
								updated={updated}
							/>
							<hr className='mb-4' />
							{isLoadingComments && <Loading />}
							{!isLoadingComments &&
								comments.length > 0 &&
								comments.map(comment => {
									return (
										<div key={comment._id} className='d-flex'>
											<div className='flex-grow-1'>
												<StarRating rating={comment.rate} />
												<h4>{comment.name}</h4>
												<p>{comment.comment}</p>
											</div>
											<div>
												<Button variant='danger' onClick={() => deleteComment(comment._id)}>
													<IoTrashBinOutline />
												</Button>
											</div>
										</div>
									)
								})}
						</Col>
					</Row>
				</Container>
			</main>
			<footer>
				<Footer />
			</footer>
		</div>
	)
}

export default MovieDetail
