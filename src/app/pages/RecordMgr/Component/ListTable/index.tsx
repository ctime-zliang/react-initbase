import React, { useCallback, useEffect, useState } from 'react'
import { Table } from 'antd'
import { listTableConfig } from './config'
import { IRecordMgrItem } from '../../store/config'

const LocalConfig: any = {
	hasInitialed: false,
	listTableConfig: {},
}
function ListTableRoot(props: IListTableRootProps) {
	const { list, loading, handleToggleRowSelect } = props
	const [selectedRowKeysList, setSelectedRowKeysList] = useState<string[]>([])

	if (!LocalConfig.hasInitialed) {
		LocalConfig.hasInitialed = true
		LocalConfig.listTableConfig.columns = listTableConfig.columns({ ...props })
		LocalConfig.listTableConfig.table = listTableConfig.table({})
	}

	useEffect(() => {
		const selectedList: string[] = list
			.filter((item: IRecordMgrItem, index: number) => {
				return item.isChecked && typeof item.key != 'undefined' && item.key != ''
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
