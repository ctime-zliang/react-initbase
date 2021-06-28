import React from 'react'
import styled from 'styled-components'

const Container = styled.section`
    padding: 25px 65px;
`
const Wrapper = styled.div`
    padding: 0 5px;
    font-size: 12px;
`

function ModeRoot(props: IModeRootProps) {
    const { renderWay } = props
    return (
        <Container>
            <Wrapper>Render Mode: {renderWay}</Wrapper>
        </Container>
    )
}
interface IModeRootProps {
    renderWay: string
}
ModeRoot.defaultProps = {
    renderWay: '-'
}

export default React.memo(ModeRoot)