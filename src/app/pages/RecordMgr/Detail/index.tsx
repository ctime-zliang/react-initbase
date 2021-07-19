import React from 'react'
import { Provider } from 'mobx-react'
import { Helmet } from 'react-helmet-async'
import { configure } from 'mobx'
import { testMobxStore } from '@/store/__mobx/testStore'
import RecordDetail from './detail'
import Extra from './extra'

configure({ enforceActions: 'always' })

function RecordDetailRoot(props: any) {
	const { match } = props
	const params: any = match.params
	return (
		<>
			<Helmet>
				<title>{params.id || ''} - Record Detail</title>
			</Helmet>
			<RecordDetail {...props} />
			<Provider {...{ testMobxStore }}>
				<Extra {...(props as any)} />
			</Provider>
		</>
	)
}

export default React.memo(RecordDetailRoot)
