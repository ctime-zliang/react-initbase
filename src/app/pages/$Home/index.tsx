import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { withLoading } from '@/utils/hoc/with-loading'
import PageHeader from '@/modules/Componnet/PageHeader'
import PageFooter from '@/modules/Componnet/PageFooter'
import ClockCanvas from '@/modules/Componnet/ClockCanvas'
import SVGLoadingMask from '@/modules/Componnet/SVGLoadingMask'
import LinkCompt from './link'
import Abstract from './abstract'
import { sleep } from '@/utils/utils'

const HomeContainer = styled.section`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	align-content: space-between;
	height: 100%;
	overflow: hidden;
	opacity: 0;
`
const HomeContent = styled.div`
	width: 100%;
	height: 100%;
	overflow: auto;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-content: center;
	align-items: center;
	flex-wrap: nowrap;
`
const ClockcanvasWrapper = styled.div`
	padding: 80px 0 0 0;
`

const loadingSVGLoadingMask = withLoading(SVGLoadingMask)
function HomeRoot(props: any) {
	const [isShow, setIsShow] = useState<boolean>(false)

	const showView = useCallback(async () => {
		await sleep(500)
		setIsShow(true)
		loadingSVGLoadingMask.hide()
	}, [])

	useEffect(() => {
		loadingSVGLoadingMask.show()
		showView()
	}, [])

	return (
		<HomeContainer style={{ opacity: isShow ? 1 : 0, height: 'calc(100vh)' }}>
			<PageHeader {...props} />
			<HomeContent>
				<ClockcanvasWrapper>
					<ClockCanvas />
				</ClockcanvasWrapper>
				<Abstract />
				<LinkCompt />
			</HomeContent>
			<PageFooter {...props} />
		</HomeContainer>
	)
}

export default React.memo(HomeRoot)