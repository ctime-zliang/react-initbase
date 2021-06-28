import React from 'react'
import { Helmet } from 'react-helmet-async'
import Root from './pages/Root'
import favicon from './asserts/images/log.jpg'
import './asserts/style/reset.less'

const App = () => {
	const __root_id__ = Math.random()
	return (
		<>
			<Helmet
				link={[{ rel: 'icon', type: 'image/jpg', href: favicon }]}
			>
				<title>React Application</title>
			</Helmet>
			<Root __RootProps__={{ __root_id__ }} />
		</>
	)
}

export default App
