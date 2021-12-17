import React from 'react'
import Form from './Form'
import Canvas from './Canvas'

function D3GeometryCanvasRoot(props: any) {
	return (
		<>
			<Canvas />
			<Form />
		</>
	)
}

export default React.memo(D3GeometryCanvasRoot)
