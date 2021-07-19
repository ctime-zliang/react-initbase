import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { withLoading } from '@/utils/hoc/with-loading'
import ClockCanvas from '@/modules/Componnet/ClockCanvas'
import SVGLoadingMask from '@/modules/Componnet/SVGLoadingMask'
import LinkCompt from './link'
import Abstract from './abstract'

const HomeContainer = styled.section`
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	align-content: space-between;
	overflow: hidden;
	opacity: 0;
`
const ClockcanvasWrapper = styled.div`
	padding: 80px 0 0 0;
`

const loadingSVGLoadingMask = withLoading(SVGLoadingMask)
function HomeRoot() {
	const [isShow, setIsShow] = useState<boolean>(false)

	useEffect(() => {
		loadingSVGLoadingMask.show()
		window.setTimeout(() => {
			setIsShow(true)
			loadingSVGLoadingMask.hide()
		}, 500)
	}, [])

	return (
		<HomeContainer style={{ opacity: isShow ? 1 : 0 }}>
			<ClockcanvasWrapper>
				<ClockCanvas />
			</ClockcanvasWrapper>
			<Abstract />
			<LinkCompt />
		</HomeContainer>
	)
}

export default React.memo(HomeRoot)
