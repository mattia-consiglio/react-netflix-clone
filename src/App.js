import './assets/scss/app.scss'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './components/HomePage'
import ProfilePage from './components/ProfilePage'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path='/' element={<HomePage />} />
				<Route exact path='/profile' element={<ProfilePage />} />
				{/* <Route path='blogs' element={<Blogs />} /> */}
				{/* <Route path='contact' element={<Contact />} /> */}
				{/* <Route path='*' element={<NoPage />} /> */}
			</Routes>
		</BrowserRouter>
	)
}

export default App
