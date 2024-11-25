import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const containerStyle: { [key: string]: string | number } = {
	textAlign: 'center',
	padding: '0 0 35px 0',
	fontSize: '12px',
	paddingTop: '5px',
}

function LinkRoot(props: any): React.ReactElement {
	const { t } = useTranslation()
	return (
		<>
			<div style={containerStyle}>
				<span>
					<Link to="/link">[{t('Click here to enter the Link List page')}]</Link>
				</span>
			</div>
		</>
	)
}

export default React.memo(LinkRoot)
