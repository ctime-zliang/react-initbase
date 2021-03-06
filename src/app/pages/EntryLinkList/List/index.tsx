import React from 'react'
import { Helmet } from 'react-helmet-async'
import { connect } from 'react-redux'
import { Layout, List } from 'antd'
import { Link } from 'react-router-dom'
import { KEYOF_ENTRYLINKLIST_REDUCER } from '../store/config'
import { TEntryListItem } from '../store/types'
import styles from './index.module.less'

const { Content } = Layout

function ListRoot(props: any) {
	const { list } = props
	return (
		<>
			<Helmet>
				<title>Entry Link List</title>
			</Helmet>
			<section className={styles['list-container']}>
				<section className={styles['list-wrapper']}>
					<div className={styles['list-header']}>
						<span>Entry Link List</span>
					</div>
					<Content>
						<List
							size="small"
							bordered
							dataSource={list}
							renderItem={(item: TEntryListItem, index: number) => {
								const number: string = (++index, index) <= 9 ? '0' + index : String(index)
								return (
									<List.Item className="entry-linklist" style={{ justifyContent: 'flex-start' }}>
										<span style={{ paddingRight: '6px' }}>{number}.</span>
										<Link className={styles['link-item']} to={{ pathname: `${item.path}` }}>
											{item.title}
										</Link>
									</List.Item>
								)
							}}
						/>
					</Content>
				</section>
			</section>
		</>
	)
}

export default connect((state: { [key: string]: any } = {}, ownProps: { [key: string]: any } = {}): void => {
	return {
		...ownProps,
		...state[KEYOF_ENTRYLINKLIST_REDUCER],
	}
}, {})(ListRoot)
