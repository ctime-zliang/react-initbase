import React from 'react'
import { Helmet } from 'react-helmet-async'
import { connect } from 'react-redux'
import { Layout, List } from 'antd'
import { Link } from 'react-router-dom'
import PageContent from '@/modules/Componnet/PageContent'
import PageHeader from '@/modules/Componnet/PageHeader'
import PageFooter from '@/modules/Componnet/PageFooter'
import { IEntryListItem, KEY_ENTRYLINKLIST_REDUCER } from '../$Store/config'
import styles from './index.module.less'

const { Content } = Layout

function ListRoot(props: any) {
	const { list } = props
	return (
		<>
			<Helmet>
				<title>Entry Link List</title>
			</Helmet>
			<PageHeader />
			<PageContent>
				<section className={styles['list-container']}>
					<section className={styles['list-wrapper']}>
						<div className={styles['list-header']}></div>
						<Content>
							<List
								size="small"
								bordered
								dataSource={list}
								renderItem={(item: IEntryListItem, index) => {
									const number = (++index, index) <= 9 ? '0' + index : index
									return (
										<List.Item style={{ justifyContent: 'flex-start' }}>
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
			</PageContent>
			<PageFooter />
		</>
	)
}

export default connect((state: { [key: string]: any } = {}, ownProps: any) => {
	return {
		...ownProps,
		...state[KEY_ENTRYLINKLIST_REDUCER],
	}
}, {})(ListRoot)
