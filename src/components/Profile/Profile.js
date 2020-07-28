import React, { useState, useEffect } from "react"
import jwtDecode from "jwt-decode"
import userServices from "../../services/userService"
import * as S from "./ProfileStyles"
import NavBar from "../NavBar/NavBar"

const Profile = ({ history }) => {
	const [user, setUser] = useState(null)

	const [allUsers, setAllUsers] = useState(null)

	useEffect(() => {
		const fetchUser = async () => {
			const { userId } = jwtDecode(localStorage.getItem("token"))
			const resp = await userServices.getUserById(userId)
			const result = await resp.json()

			setUser(result)
		}

		fetchUser()
	}, [])

	useEffect(() => {
		const fetchAllUsers = async () => {
			const response = await userServices.getUsers()
			const data = await response.json()
			setAllUsers(data)
		}

		fetchAllUsers()
	}, [])

	return (
		<S.Container>
			<NavBar user={user} history={history} />
			<S.ProfileInfo>
				<S.SectionTitle>Your Info</S.SectionTitle>
				<S.UserText>{user?.username}</S.UserText>
				<S.UserText>{user?.email}</S.UserText>
				<S.UserText>{user?.role}</S.UserText>
			</S.ProfileInfo>
			<S.UsersInfo>
				<S.SectionTitle>Other Users</S.SectionTitle>
				<S.OtherUsersContainer>
					{allUsers
						?.filter(el => el.id !== user?.id)
						.filter(el => el.role !== "admin")
						.map(el => (
							<S.OtherUserInfo key={el.id}>
								<S.UserText>{el?.username}</S.UserText>
								<S.UserText>{el?.email}</S.UserText>
								<S.UserText>{el?.role}</S.UserText>
							</S.OtherUserInfo>
						))}
				</S.OtherUsersContainer>
			</S.UsersInfo>
		</S.Container>
	)
}

export default Profile
