import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { message as messageTips } from 'antd'
import { Spin, Button, Alert } from 'antd'
import * as actions from '../store/action'
import EditForm from '@app/pages/RecordMgr/Component/EditForm'
import { baseEditFormDataConfig, TBaseEditFormDataConfig } from '../Component/EditForm/config'
import { RouteComponentProps } from 'react-router'
import { useItemDetail } from './item-detail.hook'
import styles from './index.module.less'

/*
	从 sourceData 中过滤出指定的 key 集合并组成新的数据对象并返回
 */
const filterFormData = (sourceData: TBaseEditFormDataConfig): TBaseEditFormDataConfig | any => {
	const copyFormData: TBaseEditFormDataConfig | any = JSON.parse(JSON.stringify(sourceData))
	// const copyFormData: TBaseEditFormDataConfig | any = {}
	Object.keys(baseEditFormDataConfig).forEach((item: string, index: number): void => {
		copyFormData[item as keyof TBaseEditFormDataConfig] = sourceData[item as keyof TBaseEditFormDataConfig]
	})
	return copyFormData
}

function RecordDetail(props: TRecordDetailProps) {
	const { match, history, fetchItemRequestAction, updateItemRequestAction } = props
	const filteredFormData = filterFormData({ ...baseEditFormDataConfig, ...props })
	const [formData, setFormData] = useState<TBaseEditFormDataConfig>(filterFormData({ ...baseEditFormDataConfig, ...props }))
	const [isExists, setIsExists] = useState<boolean>(true)
	const [isSpinShow, setIsSpanShow] = useState<boolean>(true)
	const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState<boolean>(true)
	const [isSubmitBtnLoading, setIsSubmitBtnLoading] = useState<boolean>(false)
	const [errMessage, setErrMessage] = useState<string>(``)
	const [itemId, setItemId] = useState<string | number | null>(null)
	/* ... */
	const urlParams: { [key: string]: any } = match.params
	const id: string | null = urlParams && urlParams.id ? urlParams.id : null
	/* ... */
	const initialData = props.title ? { data: filteredFormData } : null
	const { data, error } = useItemDetail(id, initialData)

	const handleUpdateFormData = (paramsFormData: TBaseEditFormDataConfig) => {
		setFormData({ ...filterFormData(paramsFormData) })
	}
	const updateFormData = (paramsFormData: TBaseEditFormDataConfig) => {
		setFormData(filterFormData(paramsFormData))
	}

	// const fetchItemData = async (id: string) => {
	// 	try {
	// 		setIsExists(true)
	// 		setIsSpanShow(true)
	// 		const res = await fetchItemRequestAction(id)
	// 		handleUpdateFormData(res.data)
	// 		setIsSpanShow(false)
	// 		setIsSubmitBtnDisabled(false)
	// 	} catch (error: any) {
	// 		setIsExists(false)
	// 		setIsSpanShow(false)
	// 		messageTips.error(error.msg)
	// 		setErrMessage(error.msg)
	// 	}
	// }
	const submitItemData = async () => {
		try {
			setIsSubmitBtnLoading(true)
			const res = await updateItemRequestAction(itemId, formData)
			setIsSubmitBtnLoading(false)
			messageTips.success(`Updated Success`)
			history.push({
				pathname: '/record',
			})
		} catch (error: any) {
			messageTips.error(error.msg)
			setIsSubmitBtnLoading(false)
		}
	}

	useEffect(() => {
		if (error) {
			setIsExists(false)
			setIsSpanShow(false)
			messageTips.error(error.msg)
			setErrMessage(error.msg)
		}
		if (data) {
			handleUpdateFormData(data.data)
			setIsSpanShow(false)
			setIsSubmitBtnDisabled(false)
		}
	}, [data, error])

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
type TRecordDetailProps = {
	fetchItemRequestAction: Function
	updateItemRequestAction: Function
	[key: string]: any
} & RouteComponentProps

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
