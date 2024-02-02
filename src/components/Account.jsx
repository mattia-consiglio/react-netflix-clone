import React, { Component } from 'react'
import MyNavbar from './MyNavbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import avatar from '../assets/imgs/avatar.png'

function LinkMap({ links, pe0 = false }) {
	return (
		<>
			{links.map((link, i) => {
				return (
					<React.Fragment key={link}>
						<a href='#' className={pe0 ? 'pe-0' : ''}>
							{link}
						</a>
						{i !== links.length - 1 && <br />}
					</React.Fragment>
				)
			})}
		</>
	)
}

function SettingSection({ title, children, titleExtra = '' }) {
	return (
		<Row>
			<Col xs={12} lg={3}>
				<p className='text-secondary'>{title}</p>
				{titleExtra}
			</Col>
			<Col xs={12} lg={9}>
				<Row>{children}</Row>
			</Col>
		</Row>
	)
}

class Account extends Component {
	componentDidMount() {
		document.body.dataset.bsTheme = 'light'
	}
	render() {
		return (
			<>
				<header data-bs-theme='dark'>
					<MyNavbar />
				</header>
				<main>
					<Container className='mt-4'>
						<Row>
							<Col>
								<h1 className='fw-normal'>Account</h1>
							</Col>
						</Row>
						<hr className='border-2' />
						<SettingSection
							title='MEMBERSHIP & BILLING'
							titleExtra={<Button variant='secondary'>Cancel Membership</Button>}
						>
							{[
								{ text: 'student@strive.school', link: 'Change account email', secondary: false },
								{ text: 'Password: ********', link: 'Change password', secondary: true },
								{ text: 'Phone: 321 044 1279', link: 'Change phone number', secondary: true },
							].map(row => {
								return (
									<Row key={row.text} className='pe-0'>
										<Col xs={12} md={6}>
											<p className={'mb-2' + (row.secondary === true ? ' text-secondary' : '')}>
												{row.text}
											</p>
										</Col>
										<Col xs={12} md={6} className='text-start text-md-end pe-0'>
											<LinkMap links={[row.link]} />
										</Col>
									</Row>
								)
							})}
							<hr />
							<Row className='pe-0'>
								<Col xs={12} md={6}>
									<p className='mb-2'>
										<i className='bi bi-paypal'></i>{' '}
										<span className='fw-medium'>admin@epicode.com</span>
									</p>
								</Col>
								<Col xs={12} md={6} className='text-start text-md-end pe-0'>
									<LinkMap links={['Update payment info', 'Billing details']} />
								</Col>
							</Row>
						</SettingSection>
						<hr />
						<SettingSection title='PLAN DETAILS'>
							<Col xs={12} md={6}>
								<p className='mb-2'>
									<span className='fw-medium'>Premium</span>{' '}
									<span className='border border-2 border-dark rounded p-1'>
										ULTRA <strong>HD</strong>
									</span>
								</p>
							</Col>
							<Col xs={12} md={6} className='text-start text-md-end'>
								<LinkMap links={['Change plan']} />
							</Col>
						</SettingSection>
						<hr />
						<SettingSection title='SETTINGS'>
							<Col>
								<LinkMap
									links={[
										'Parental controls',
										'Test participation',
										'Manage download devices',
										'Activate a device',
										'Recent device streaming activity',
										'Sign out of all devices',
									]}
								/>
							</Col>
						</SettingSection>
						<hr />
						<SettingSection title='MY PROFILE'>
							<Col>
								<Row className='pe-0 mb-4'>
									<Col xs={12} md={6} className='d-flex align-items-center'>
										<img src={avatar} alt='avatar' style={{ maxWidth: '40px' }} className='me-3' />
										<p className='fw-bold m-0'>Mattia</p>
									</Col>
									<Col xs={12} md={6} className='text-start text-md-end pe-0'>
										<LinkMap links={['Manage profiles', 'Add profile email']} />
									</Col>
								</Row>
								<Row>
									<Col xs={12} md={6}>
										<LinkMap links={['Language', 'Playback settings', 'Subtitle appearance']} />
									</Col>
									<Col xs={12} md={6}>
										<LinkMap links={['Viewing activity', 'Ratings']} />
									</Col>
								</Row>
							</Col>
						</SettingSection>
					</Container>
				</main>
			</>
		)
	}
}

export default Account
