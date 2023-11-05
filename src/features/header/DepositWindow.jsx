import styled from "styled-components"
import { useChangeBalance } from "../../hooks/useChangeBalance"

const StyledDepositWindow = styled.div`
    
`

function DepositWindow() {
    const {changeBalance, error} = useChangeBalance()
    
    return (
        <StyledDepositWindow>
            dsadsa
        </StyledDepositWindow>
    )
}

export default DepositWindow
