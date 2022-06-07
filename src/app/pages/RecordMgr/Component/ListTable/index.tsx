import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { listTableConfig } from './config'
import { TRecordMgrItem } from '../../store/types'

const LocalConfig: any = {
	hasInitialed: false,
	listTableConfig: {},
}
function ListTableRoot(props: TListTableRootProps) {
	const { list, loading, handleToggleRowSelect } = props
	const [selectedRowKeysList, setSelectedRowKeysList] = useState<string[]>([])

	if (!LocalConfig.hasInitialed) {
		LocalConfig.hasInitialed = true
		LocalConfig.listTableConfig.columns = listTableConfig.columns({ ...props })
		LocalConfig.listTableConfig.table = listTableConfig.table({})
	}

	useEffect(() => {
		const selectedList: string[] = list
			.filter((item: TRecordMgrItem, index: number): boolean => {
				return item.isChecked && typeof item.key != 'undefined' && item.key != ''
			})
			.map((item: TRecordMgrItem, index: number): string => {
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
type TListTableRootProps = {
	list: Array<TRecordMgrItem>
	loading: boolean
	handleDeleteItem: Function
	handleToggleRowSelect: Function
}

export default React.memo(ListTableRoot)
