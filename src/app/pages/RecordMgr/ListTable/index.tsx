import React, { useCallback, useEffect, useState } from 'react'
import { Table } from 'antd'
import { listTableConfig } from './config'
import { IRecordMgrItem } from '@/store/record/config'
import { getQueryValueOfUrl } from '@/utils/utils'

const LocalConfig: any = {
	isSettedConfig: false,
	listTableConfig: {},
}
function ListTableRoot(props: IListTableRootProps) {
	const { list, loading, handleToggleRowSelect } = props
	const [selectedRowKeysList, setSelectedRowKeysList] = useState<string[]>([])

	const linkDetail = useCallback((e, itemData: IRecordMgrItem) => {
		e.preventDefault()		
		const pageIndex = +getQueryValueOfUrl('pageIndex')
		const pageSize = +getQueryValueOfUrl('pageSize')
		const keywords = decodeURI(getQueryValueOfUrl('keywords') || '')
		let str = ``
		let hasFlag = false
		if (pageIndex) {					
			str += `?pi=${pageIndex}`
			hasFlag = true
		}
		if (pageSize) {
			str += `${hasFlag ? '&' : '?'}ps=${pageSize}`
			hasFlag = true
		}
		if (keywords) {					
			str += `${hasFlag ? '&' : '?'}wd=${keywords}`
			hasFlag = true
		}
		const url = `/record/detail/${itemData.id}${str}`
		const id = `LINK_DETAIL_${itemData.id}`
		const fragment = document.createRange().createContextualFragment(`<a id=${id} href="${url}" target="_blank">-</a>`)
		document.body.appendChild(fragment)
		const aElement = document.getElementById(id)
		if (aElement) {
			aElement.click()
			document.body.removeChild(aElement)
		}
		// window.open(url)
	}, [])

	if (!LocalConfig.isSettedConfig) {
		LocalConfig.isSettedConfig = true
		LocalConfig.listTableConfig.columns = listTableConfig.columns({ ...props, linkDetail })
		LocalConfig.listTableConfig.table = listTableConfig.table({})
	}

	useEffect(() => {
		const selectedList: string[] = list
			.filter((item: IRecordMgrItem, index: number) => {
				return item.isChcked && typeof item.key != 'undefined' && item.key != ''
			})
			.map((item: IRecordMgrItem, index: number) => {
				return item.key || ''
			})
		setSelectedRowKeysList(selectedList as Array<never>)
	}, [list])

	return (
		<>
			<Table
				columns={LocalConfig.listTableConfig.columns}
				dataSource={list}
				size="small"
				loading={loading}
				{...LocalConfig.listTableConfig.table}
				rowSelection={{
					selectedRowKeys: selectedRowKeysList,
					onChange: handleToggleRowSelect,
				}}
			/>
		</>
	)
}
ListTableRoot.defaultProps = {
	list: [],
	loading: true,
}
interface IListTableRootProps {
	list: Array<IRecordMgrItem>
	loading: boolean
	handleDeleteItem: Function
	handleToggleRowSelect: Function
}

export default React.memo(ListTableRoot)
