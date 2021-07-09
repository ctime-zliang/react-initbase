import React, { useEffect, useState } from 'react'
import { Form, Input } from 'antd'
import { baseConfig, IBaseEditFormDataConfig } from './config'

function EditFormRoot(props: IEditFormRootProps) {
	const { formData, updateFormData, handleSubmitRequest } = props
	const [addItemForm] = Form.useForm()
	const [config] = useState({
		...baseConfig,
		...props,
	})
	const layout: { [key: string]: any } = {
		labelCol: {
			style: { width: '100px' },
		},
		wrapperCol: {
			style: { width: 'calc(100% - 100px)' },
		},
	}

	const onValuesChange = (changedValues: any, allValues: any) => {
		updateFormData && updateFormData({ ...allValues })
	}

	useEffect(() => {
		addItemForm.setFieldsValue({
			...formData,
		})
	}, [formData])

	return (
		<>
			<Form
				{...layout}
				name="basic"
				form={addItemForm}
				initialValues={formData}
				onValuesChange={onValuesChange}
				style={{ paddingRight: '50px' }}
			>
				<Form.Item label="Title" name="title">
					<Input onPressEnter={handleSubmitRequest} />
				</Form.Item>
				<Form.Item label="Content" name="content">
					<Input.TextArea style={{ height: config.contentInputElementHeight }} />
				</Form.Item>
				<Form.Item label="Extra" name="extra">
					<Input.TextArea />
				</Form.Item>
			</Form>
		</>
	)
}
EditFormRoot.defaultProps = {
	contentInputElementHeight: baseConfig.contentInputElementHeight,
	formData: {},
}
interface IEditFormRootProps {
	contentInputElementHeight?: number
	formData: IBaseEditFormDataConfig
	updateFormData: Function
	handleSubmitRequest?: React.KeyboardEventHandler
}

export default React.memo(EditFormRoot)