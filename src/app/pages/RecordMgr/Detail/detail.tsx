import React, { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { message as messageTips } from 'antd'
import { Spin, Button, Alert } from 'antd'
import { KEY_RECORD_REDUCER } from '../$Store/config'
import * as actions from '../$Store/action'
import EditForm from '../Component/EditForm'
import { baseEditFormDataConfig, BaseEditFormDataConfigType, IBaseEditFormDataConfig } from '../Component/EditForm/config'
import { RouteComponentProps } from 'react-router'
import { getQueryValueOfUrl } from '@/utils/utils'
import styles from './index.module.less'

const filterFormData = (paramsFormData: IBaseEditFormDataConfig): IBaseEditFormDataConfig => {
	const copyFormData = JSON.parse(JSON.stringify(paramsFormData))
	Object.keys(baseEditFormDataConfig).forEach((item: string, index: number): void => {
		copyFormData[item as BaseEditFormDataConfigType] = paramsFormData[item as BaseEditFormDataConfigType]
	})
	return copyFormData
}

function RecordDetailRoot(props: IRecordDetailRootProps) {
	const { match, history, fetchItemRequestAction, updateItemRequestAction } = props
	const [formData, setFormData] = useState(baseEditFormDataConfig)
	const [isExists, setIsExists] = useState<boolean>(true)
	const [isSpinShow, setIsSpanShow] = useState<boolean>(true)
	const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState<boolean>(true)
	const [isSubmitBtnLoading, setIsSubmitBtnLoading] = useState<boolean>(false)
	const [errMessage, setErrMessage] = useState<string>(``)
	const [itemId, setItemId] = useState<string | number | null>(null)

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
		const urlParams: { [key: string]: any } = match.params
		if (urlParams && urlParams.id) {
			setItemId(urlParams.id)
			fetchItemData(urlParams.id)
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
RecordDetailRoot.defaultProps = {}
interface IRecordDetailRootProps extends RouteComponentProps {
	fetchItemRequestAction: Function
	updateItemRequestAction: Function
}

export default connect(
	(state: { [key: string]: any } = {}, ownProps) => {
		return {
			...ownProps,
			...state[KEY_RECORD_REDUCER],
		}
	},
	{
		...actions,
	}
)(RecordDetailRoot)
