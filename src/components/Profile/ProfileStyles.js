import styled from "styled-components"
import { RoutesContainer, LinkButton } from "../NavBar/NavBarStyles"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Header = styled(RoutesContainer)`
  justify-content: space-between;
`

export const LogoutButton = styled(LinkButton)``

export const HeaderText = styled.p`
  margin: 10px 20px 10px;
  font-size: 16px;
  font-weight: 500;
`

export const ProfileInfo = styled.section`
  display: flex;
  flex-direction: column;
`
