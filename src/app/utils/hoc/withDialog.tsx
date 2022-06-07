import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Modal } from 'antd'

export const withDialog = function (WrappedComponent: any) {
	let container: any = null
	const EnhancedComponent: any = (props: any) => {
		const { methods, data } = props
		const [iData, setIData] = useState(data)
		const [iProps, setProps] = useState(props)
		EnhancedComponent.setData = setIData
		EnhancedComponent.getData = () => {
			return typeof iData == 'object' ? JSON.parse(JSON.stringify(iData)) : iData
		}
		EnhancedComponent.setProps = setProps
		EnhancedComponent.getProps = () => {
			return iProps
		}
		useEffect(() => {
			props.onMounted && props.onMounted()
			props.onUpdate && props.onUpdate(iData)
			return () => {
				props.onUnmounted && props.onUnmounted()
			}
		}, [])
		return (
			<Modal maskClosable={false} {...iProps} visible={true}>
				<WrappedComponent {...(iData || {})} {...(methods || {})} __isInModal={true} />
			</Modal>
		)
	}
	EnhancedComponent.open = (params: any) => {
		container = document.createElement('section')
		document.body.appendChild(container)
		const handleClose = () => {
			const { onCancel } = params
			if (typeof onCancel === 'function' && onCancel() === false) {
				return
			}
			EnhancedComponent.close()
		}
		ReactDOM.render(<EnhancedComponent {...params} onCancel={handleClose} />, container)
	}
	EnhancedComponent.close = () => {
		if (!container) {
			return
		}
		ReactDOM.unmountComponentAtNode(container)
		document.body.removeChild(container)
		EnhancedComponent.setData = new Function()
		EnhancedComponent.getData = new Function()
	}
	EnhancedComponent.setData = new Function()
	EnhancedComponent.getData = new Function()
	EnhancedComponent.setProps = new Function()
	EnhancedComponent.getProps = new Function()
	return EnhancedComponent
}

/*
	const dialogComponent = withDialog(component)
	dialogEditForm.open({
		title: 'Dialog Title',
		width: '50%',
		confirmLoading: false,
		onOk() {
			//...
		},
		onCancel() {
			//...
		},
		data: {
			//...
		},
		methods: {
			//...
		},
	})
 */
