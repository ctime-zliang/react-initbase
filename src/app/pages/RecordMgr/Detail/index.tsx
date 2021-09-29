import React from 'react'
import { Provider } from 'mobx-react'
import { Helmet } from 'react-helmet-async'
import { configure } from 'mobx'
import { testMobxStore } from '@/store/__mobx/testStore'
import RecordDetail from './detail'
import Extra from './extra'
import { useWindowResult } from '@/utils/hooks/use.window-result'
import { fetchItem } from '@/api/record'

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

function queryDetailId(url: string): string | null {
	try {
		const r: string[] | null = /\/detail\/(.?)\/?/i.exec(url)
		return r && r instanceof Array && r[r.length - 1] ? r[r.length - 1] : null
	} catch (e: any) {
		return null
	}
}
export const getInitialProps = async (store: any, ctx: any): Promise<{ [key: string]: any } | undefined> => {
	const id: string | null = queryDetailId(ctx.request.url)
	if (!id) {
		return
	}
	return {
		[SSR_DATA_KEY]: (await fetchItem(id)).data,
	}
}

export default React.memo(RecordDetailRoot)
