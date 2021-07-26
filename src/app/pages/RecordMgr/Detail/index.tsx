import React from 'react'
import { Provider } from 'mobx-react'
import { Helmet } from 'react-helmet-async'
import { configure } from 'mobx'
import { testMobxStore } from '@/store/__mobx/testStore'
import RecordDetail from './detail'
import Extra from './extra'
import { fetchItemRequestAction } from '../store/action'
import { useWindowResult } from '@/utils/hooks/use.window-result'

configure({ enforceActions: 'always' })

const SSR_DATA_KEY = 'detailData'
function RecordDetailRoot(props: any) {
	const { match } = props
	const params: { [key: string]: any } = match.params
	const [ssrData] = useWindowResult(SSR_DATA_KEY)
	return (
		<>
			<Helmet>
				<title>{params.id || ''} - Record Detail</title>
			</Helmet>
			<RecordDetail {...props} {...(ssrData || {})} />
			<div style={{ display: 'none' }}>{(ssrData || {}).content}</div>
			<Provider {...{ testMobxStore }}>
				<Extra {...(props as any)} />
			</Provider>
		</>
	)
}

function queryDetailId(url: string) {
	try {
		const r = /\/detail\/(.?)\/?/i.exec(url)
		return r && r instanceof Array && r[r.length - 1] ? r[r.length - 1] : null
	} catch (e) {
		return null
	}
}
export const getInitialProps = async (store: any, ctx: any) => {
	const id: string | null = queryDetailId(ctx.request.url)
	if (!id) {
		return
	}
	const handler = fetchItemRequestAction(id)
	return {
		[SSR_DATA_KEY]: (await handler(store.dispatch)).data,
	}
}

export default React.memo(RecordDetailRoot)
