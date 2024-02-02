import React from 'react'
import logo from '../assets/imgs/netflix_logo.png'
import avatar from '../assets/imgs/avatar.png'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom'

function MyNavbar({ onlyLogo = false, isHome = false }) {
	return (
		<Navbar expand='lg' variant='dark'>
			<Container>
				<Link to='/' className='navbar-brand'>
					<img className='img-fluid' src={logo} alt='Netflix logo' />
				</Link>
				{!onlyLogo && (
					<>
						<Navbar.Toggle aria-controls='basic-navbar-nav' />
						<Navbar.Collapse id='basic-navbar-nav'>
							<Nav className='me-auto mb-2 mb-lg-0'>
								<Link to='/' className='nav-link'>
									Home
								</Link>
								<Link to='/' className={'nav-link' + (isHome ? ' active' : '')}>
									TV Shows
								</Link>
								<Link to='/' className='nav-link'>
									Movies
								</Link>
								<Link to='/' className='nav-link'>
									Recently Added
								</Link>
								<Link to='/' className='nav-link'>
									My List
								</Link>
							</Nav>
							<div className='d-flex align-items-center column-gap-3'>
								<i className='bi bi-search' role='search'></i>
								<span>KIDS</span>
								<i className='bi bi-bell-fill'></i>
								<Dropdown>
									<Dropdown.Toggle variant='' id='dropdown-basic' className='avatar text-secondary'>
										<img className='img-fluid' src={avatar} alt='avatar' />
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Link to='/profile' className='dropdown-item'>
											Profile
										</Link>
										<Link to='/account' className='dropdown-item'>
											Account
										</Link>
									</Dropdown.Menu>
								</Dropdown>
							</div>
						</Navbar.Collapse>
					</>
				)}
			</Container>
		</Navbar>
	)
}

export default MyNavbar
