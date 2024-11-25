import React from 'react'
import { Helmet } from 'react-helmet-async'

function ListRoot(props: any): React.ReactElement {
	console.log(`ListRoot ☆☆☆`, props)
	return (
		<>
			<Helmet>
				<title>Article List</title>
			</Helmet>
			<section>Article List</section>
		</>
	)
}

export const getInitialProps = async (store: any, ctx: any): Promise<any> => {
	const query: { [key: string]: any } = ctx.request.query || {}
	console.log(store)
	console.log(ctx)
	return { func: `getInitialProps` }
}

export default React.memo(ListRoot)
