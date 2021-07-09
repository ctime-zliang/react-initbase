import React, { useEffect, useState } from 'react'

export const asyncComponent = function (importComponent: any) {
	const styleObj = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		fontSize: '40px',
	}
	return (props: any) => {
		const [component, setComponent] = useState(null)
		useEffect(() => {
			importComponent().then((compt: any) => {
				// setComponent(compt.default)
				window.setTimeout(() => {
					setComponent(compt.default)
				}, 1250)
			})
		})
		const IComponent: any = component
		if (IComponent) {
			return <IComponent {...props} />
		}
		return <div style={styleObj}>Loading Async Component...</div>
	}
}
