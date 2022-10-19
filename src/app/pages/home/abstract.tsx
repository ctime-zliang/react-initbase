import React from 'react'
import { useTranslation } from 'react-i18next'

const containerStyle: { [key: string]: string | number } = {
	textAlign: 'center',
	padding: '5px 0 0 0',
	fontSize: '22px',
	color: '#666666',
}

function AbstractRoot(props: any): React.ReactElement {
	const { t } = useTranslation()
	return (
		<>
			<div style={containerStyle}>
				<span>{t('An application developed by React')}</span>
			</div>
		</>
	)
}

export default React.memo(AbstractRoot)
