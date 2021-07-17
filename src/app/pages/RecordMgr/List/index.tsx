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

export const getInitialProps = (store: any, request: any) => {
	const query = request.query || {}
	return store.dispatch(
		recordActions.fetchListRequestAction({
			keywords: query.keywords || '',
			pageIndex: query.pageIndex,
			pageSize: query.pageSize,
		})
	)
}

export default React.memo(RecordListRoot)
