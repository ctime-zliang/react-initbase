import React from 'react'
import { Helmet } from 'react-helmet-async'
import PageContent from '@/modules/Componnet/PageContent'
import PageHeader from '@/modules/Componnet/PageHeader'
import PageFooter from '@/modules/Componnet/PageFooter'
import * as recordActions from '../store/action'
import RecordList from './list'

function RecordListRoot(props: any) {
	return (
		<>
			<Helmet>
				<title>Record List</title>
			</Helmet>
			<PageHeader />
			<PageContent>
				<RecordList {...props} />
			</PageContent>
			<PageFooter />
		</>
	)
}

export const getInitialProps = async (store: any, request: any) => {
	const query = request.query || {}
	const handler = recordActions.fetchListRequestAction({
		keywords: query.keywords || '',
		pageIndex: query.pageIndex,
		pageSize: query.pageSize,
	})
	await handler(store.dispatch)
}

export default React.memo(RecordListRoot)
