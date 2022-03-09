import React, { useState, useEffect, useRef, useCallback } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { Layout, Row, Pagination, Modal } from 'antd'
import { message as messageTips } from 'antd'
import { useTranslation } from 'react-i18next'
import ListTable from '../Component/ListTable'
import ListFilterForm from '../Component/ListFilterForm'
import { basePageConfig, TBasePageConfig, baseFormConfig, TBaseFormConfig } from './config'
import * as actions from '../store/action'
import { createSearchString } from './utils'
import { getQueryValueOfUrl } from '@app/utils/utils'
import { KEYOF_RECORD_REDUCER, TRecordMgrItem } from '../store/config'
import { TGProfile, KEYOF_G_PROFILE_REDUCER, SERVER_RENDER } from '@app/store/globalProfile/config'
import styles from './index.module.less'

const { Content } = Layout

function RecordList(props: TRecordListProps) {
	// console.log(`RecordList.props ❤❤❤`, props)
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
	const { t } = useTranslation()
	const [pageConfig, setPageConfig] = useState(basePageConfig)
	const [formConfig, setFormConfig] = useState(baseFormConfig)
	const [tableLoading, setTableLoading] = useState<boolean>(false)
	const [isDeleteModalVisible, setIsDeleteModelVisible] = useState<boolean>(false)
	const [deleteModalTargetTitle, setDeleteModalTargetTitle] = useState<string | undefined>('')

	const handleSearch = (): void => {
		history.push({
			pathname: location.pathname,
			search: createSearchString(1, +pageConfig.pageSize, formConfig.keywords),
		})
	}

	const handleFresh = (): void => {
		history.push({
			pathname: location.pathname,
			search: createSearchString(+pageConfig.pageIndex, +pageConfig.pageSize, formConfig.keywords),
		})
	}

	const handleModifyFormInput = ($evte: any): void => {
		const value = $evte.currentTarget.value
		setFormConfig((formConfig: TBaseFormConfig) => {
			return { ...formConfig, keywords: value }
		})
	}

	const onDialogEditFormClosed = (hasSubmitedItem: boolean): void => {
		if (hasSubmitedItem) {
			fetchTableData({ ...pageConfig, ...formConfig })
		}
	}

	const onPaginationChange = (pageIndex: number, pageSize: number | undefined): void => {
		history.push({
			pathname: location.pathname,
			search: createSearchString(pageIndex, +(pageSize || basePageConfig.pageSize), formConfig.keywords),
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

	const deleteRowData = async (): Promise<void> => {
		const selectedIdList: string[] = list
			.filter((item: TRecordMgrItem, index: number) => {
				return item.isChecked
			})
			.map((item: TRecordMgrItem, index: number) => {
				return item.id
			})
		try {
			const res = await deleteItemsRequestAction(selectedIdList)
			messageTips.success(`Deleted Success`)
			setIsDeleteModelVisible(false)
		} catch (error: any) {
			messageTips.error(error.msg)
		}
	}

	const handleDeleteItem = (itemData: TRecordMgrItem) => {
		handleToggleRowSelectAction([itemData.key])
		setIsDeleteModelVisible(true)
	}

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
		const selectedList: Array<TRecordMgrItem> = list.filter((item: TRecordMgrItem, index: number) => {
			return item.isChecked
		})
		setDeleteModalTargetTitle(selectedList.length ? selectedList[0].title : '')
	}, [isDeleteModalVisible])

	return (
		<>
			<section className={styles['list-container']}>
				<section className={styles['list-wrapper']}>
					<div className={styles['list-header']}>
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
type TRecordListProps = {
	list: Array<TRecordMgrItem>
	handleToggleRowSelectAction: Function
	deleteItemsRequestAction: Function
	fetchListRequestAction: Function
	addItemRequestAction: Function
	[key: string]: any
} & RouteComponentProps &
	TGProfile
type TExpand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never
type TIRecordListProps = TExpand<TRecordListProps>

export default connect(
	(state: { [key: string]: any } = {}, ownProps) => {
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
