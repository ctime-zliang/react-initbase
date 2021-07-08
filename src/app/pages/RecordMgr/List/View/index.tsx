import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import PageContent from '@/modules/Componnet/PageContent'
import PageHeader from '@/modules/Componnet/PageHeader'
import PageFooter from '@/modules/Componnet/PageFooter'
import { REDUCER_G_PROFILE } from '@/store/gProfile/config'
import * as gProfileActions from '@/store/gProfile/action'
import * as recordActions from '@/store/record/action'
import RecordList from './list'
import Mode from './mode'
import { IGProfile } from '@/store/gProfile/config'
import { RouteComponentProps } from 'react-router'

function RecordListRoot(props: IRecordListRootProps) {
	return (
		<>
			<Helmet>
				<title>Record List</title>
			</Helmet>
			<PageHeader userId={props.g_globalId} />
			<PageContent>
				<RecordList {...props} />
				<Mode renderWay={props.g_RENDER_WAY} />
			</PageContent>
			<PageFooter />
		</>
	)
}
interface IRecordListRootProps extends RouteComponentProps, IGProfile {
	[key: string]: any
}

const exportRecordListRoot: any = connect(
	(state: { [key: string]: any } = {}, ownProps) => {
		return {
			...ownProps,
			...state[REDUCER_G_PROFILE],
		}
	},
	{
		...gProfileActions,
	}
)(RecordListRoot)

exportRecordListRoot.getInitialProps = (store: any, request: any) => {
	const query = request.query || {}
	return store.dispatch(
		recordActions.fetchListRequestAction({
			keywords: query.keywords || '',
			pageIndex: query.pageIndex,
			pageSize: query.pageSize,
		})
	)
}

export default exportRecordListRoot
