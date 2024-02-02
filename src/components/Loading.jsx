import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

function Loading({ className }) {
	return (
		<div className={className}>
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		</div>
	)
}

export default Loading
