import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function LinkList({ links }) {
	return (
		<ul className='list-unstyled d-flex flex-column row-gap-2'>
			{links.map((link, i) => {
				return (
					<li key={link}>
						<a href='#' className='text-secondary text-decoration-none'>
							{link}
						</a>
					</li>
				)
			})}
		</ul>
	)
}

function Footer() {
	return (
		<Container className='text-secondary'>
			<Row>
				<Col className='d-flex column-gap-3 fs-4'>
					<a className='text-secondary text-decoration-none' href='#'>
						<i className='bi bi-facebook'></i>
					</a>
					<a className='text-secondary text-decoration-none' href='#'>
						<i className='bi bi-instagram'></i>
					</a>
					<a className='text-secondary text-decoration-none' href='#'>
						<i className='bi bi-twitter-x'></i>
					</a>
					<a className='text-secondary text-decoration-none' href='#'>
						<i className='bi bi-youtube'></i>
					</a>
				</Col>
			</Row>
			<Row className='mt-3'>
				<Col xs={6} md={3}>
					<LinkList links={['Audio and Subtitles', 'Media Center', 'Privacy', 'Contact Us']} />
				</Col>
				<Col xs={6} md={3}>
					<LinkList links={['Audio Dcscription', 'Investor Relations', 'Legal Notices']} />
				</Col>
				<Col xs={6} md={3}>
					<LinkList links={['Help Center', 'Jobs', 'Cookie Preferences']} />
				</Col>
				<Col xs={6} md={3}>
					<LinkList links={['Gift Cards', 'Terms of use', 'Corporate Information']} />
				</Col>
			</Row>
		</Container>
	)
}

export default Footer
