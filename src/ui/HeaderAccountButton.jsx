import { useQueryClient } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const StyledButton = styled(motion.button)`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
`

function HeaderAccountButton() {
    const queryClient = useQueryClient()
    const user = queryClient.getQueryData(['user']).user_metadata
    const navigate = useNavigate()

    return (
        <StyledButton whileHover={{scale: 1.1}} whileFocus={{scale: 1.1}} onClick={()=>navigate('/account')}>
            <img src="../../public/default-user.jpg" alt="user" />
        </StyledButton>
    )
}

export default HeaderAccountButton
