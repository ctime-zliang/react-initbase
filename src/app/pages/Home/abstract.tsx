import React from 'react'
import styled from 'styled-components'

const Container = styled.section`
	padding: 5px 0 0 0;
	text-align: center;
`

function AbstractRoot() {
	return (
		<Container>
			<div style={{ fontSize: '22px', color: '#666666' }}>
				<span>
					<em>React-Initbase</em>，一个使用{' '}
					<a href="https://zh-hans.reactjs.org/" target="_blank" title="点击此处访问 React 中文官网">
						React
					</a>{' '}
					编写的应用
				</span>
			</div>
		</Container>
	)
}

export default React.memo(AbstractRoot)
