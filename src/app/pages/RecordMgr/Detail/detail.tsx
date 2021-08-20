import React, { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { message as messageTips } from 'antd'
import { Spin, Button, Alert } from 'antd'
import * as actions from '../store/action'
import EditForm from '../Component/EditForm'
import { baseEditFormDataConfig, IBaseEditFormDataConfig } from '../Component/EditForm/config'
import { RouteComponentProps } from 'react-router'
import { getQueryValueOfUrl } from '@/utils/utils'
import { useItemDetail } from './item-detail.hook'
import styles from './index.module.less'

/*
	从 sourceData 中过滤出指定的 key 集合并组成新的数据对象并返回
 */
const filterFormData = (sourceData: IBaseEditFormDataConfig): IBaseEditFormDataConfig => {
	const copyFormData = JSON.parse(JSON.stringify(sourceData))
	Object.keys(baseEditFormDataConfig).forEach((item: string, index: number): void => {
		copyFormData[item as keyof IBaseEditFormDataConfig] = sourceData[item as keyof IBaseEditFormDataConfig]
	})
	return copyFormData
}

function RecordDetail(props: IRecordDetailProps) {
	console.log(`========= RecordDetail >>>>>`, props)
	const { match, history, fetchItemRequestAction, updateItemRequestAction } = props
	const [formData, setFormData] = useState<IBaseEditFormDataConfig>(filterFormData({ ...baseEditFormDataConfig, ...props }))
	const [isExists, setIsExists] = useState<boolean>(true)
	const [isSpinShow, setIsSpanShow] = useState<boolean>(true)
	const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState<boolean>(true)
	const [isSubmitBtnLoading, setIsSubmitBtnLoading] = useState<boolean>(false)
	const [errMessage, setErrMessage] = useState<string>(``)
	const [itemId, setItemId] = useState<string | number | null>(null)
	/* ... */
	const urlParams: { [key: string]: any } = match.params
	const id = urlParams && urlParams.id ? urlParams.id : null

	const { data, error } = useItemDetail(id)
	console.log(data, error)

	const handleUpdateFormData = (paramsFormData: IBaseEditFormDataConfig) => {
		setFormData({ ...filterFormData(paramsFormData) })
	}
	const updateFormData = (paramsFormData: IBaseEditFormDataConfig) => {
		setFormData(filterFormData(paramsFormData))
	}

	const fetchItemData = async (id: string) => {
		try {
			setIsExists(true)
			setIsSpanShow(true)
			const res = await fetchItemRequestAction(id)
			handleUpdateFormData(res.data)
			setIsSpanShow(false)
			setIsSubmitBtnDisabled(false)
		} catch (error) {
			setIsExists(false)
			setIsSpanShow(false)
			messageTips.error(error.msg)
			setErrMessage(error.msg)
		}
	}
	const submitItemData = async () => {
		try {
			setIsSubmitBtnLoading(true)
			const res = await updateItemRequestAction(itemId, formData)
			setIsSubmitBtnLoading(false)
			messageTips.success(`Updated Success`)
			window.setTimeout(() => {
				const pageIndex = +getQueryValueOfUrl('pi')
				const pageSize = +getQueryValueOfUrl('ps')
				const keywords = decodeURI(getQueryValueOfUrl('wd') || '')
				let str = ``
				let hasFlag = false
				if (pageIndex) {
					str += `?pageIndex=${pageIndex}`
					hasFlag = true
				}
				if (pageSize) {
					str += `${hasFlag ? '&' : '?'}pageSize=${pageSize}`
					hasFlag = true
				}
				if (keywords) {
					str += `${hasFlag ? '&' : '?'}keywords=${keywords}`
					hasFlag = true
				}
				const pm = {
					pathname: '/record',
					search: str,
				}
				history.push(pm)
			})
		} catch (error) {
			messageTips.error(error.msg)
			setIsSubmitBtnLoading(false)
		}
	}

	useEffect(() => {
		if (id) {
			setItemId(id)
			// fetchItemData(urlParams.id)
			return
		}
		setIsSubmitBtnDisabled(false)
	}, [])

	return (
		<>
			<div className={styles['detail-container']}>
				<div className={[styles['error-wrapper'], !isExists ? styles['error-wrapper-show'] : ''].join(' ')}>
					<Alert message={errMessage} type="error" />
				</div>
				<EditForm formData={formData} updateFormData={updateFormData} />
				<Spin className={[styles['detail-spin'], isSpinShow ? styles['detail-spin-show'] : ''].join(' ')} />
				<div className={styles['submit-wrapper']}>
					<Button type="primary" disabled={isSubmitBtnDisabled} loading={isSubmitBtnLoading} onClick={submitItemData}>
						Submit
					</Button>
				</div>
			</div>
		</>
	)
}
RecordDetail.defaultProps = {}
interface IRecordDetailProps extends RouteComponentProps {
	fetchItemRequestAction: Function
	updateItemRequestAction: Function
	[key: string]: any
}

export default connect(
	(state: { [key: string]: any } = {}, ownProps) => {
		return {
			...ownProps,
		}
	},
	{
		...actions,
	}
)(RecordDetail)
