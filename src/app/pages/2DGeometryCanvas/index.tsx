import React from 'react'
import Form from './Form'
import Canvas from './Canvas'

function D2GeometryCanvasRoot(props: any) {
	return (
		<>
			<Canvas />
			<Form />
		</>
	)
}

export default React.memo(D2GeometryCanvasRoot)
