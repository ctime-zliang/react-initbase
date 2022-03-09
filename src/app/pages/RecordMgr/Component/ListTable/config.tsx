import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import { TRecordMgrItem } from '../../store/config'
import { Link } from 'react-router-dom'

const Container = styled.div`
	width: 100%;
`
const TextOverflowEllipsis = styled.div`
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	word-break: break-all;
`

const ContentTdView = (props: any) => {
	const { value } = props
	return (
		<Container>
			<TextOverflowEllipsis>{value}</TextOverflowEllipsis>
		</Container>
	)
}

export const listTableConfig = {
	table(profile: any) {
		return {
			pagination: false,
		}
	},
	columns(profile: any) {
		return [
			{
				title: 'No.',
				dataIndex: 'rowIndex',
				width: '5%',
				render(value: number) {
					return <div>{value || 0}</div>
				},
			},
			{
				title: 'ID',
				dataIndex: 'id',
				width: '5%',
				render(value: string) {
					return <div>{value}</div>
				},
			},
			{
				title: 'Title',
				dataIndex: 'title',
				width: '40%',
				render(value: string) {
					return <div>{value}</div>
				},
			},
			{
				title: 'Content',
				dataIndex: 'content',
				width: '30%',
				render(value: string) {
					return <ContentTdView value={value} />
				},
			},
			{
				title: 'Action',
				dataIndex: 'key',
				width: '20%',
				render(value: string, itemData: TRecordMgrItem, index: number) {
					return (
						<>
							<Button
								type="link"
								className="table-op-btn"
								loading={itemData.isLoading}
								style={{ paddingLeft: 0, paddingRight: 0 }}
								onClick={() => {
									profile.handleDeleteItem(itemData)
								}}
							>
								[delete]
							</Button>
							<span style={{ padding: '0 5px' }}>/</span>
							<Link to={{ pathname: `/record/detail/${itemData.id}` }} target="_blank">
								[detail]
							</Link>
						</>
					)
				},
			},
		]
	},
}
