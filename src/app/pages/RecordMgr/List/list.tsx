import React, { useState, useEffect, useRef, useCallback } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { Layout, Row, Pagination, Modal } from 'antd'
import { message as messageTips } from 'antd'
import ListTable from '../ListTable'
import ListFilterForm from '../ListFilterForm'
import { basePageConfig, IBasePageConfig, baseFormConfig, IBaseFormConfig } from './config'
import * as actions from '@/store/record/action'
import { createSearchString } from './utils'
import './index.less'
import { getQueryValueOfUrl } from '@/utils/utils'
import { REDUCER_RECORD_REDUCER, IRecordMgrItem } from '@/store/record/config'
import { IGProfile, SERVER_RENDER } from '@/store/gProfile/config'

const { Content } = Layout

function RecordList(props: TIRecordListProps) {
	console.log(`RecordList.props ❤❤❤`, props)
	const {
		g_RENDER_WAY,
		list,
		countTotal,
		location,
		history,
		deleteItemsRequestAction,
		handleToggleRowSelectAction,
		fetchListRequestAction,
		addItemRequestAction,
	} = props
	const [pageConfig, setPageConfig] = useState(basePageConfig)
	const [formConfig, setFormConfig] = useState(baseFormConfig)
	const [tableLoading, setTableLoading] = useState<boolean>(false)
	const [isDeleteModalVisible, setIsDeleteModelVisible] = useState<boolean>(false)
	const [deleteModalTargetTitle, setDeleteModalTargetTitle] = useState<string | undefined>('')
	/* ... */
	const pageConfigReference = useRef<any>(null as any)
	pageConfigReference.current = pageConfig
	const formConfigReference = useRef<any>(null as any)
	formConfigReference.current = formConfig
	const propsListReference = useRef<any>(null as any)
	propsListReference.current = list

	const handleSearch = useCallback(async () => {
		history.push({
			pathname: location.pathname,
			search: createSearchString(1, +pageConfigReference.current.pageSize, formConfigReference.current.keywords),
		})
	}, [])

	const handleFresh = useCallback(async () => {
		history.push({
			pathname: location.pathname,
			search: createSearchString(
				+pageConfigReference.current.pageIndex,
				+pageConfigReference.current.pageSize,
				formConfigReference.current.keywords
			),
		})
	}, [])

	const handleModifyFormInput = useCallback($evte => {
		const value = $evte.target.value
		setFormConfig((formConfig: IBaseFormConfig) => {
			return { ...formConfig, keywords: value }
		})
	}, [])

	const onDialogEditFormClosed = useCallback((hasSubmitedItem: boolean) => {
		if (hasSubmitedItem) {
			fetchTableData({ ...pageConfigReference.current, ...formConfigReference.current })
		}
	}, [])

	const onPaginationChange = useCallback((pageIndex: number, pageSize: number | undefined) => {
		history.push({
			pathname: location.pathname,
			search: createSearchString(pageIndex, +(pageSize || basePageConfig.pageSize), formConfigReference.current.keywords),
		})
	}, [])

	const fetchTableData = useCallback(async params => {
		setTableLoading(true)
		try {
			const res = await fetchListRequestAction(params)
			const countTotal = typeof res.data.countTotal !== 'undefined' ? res.data.countTotal : pageConfig.countTotal
			setPageConfig((pageConfig: IBasePageConfig) => {
				return { ...pageConfig, countTotal }
			})
			setTableLoading(false)
		} catch (error) {
			messageTips.error(error.msg)
			setTableLoading(false)
		}
	}, [])

	const deleteRowData = useCallback(async () => {
		const selectedIdList: string[] = propsListReference.current
			.filter((item: IRecordMgrItem, index: number) => {
				return item.isChcked
			})
			.map((item: IRecordMgrItem, index: number) => {
				return item.id
			})
		try {
			const res = await deleteItemsRequestAction(selectedIdList)
			messageTips.success(`Deleted Success`)
			setIsDeleteModelVisible(false)
		} catch (error) {
			messageTips.error(error.msg)
		}
	}, [])

	const handleDeleteItem = useCallback((itemData: IRecordMgrItem) => {
		handleToggleRowSelectAction([itemData.key])
		setIsDeleteModelVisible(true)
	}, [])

	useEffect(() => {
		const pageIndex = +getQueryValueOfUrl('pageIndex') || pageConfig.pageIndex
		const pageSize = +getQueryValueOfUrl('pageSize') || pageConfig.pageSize
		const keywords = decodeURI(getQueryValueOfUrl('keywords') || '')
		setPageConfig({ ...pageConfig, pageSize, pageIndex, countTotal })
		setFormConfig({ ...formConfig, keywords })
		fetchTableData({ pageIndex, pageSize, keywords })
	}, [location])

	useEffect(() => {
		if (!isDeleteModalVisible) {
			return
		}
		const selectedList: Array<IRecordMgrItem> = list.filter((item: IRecordMgrItem, index: number) => {
			return item.isChcked
		})
		setDeleteModalTargetTitle(selectedList.length ? selectedList[0].title : '')
	}, [isDeleteModalVisible])

	return (
		<>
			<section className="list-container">
				<section className="list-wrapper">
					<div className="list-header">
						<ListFilterForm
							onDialogEditFormClosed={onDialogEditFormClosed}
							handleAddItem={addItemRequestAction}
							keywordsValue={formConfig.keywords}
							handleKeywordsEnterAction={handleSearch}
							handleKeywordsChangeAction={handleModifyFormInput}
							handleRefreshAction={handleFresh}
						/>
					</div>
					<Content>
						<ListTable
							handleDeleteItem={handleDeleteItem}
							handleToggleRowSelect={handleToggleRowSelectAction}
							loading={tableLoading}
							list={list}
						/>
					</Content>
					<Row className="pagination-wrapper">
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
					<Row className="total-count-wrapper">
						<div>Total Count: {countTotal}</div>
					</Row>
				</section>
			</section>
			<Modal
				title="Modal"
				visible={isDeleteModalVisible}
				onOk={deleteRowData}
				onCancel={() => {
					setIsDeleteModelVisible(false)
				}}
			>
				<p>
					Are you sure you want to delete <span style={{ color: '#ff0000' }}>{deleteModalTargetTitle}</span> ?
				</p>
			</Modal>
		</>
	)
}
interface IRecordListProps extends RouteComponentProps, IGProfile {
	list: Array<IRecordMgrItem>
	handleToggleRowSelectAction: Function
	deleteItemsRequestAction: Function
	fetchListRequestAction: Function
	addItemRequestAction: Function
	[key: string]: any
}
type TExpand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never
type TIRecordListProps = TExpand<IRecordListProps>

export default connect(
	(state: { [key: string]: any } = {}, ownProps) => {
		return {
			...ownProps,
			...state[REDUCER_RECORD_REDUCER],
		}
	},
	{
		...actions,
	}
)(RecordList)