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
	const query: { [key: string]: any } = ctx.request.query || {}
	const handler = fetchListRequestAction({
		keywords: query.keywords || '',
		pageIndex: query.pageIndex,
		pageSize: query.pageSize,
	})
	const res: any = await handler(store.dispatch)
	console.log(res)
}

export default React.memo(RecordListRoot)
