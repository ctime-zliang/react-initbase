import React from 'react'
import { Button, Row, Col, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import EditForm from '../EditForm'
import { message as messageTips } from 'antd'
import { withDialog } from '@/utils/hoc/with-dialog'
import { baseEditFormDataConfig, IBaseEditFormDataConfig } from '../EditForm/config'
import { baseFormConfig } from '../../List/config'
import formStyles from './index.module.css'
import './index.css'

/*
	将表单组件的声明式调用修改为命令式调用
 */
const dialogEditForm = withDialog(EditForm)

function ListFilterFormRoot(props: IListFilterFormRootProps) {
	const { keywordsValue, handleKeywordsEnterAction, handleKeywordsChangeAction, handleRefreshAction, handleAddItem, onDialogEditFormClosed } = props
	const { t } = useTranslation()
	let hasSubmitedItem: boolean = false

	const handleSearch = ($evte: any): void => {
		handleKeywordsEnterAction($evte)
	}

	const showDialogEditForm = (): void => {
		dialogEditForm.open({
			title: 'Add Item',
			width: '55%',
			confirmLoading: false,
			onOk() {
				const { formData }: { formData: IBaseEditFormDataConfig } = dialogEditForm.getData()
				submitItemData(formData)
			},
			onCancel() {
				onDialogEditFormClosed(hasSubmitedItem)
			},
			data: {
				contentInputElementHeight: 100,
				formData: JSON.parse(JSON.stringify(baseEditFormDataConfig)),
			},
			methods: {
				updateFormData(data: any) {
					dialogEditForm.setData({ formData: { ...data } })
				},
				async handleSubmitRequest() {
					const { formData }: { formData: IBaseEditFormDataConfig } = dialogEditForm.getData()
					submitItemData(formData)
				},
			},
		})
	}

	const submitItemData = async (formData: IBaseEditFormDataConfig): Promise<{ [key: string]: any } | undefined> => {
		try {
			if (!formData.title.trim()) {
				messageTips.error(`Title Empty`)
				return
			}
			hasSubmitedItem = true
			dialogEditForm.setProps((preProps: any) => {
				return { ...preProps, confirmLoading: true }
			})
			await handleAddItem(formData)
			Object.keys(formData).forEach((item: string, index: number): void => {
				formData[item as keyof IBaseEditFormDataConfig] = ''
			})
			dialogEditForm.setData({ formData })
			dialogEditForm.setProps((preProps: any) => {
				return { ...preProps, confirmLoading: false }
			})
			messageTips.success(`Added Success!`)
		} catch (e: any) {
			dialogEditForm.setProps((preProps: any) => {
				return { ...preProps, confirmLoading: false }
			})
			messageTips.error(e.msg)
		}
	}

	return (
		<>
			<Row style={{ width: '100%' }}>
				<Col span={12} style={{ paddingRight: '10px' }}>
					<Input
						allowClear={true}
						placeholder={t('record.Input Something...')}
						onPressEnter={handleSearch}
						onChange={handleKeywordsChangeAction}
						value={keywordsValue}
						onFocus={$evte => {
							$evte.target.select()
						}}
					/>
				</Col>
				<Col span={12} className={formStyles['search-btn-container']}>
					<Button onClick={handleSearch} className={formStyles['search-btn-item']}>
						{t('Search')}
					</Button>
					<Button onClick={handleRefreshAction} className={formStyles['search-btn-item']}>
						{t('Refresh')}
					</Button>
				</Col>
			</Row>
			<Row>
				<Button onClick={showDialogEditForm} className="search-btn-item-extra" style={{ marginLeft: '5px' }}>
					{t('record.Add Items')}
				</Button>
			</Row>
		</>
	)
}
ListFilterFormRoot.defaultProps = {
	keywordsValue: baseFormConfig.keywords,
}
interface IListFilterFormRootProps {
	keywordsValue: string
	handleKeywordsEnterAction: React.KeyboardEventHandler
	handleKeywordsChangeAction: React.ChangeEventHandler
	handleRefreshAction: React.MouseEventHandler
	handleAddItem: Function
	onDialogEditFormClosed: Function
}

export default React.memo(ListFilterFormRoot)
