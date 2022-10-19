import React from 'react'
import { Helmet } from 'react-helmet-async'
import { connect } from 'react-redux'
import { Layout, List } from 'antd'
import { Link } from 'react-router-dom'
import styles from './index.module.less'
import { TLinkListItem } from '../../store/globalDefault/types'
import { TCommonComponentBaseProps } from '../../types/comm.types'
import { TCombineState } from '../../store/redux'

const { Content } = Layout

function ListRoot(props: TProps): React.ReactElement {
	console.log(`ListRoot ☆☆☆`, props)
	const { linkList } = props
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
							dataSource={linkList}
							renderItem={(item: any, index: number) => {
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

type TReduxStoreState = {
	linkList: Array<TLinkListItem>
}

type TReduxStoreActions = {}

type TProps = TReduxStoreState & TReduxStoreActions & TCommonComponentBaseProps

const mapStateToProps = (combineState: TCombineState): TReduxStoreState => {
	return {
		linkList: combineState.globalDefault.linkList,
	}
}

const mapActionsToProps = {}

const ListRootContainer = connect(mapStateToProps, mapActionsToProps)(ListRoot)

export default React.memo(ListRootContainer)
