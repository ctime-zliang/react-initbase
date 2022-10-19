import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Clock from '../../../utils/clockCanvas'

const Container = styled.section`
	display: flex;
	justify-content: center;
	align-content: center;
	align-items: center;
	flex-wrap: nowrap;
`

function ClockCanvasRoot() {
	const clockReference = useRef<any>(null as any)
	const canvsElementReference = useRef<any>(null as any)
	const canvasWidth: number = 400
	const canvasHeight: number = 400
	const renderClock = (): void => {
		clockReference.current = new Clock(canvsElementReference.current, {
			canvasWidth,
			canvasHeight,
			clockRadius: 165,
		})
		clockReference.current.render()
	}
	useEffect((): (() => void) => {
		renderClock()
		return () => {
			clockReference.current && clockReference.current.cancel()
		}
	}, [])
	return (
		<Container>
			<canvas ref={canvsElementReference} width={canvasWidth} height={canvasHeight}></canvas>
		</Container>
	)
}

export default React.memo(ClockCanvasRoot)
