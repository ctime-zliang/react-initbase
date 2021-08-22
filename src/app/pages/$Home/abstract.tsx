import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const Container = styled.section`
	padding: 5px 0 0 0;
	text-align: center;
`

function AbstractRoot() {
	const { t } = useTranslation()
	return (
		<Container>
			<div style={{ fontSize: '22px', color: '#666666' }}>
				<span>
					<strong>React-Initbase</strong>, {t('an application developed by React')}
				</span>
			</div>
		</Container>
	)
}

export default React.memo(AbstractRoot)
