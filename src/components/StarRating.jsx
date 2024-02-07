import React, { useState } from 'react'
import { IoStar, IoStarOutline } from 'react-icons/io5'

function StarRating({ rating = 0, canChange = false, setRating = () => {}, className = '' }) {
	const [tempRating, SetTempRating] = useState(rating)

	return (
		<div
			className={
				'rating' + (canChange ? ' rating-can-change' : '') + (className ? ' ' + className : '')
			}
		>
			{[...Array(5)].map((_, i) => (
				<label
					key={i}
					className={'rating-label' + (i + 1 <= rating ? ' rating-label-selected' : '')}
					onMouseEnter={() => {
						if (canChange) {
							// setHover(true)
							SetTempRating(i + 1)
						}
					}}
					onMouseLeave={() => {
						if (canChange) {
							// setHover(false)
							SetTempRating(rating)
						}
					}}
					onClick={e => {
						if (!canChange) return
						e.preventDefault()
						setRating(i + 1)
						SetTempRating(i + 1)
					}}
				>
					<input
						type='radio'
						id={'star-' + (i + 1)}
						name='rating'
						value={i + 1}
						disabled={!canChange}
						onChange={e => {
							setRating(e.target.value)
						}}
						checked={i + 1 === tempRating}
						className='rating-input'
					/>
					{i + 1 <= tempRating ? (
						<IoStar className='rating-star' />
					) : (
						<IoStarOutline className='rating-star' />
					)}
				</label>
			))}
		</div>
	)
}

export default StarRating
