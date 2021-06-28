import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

export const withLoading = function (WrappedComponent: any) {
	let container: any = null
	const EnhancedComponent: any = (props: any) => {
		const [loadState, setLoadState] = useState({
			isHide: false,
		})
		EnhancedComponent.loadState = loadState
		EnhancedComponent.setLoadState = setLoadState
		return (
			<main>
				<WrappedComponent {...loadState} {...props} __isInLoading={true} onHideEnd={EnhancedComponent._onHideEnd} />
			</main>
		)
	}
	EnhancedComponent.setLoadState = new Function()
	EnhancedComponent._onHideEnd = () => {
		if (!container) {
			return
		}
		ReactDOM.unmountComponentAtNode(container)
		document.body.removeChild(container)
	}
	EnhancedComponent.show = () => {
		container = document.createElement('section')
		document.body.appendChild(container)
		ReactDOM.render(<EnhancedComponent />, container)
	}
	EnhancedComponent.hide = () => {
		if (!container) {
			return
		}
		window.setTimeout(() => {
			EnhancedComponent.setLoadState({
				...EnhancedComponent.loadState,
				isHide: true,
			})
			EnhancedComponent.loadState = null
			EnhancedComponent.setLoadState = new Function()
		})
	}
	return EnhancedComponent
}
