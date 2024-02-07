import React, { useState } from 'react'
import StarRating from './StarRating'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import API from '../api'

function AddReview({ movieId, setUpdated, updated, setError }) {
	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState('')
	return (
		<div className='my-4'>
			<h4>Add new review</h4>
			<StarRating rating={rating} canChange={true} setRating={setRating} className='mb-3' />
			<FloatingLabel controlId='floatingTextarea' label='Comments' className='mb-3'>
				<Form.Control
					as='textarea'
					placeholder='Leave a comment here'
					rows={5}
					value={comment}
					onChange={e => setComment(e.target.value)}
				/>
			</FloatingLabel>
			<Button
				variant='light'
				onClick={() => {
					new API({
						method: 'POST',
						id: '',
						body: {
							comment: comment,
							rate: rating,
							elementId: movieId,
						},
						callbackSuccess: () => {
							// alert('Review added')
							setComment('')
							setRating(0)
							setUpdated(!updated)
						},
						callbackError: err => {
							// alert('Error adding review')
							console.log(err)
							setError(true)
						},
					})
				}}
				disabled={comment.length === 0 || rating === 0}
			>
				Add rewiew
			</Button>
		</div>
	)
}

export default AddReview
