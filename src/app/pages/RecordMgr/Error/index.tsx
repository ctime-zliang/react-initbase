import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.section`
	display: block;
`

function RecordErrorRoot() {
	return (
		<Container>
			<div className="error-404-content">Record Manager, 404 Not Found</div>
			<div style={{ textAlign: 'center' }}>
				<Link to={`/record`}>Link to Record List Page</Link>
			</div>
		</Container>
	)
}

export default React.memo(RecordErrorRoot)
