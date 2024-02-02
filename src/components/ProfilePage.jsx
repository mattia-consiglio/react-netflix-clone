import React, { Component } from 'react'
import MyNavbar from './MyNavbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

export default class ProfilePage extends Component {
	state = {
		language: 'English',
		autoPlayNext: false,
		autoPlayPreviews: false,
		modalOpen: false,
		avatar: '',
		profileName: '',
	}

	componentDidMount() {
		document.body.dataset.bsTheme = 'dark'
		console.log(this.props)
		this.setState(prevState => {
			return {
				avatar: this.props.avatar,
				profileName: this.props.profileName,
			}
		})
	}

	componentDidUpdate(prevState, prevProps) {
		//set the avatar image after first render if the page is call
		if (this.state.avatar === '') {
			this.setState(prevState => {
				return {
					avatar: this.props.avatar,
				}
			})
		}
	}
	render() {
		return (
			<>
				<header>
					<MyNavbar onlyLogo={true} />
				</header>
				<main>
					<Container>
						<Row className='justify-content-center'>
							<Col xs={12} lg={6}>
								<Row>
									<Col>
										<h1 className='display-3 text-light fw-normal m-0'>Edit Profile</h1>
									</Col>
								</Row>
								<hr />
								<Row>
									<Col xs={12} md={3} className='d-flex justify-content-center mb-2 mb-lg-0'>
										<div className='position-relative profile-img'>
											<div
												className='circle-wrap text-light border border-1 border-light rounded-circle position-absolute d-flex align-items-center justify-content-center bg-dark p-2 shadow-lg bottom-0 ms-2 mb-2 start-0 cursor-pointer'
												onClick={() => {
													this.setState({ modalOpen: true })
												}}
											>
												<i className='bi bi-pencil-fill'></i>
											</div>
											<img className='img-fluid ' src={this.state.avatar} alt='avatar' />
										</div>
									</Col>
									<Col xs={12} md={9}>
										<Form>
											<div className='mb-4'>
												<Form.Control
													type='text'
													className='bg-dark-subtle text-light fw-normal'
													value={this.state.profileName}
													onChange={e => {
														this.setState({ profileName: e.target.value })
													}}
												/>
											</div>
											<div className='mb-4'>
												<h5 className='mb-3 fw-normal'>Language:</h5>
												<Form.Select
													aria-label='Select language'
													className='w-max-content'
													defaultValue={'1'}
												>
													<option value='1'>English</option>
													<option value='2'>Italian</option>
													<option value='3'>Franch</option>
													<option value='3'>Spanish</option>
													<option value='3'>German</option>
												</Form.Select>
												<hr />
											</div>
											<div className='mb-4'>
												<h5 className='mb-3 fw-normal'>Maturity settings:</h5>
												<div
													className='bg-custom-1 py-1 px-2 w-max-content'
													aria-describedby='maturityHelp'
												>
													ALL MATURITY RATINGS RATINGS
												</div>
												<div id='maturityHelp' className='form-text mb-3'>
													Show titles of all maturity ratings for this profile.
												</div>
												<Button variant='outline-secondary' className='px-4 py-1'>
													EDIT
												</Button>
												<hr />
											</div>
											<div className='mb-4'>
												<h5 className='mb-3 fw-normal'>Autoplay controls</h5>
												<Form.Check
													type='checkbox'
													id='autoPlayNext'
													label='Autoplay next eplsode In a serles on all devices.'
												/>
												<Form.Check
													type='checkbox'
													id='autoPlayPreviews'
													label='Autoplay previews whlle browsing on all devices.'
												/>
											</div>
										</Form>
									</Col>
								</Row>
								<hr />
								<Row>
									<Col className='d-flex flex-wrap column-gap-3 row-gap-3'>
										<Button
											variant='light'
											className='fw-bold px-4 px-3'
											onClick={() => {
												this.props.setAvatar(this.state.avatar)
												this.props.setProfileName(this.state.profileName)
											}}
										>
											SAVE
										</Button>
										<Button variant='outline-secondary' className='fw-bold px-4 px-3'>
											CANCEL
										</Button>
										<Button variant='outline-secondary' className='fw-bold px-4 px-3'>
											DELETE PROFILE
										</Button>
									</Col>
								</Row>
							</Col>
						</Row>
					</Container>
					<Modal
						show={this.state.modalOpen}
						fullscreen
						onHide={() => this.setState({ modalOpen: false })}
					>
						<Modal.Header closeButton>
							<Modal.Title>Change avatar</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Row xs={3} md={4} lg={6} className='g-4'>
								{this.props.images.map((image, i) => {
									return (
										<Col key={image}>
											<Button
												variant='outline-secondary'
												className='avatar-choise rounded'
												onClick={() => {
													this.setState({ modalOpen: false, avatar: image })
												}}
												style={{ backgroundImage: `url(${image})` }}
											></Button>
										</Col>
									)
								})}
							</Row>
						</Modal.Body>
					</Modal>
				</main>
			</>
		)
	}
}
