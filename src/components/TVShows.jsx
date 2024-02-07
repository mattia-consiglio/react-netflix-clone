import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import MovieGrid from './MovieGrid'

function TVShows() {
	const [radioValue, setRadioValue] = useState('1')
	return (
		<>
			<section>
				<Container fluid>
					<Row className='align-items-center mx-4'>
						<Col xs={8}>
							<div className='d-flex column-gap-5 align-items-center flex-wrap'>
								<h1>TV Shows</h1>
								<Dropdown>
									<Dropdown.Toggle variant='outline-secondary' id='dropdown-genres'>
										Genres
									</Dropdown.Toggle>

									<Dropdown.Menu>
										<Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
										<Dropdown.Item href='#/action-2'>Children</Dropdown.Item>
										<Dropdown.Item href='#/action-3'>Comedy</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
						</Col>
						<Col xs={4} className='d-flex justify-content-end'>
							<ButtonGroup aria-label='Change view layout'>
								<ToggleButton
									id={`btnradio1`}
									type='radio'
									variant='outline-secondary'
									name='btnradio'
									value={'1'}
									checked={radioValue === '1'}
									onChange={e => setRadioValue(e.currentTarget.value)}
								>
									<i className='bi bi-list'></i>
								</ToggleButton>
								<ToggleButton
									id={`btnradio2`}
									type='radio'
									variant='outline-secondary'
									name='btnradio'
									value={'2'}
									checked={radioValue === '2'}
									onChange={e => setRadioValue(e.currentTarget.value)}
								>
									<i className='bi bi-grid-fill'></i>
								</ToggleButton>
							</ButtonGroup>
						</Col>
					</Row>
				</Container>
			</section>
			<MovieGrid title='Trending Now' q='Avengers' className='mt-3' />
			<MovieGrid title='Watch it again' q='Lord of the Rings' className='mt-5' />
			<MovieGrid title='New Releases' q='Harry Potter' className='mt-5' />
		</>
	)
}

export default TVShows
