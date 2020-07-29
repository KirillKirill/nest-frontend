import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const ProfileInfo = styled.section`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 20px;
`

export const SectionTitle = styled.h3`
  margin: 20px 0;
`

export const UserText = styled.p`
  margin: 0 0 15px;
`

export const UsersInfo = styled.section`
  margin: 20px 20px 0 20px;
  text-align: left;
`

export const OtherUsersContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const OtherUserInfo = styled.div`
  display: grid;
  grid-template-columns: 200px 300px 100px;
  grid-gap: 15px;
`
