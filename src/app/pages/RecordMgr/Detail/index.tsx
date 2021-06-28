import React from 'react'
import { Provider } from 'mobx-react'
import { Helmet } from 'react-helmet-async'
import { configure } from 'mobx'
import { testMobxStore } from '@/store/__mobx/testStore'
import RecordDetail from './detail'
import Extra from './extra'
import PageContent from '@/modules/Componnet/PageContent'
import PageHeader from '@/modules/Componnet/PageHeader'
import PageFooter from '@/modules/Componnet/PageFooter'
import { RouteComponentProps } from 'react-router'

configure({ enforceActions: 'always' })

function RecordDetailRoot(props: IRecordDetailRootProps) {
	const { match } = props
	const params: any = match.params
	return (
		<>
			<Helmet>
				<title>{ params.id || '' } - Record Detail</title>
			</Helmet>
			<PageHeader />
			<PageContent>
				<RecordDetail {...(props as any)} />
				<Provider {...{ testMobxStore }}>
					<Extra {...(props as any)} />
				</Provider>
			</PageContent>
			<PageFooter />
		</>
	)
}
interface IRecordDetailRootProps extends RouteComponentProps {
	[key: string]: any
}

export default React.memo(RecordDetailRoot)
