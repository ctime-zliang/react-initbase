import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Typography, Button } from 'antd'
import { CssRender } from 'css-render'

const { c } = CssRender() // create a css-render instance
const { Title, Paragraph } = Typography
const Container = styled.section`
	width: 100%;
	padding: 30px 30px;
`

const themeToggleMap = {
	theme1: {
		color: `red`,
	},
	theme2: {
		color: `blue`,
	},
	theme3: {
		color: `green`,
	},
}
const removeCssRenderStyle = (id: string): void => {
	const styleElement: HTMLElement | null = document.head.querySelector(`[cssr-id="${id}"]`)
	if (!styleElement) {
		return
	}
	if (styleElement && styleElement.parentElement) {
		styleElement.parentElement.removeChild(styleElement)
	}
}

function CssRenderTestRoot(props: any) {
	const rootClassName: string = 'content-container'
	const cssRender = useCallback(styleProps => {
		const styleId = `style-css-render`
		const style: { [key: string]: any } = c(
			`.${rootClassName}`,
			/*
				callback({ context, props }) 
			 */
			({ props }) => {
				props = props || {}
				return {
					margin: 0,
					...props,
				}
			},
			[
				c('&.dark', {
					backgroundColor: 'black',
				}),
				c('.content-wrapper', {
					width: '100%',
				}),
			]
		)
		// console.log(style.render(styleProps))
		removeCssRenderStyle(styleId)
		style.mount({ id: styleId, props: { ...styleProps } })
	}, [])
	const toggle = useCallback((tag: string): { [key: string]: any } | undefined => {
		const styleObj = (themeToggleMap as any)[tag]
		if (!styleObj) {
			return
		}
		cssRender(styleObj)
	}, [])

	return (
		<Container>
			<div>
				<Button
					onClick={() => {
						toggle('theme1')
					}}
				>
					Theme 1
				</Button>
				<Button
					onClick={() => {
						toggle('theme2')
					}}
				>
					Theme 2
				</Button>
				<Button
					onClick={() => {
						toggle('theme3')
					}}
				>
					Theme 3
				</Button>
			</div>
			<Typography>
				<Title>CSS Render Test</Title>
			</Typography>
			<Paragraph>
				<div className={rootClassName}>
					In the process of internal desktop applications development, many different design specs and implementations would be involved,
					which might cause designers and developers difficulties and duplication and reduce the efficiency of development.
				</div>
			</Paragraph>
		</Container>
	)
}

export default React.memo(CssRenderTestRoot)
