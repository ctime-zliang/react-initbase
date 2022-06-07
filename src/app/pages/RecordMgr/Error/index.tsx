import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.section`
	display: block;
	& .error-404-content {
		padding: 100px 0 30px 0;
		text-align: center;
		font-size: 24px;
	}
	& a {
		font-size: 12px;
	}
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
