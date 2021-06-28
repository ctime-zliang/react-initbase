import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import './index.less'

const MaskContainer = styled.section`
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	z-index: 99999;
	background-color: #ffffff;
	opacity: 1;
`
const MaskContent = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	align-content: center;
`

function SVGLoadingMaskRoot(props: ISVGLoadingMaskRootProps) {
	const { isHide, onHideEnd } = props
	const contentElementReference = useRef<any>(null as any)

	useEffect(() => {
		contentElementReference.current.addEventListener(
			'animationend',
			function () {
				onHideEnd && onHideEnd()
			},
			false
		)
	}, [])

	return (
		<MaskContainer ref={contentElementReference} className={isHide ? 'loading-hidden-animate' : ''}>
			<MaskContent>
				<svg
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					x="0px"
					y="0px"
					width="24px"
					height="30px"
					viewBox="0 0 24 30"
					xmlSpace="preserve"
				>
					<rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2">
						<animate
							attributeName="opacity"
							attributeType="XML"
							values="0.2; 1; .2"
							begin="0s"
							dur="0.6s"
							repeatCount="indefinite"
						></animate>
						<animate
							attributeName="height"
							attributeType="XML"
							values="10; 20; 10"
							begin="0s"
							dur="0.6s"
							repeatCount="indefinite"
						></animate>
						<animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
					</rect>
					<rect x="8" y="10" width="4" height="10" fill="#333" opacity="0.2">
						<animate
							attributeName="opacity"
							attributeType="XML"
							values="0.2; 1; .2"
							begin="0.15s"
							dur="0.6s"
							repeatCount="indefinite"
						></animate>
						<animate
							attributeName="height"
							attributeType="XML"
							values="10; 20; 10"
							begin="0.15s"
							dur="0.6s"
							repeatCount="indefinite"
						></animate>
						<animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
					</rect>
					<rect x="16" y="10" width="4" height="10" fill="#333" opacity="0.2">
						<animate
							attributeName="opacity"
							attributeType="XML"
							values="0.2; 1; .2"
							begin="0.3s"
							dur="0.6s"
							repeatCount="indefinite"
						></animate>
						<animate
							attributeName="height"
							attributeType="XML"
							values="10; 20; 10"
							begin="0.3s"
							dur="0.6s"
							repeatCount="indefinite"
						></animate>
						<animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
					</rect>
				</svg>
			</MaskContent>
		</MaskContainer>
	)
}
SVGLoadingMaskRoot.defaultProps = {
	isHide: false,
}
interface ISVGLoadingMaskRootProps {
	isHide: boolean
	onHideEnd: Function
}

export default React.memo(SVGLoadingMaskRoot)
