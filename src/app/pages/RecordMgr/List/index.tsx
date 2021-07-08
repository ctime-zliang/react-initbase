import React from 'react'
import { Helmet } from 'react-helmet-async'
import PageContent from '@/modules/Componnet/PageContent'
import PageHeader from '@/modules/Componnet/PageHeader'
import PageFooter from '@/modules/Componnet/PageFooter'
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

export default React.memo(RecordListRoot)
