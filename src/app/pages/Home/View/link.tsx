import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.section`
	padding: 0 0 35px 0;
`

function AbstractRoot() {
	return (
		<Container>
			<div style={{ fontSize: '12px', paddingTop: '5px', display: 'none' }}>
				<span>
					<Link to="/record">[点击此处进入 Record List 页面]</Link>
				</span>
			</div>
		</Container>
	)
}

export default React.memo(AbstractRoot)
