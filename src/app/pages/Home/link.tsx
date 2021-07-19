import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Container = styled.section`
	text-align: center;
	padding: 0 0 35px 0;
`

function AbstractRoot() {
	const { t } = useTranslation()
	return (
		<Container>
			<div style={{ fontSize: '12px', paddingTop: '5px' }}>
				<span>
					<Link to="/link">[{t('Click here to enter the Link List page')}]</Link>
				</span>
			</div>
		</Container>
	)
}

export default React.memo(AbstractRoot)
