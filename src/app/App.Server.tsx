import React from 'react'
import { Helmet } from 'react-helmet-async'
import Root from './pages/Root'
import favicon from './asserts/images/log.jpg'
import './asserts/style/reset.less'
/* fix: 
	esbuild-loader 
	must import antd.css
*/
import '../../node_modules/antd/dist/antd.css'

const App = (props: any) => {
	const __root_id__ = Math.random()
	return (
		<>
			<Helmet link={[{ rel: 'icon', type: 'image/jpg', href: favicon }]}>
				<title>React SSR Application</title>
			</Helmet>
			<Root __RootProps__={{ __root_id__ }} {...props} />
		</>
	)
}

export default App
