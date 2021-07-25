import React from 'react'
import { Helmet } from 'react-helmet-async'
import { fetchListRequestAction } from '../store/action'
import RecordList from './list'

function RecordListRoot(props: any) {
	return (
		<>
			<Helmet>
				<title>Record List</title>
			</Helmet>
			<RecordList {...props} />
		</>
	)
}

export const getInitialProps = async (store: any, ctx: any) => {
	const query = ctx.request.query || {}
	const handler = fetchListRequestAction({
		keywords: query.keywords || '',
		pageIndex: query.pageIndex,
		pageSize: query.pageSize,
	})
	await handler(store.dispatch)
}

export default React.memo(RecordListRoot)
