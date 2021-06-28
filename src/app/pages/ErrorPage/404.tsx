import React from 'react'
import { Link } from 'react-router-dom'
import './index.less'

function Error404PageRoot() {
	return (
		<>
			<div className="error-404-content">404 Not Found</div>
			<div style={{ textAlign: 'center' }}>
				<Link to={`/`}>Link to Home Page</Link>
			</div>
		</>
	)
}

export default React.memo(Error404PageRoot)
