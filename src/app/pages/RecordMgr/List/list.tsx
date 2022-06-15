import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { Layout, Row, Pagination, Modal } from 'antd'
import { message as messageTips } from 'antd'
import { useTranslation } from 'react-i18next'
import ListTable from '../Component/ListTable'
import { basePageConfig } from './config'
import * as actions from '../store/action'
import { createSearchString } from './utils'
import { getQueryValueOfUrl } from '@app/utils/utils'
import { KEYOF_RECORD_REDUCER } from '../store/config'
import { TRecordMgrItem } from '../store/types'
import { TGProfile, KEYOF_G_PROFILE_REDUCER, SERVER_RENDER } from '@app/store/globalProfile/config'
import styles from './index.module.less'
import { TBasePageConfig } from './types'

const { Content } = Layout

function RecordList(props: TRecordListProps) {
	// console.log(`RecordList.props ❤❤❤`, props)
	const { g_RENDER_WAY, list, countTotal, location, history, handleToggleRowSelectAction, fetchListRequestAction } = props
	const { t } = useTranslation()
	const [pageConfig, setPageConfig] = useState(basePageConfig)
	const [tableLoading, setTableLoading] = useState<boolean>(false)

	const onPaginationChange = (pageIndex: number, pageSize: number | undefined): void => {
		history.push({
			pathname: location.pathname,
			search: createSearchString(pageIndex, +(pageSize || basePageConfig.pageSize)),
		})
	}

	const fetchTableData = async (params: any) => {
		setTableLoading(true)
		try {
			const res = await fetchListRequestAction(params)
			const countTotal = typeof res.data.countTotal !== 'undefined' ? res.data.countTotal : pageConfig.countTotal
			setPageConfig((pageConfig: TBasePageConfig) => {
				return { ...pageConfig, countTotal }
			})
			setTableLoading(false)
		} catch (error: any) {
			messageTips.error(error.msg)
			setTableLoading(false)
		}
	}

	useEffect(() => {
		const pageIndex = +getQueryValueOfUrl('pageIndex') || pageConfig.pageIndex
		const pageSize = +getQueryValueOfUrl('pageSize') || pageConfig.pageSize
		const keywords = decodeURI(getQueryValueOfUrl('keywords') || '')
		setPageConfig({ ...pageConfig, pageSize, pageIndex, countTotal })
		fetchTableData({ pageIndex, pageSize, keywords })
	}, [location])

	return (
		<>
			<section className={styles['list-container']}>
				<section className={styles['list-wrapper']}>
					<Content>
						<ListTable handleToggleRowSelect={handleToggleRowSelectAction} loading={tableLoading} list={list} />
					</Content>
					<Row className={styles['pagination-wrapper']}>
						<Pagination
							size="small"
							total={pageConfig.countTotal}
							current={pageConfig.pageIndex}
							pageSize={pageConfig.pageSize}
							showSizeChanger
							showQuickJumper
							onChange={onPaginationChange}
						/>
					</Row>
					<Row className={styles['total-count-wrapper']}>
						<div>
							{t('record.Total Count')}: {countTotal}
						</div>
					</Row>
				</section>
			</section>
		</>
	)
}
type TRecordListProps = {
	list: Array<TRecordMgrItem>
	handleToggleRowSelectAction: Function
	fetchListRequestAction: Function
	addItemRequestAction: Function
	[key: string]: any
} & RouteComponentProps &
	TGProfile
type TExpand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never
type TIRecordListProps = TExpand<TRecordListProps>

export default connect(
	(state: { [key: string]: any } = {}, ownProps: { [key: string]: any } = {}): void => {
		return {
			...ownProps,
			...(state[KEYOF_RECORD_REDUCER] || {}),
			...(state[KEYOF_G_PROFILE_REDUCER] || {}),
		}
	},
	{
		...actions,
	}
)(RecordList)
