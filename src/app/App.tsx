import React, { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import Root from './pages/Root'
import favicon from './asserts/images/log.jpg'
import './asserts/style/reset.less'
/* fix: 
	esbuild-loader 
	maybe import antd.css in this
*/
import '../../node_modules/antd/dist/antd.css'
import { TodoApp } from './pages/TestRoot'

/*
	Mock
 */
// import '@/mock/mock'

const App = (props: any) => {
	const __root_id__: number = Math.random()
	return (
		<>
			<Suspense fallback={<section>Data Loading...</section>}>
				<Helmet link={[{ rel: 'icon', type: 'image/jpg', href: favicon }]}>
					<title>React Application</title>
				</Helmet>
				<Root __RootProps__={{ __root_id__ }} {...props} />
			</Suspense>
			{/* <TodoApp></TodoApp> */}
		</>
	)
}

export default App
