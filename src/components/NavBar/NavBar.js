import React from "react"
import * as S from "./NavBarStyles"
import authServices from "../../services/authService"

const NavBar = ({ history, user }) => {
	const onLogoutClick = () => {
		authServices
			.logout()
			.then(res => res.json())
			.then(() => {
				localStorage.removeItem("token")
				history.push("/")
			})
	}

	return (
		<S.Container isAuth={!!user}>
			{localStorage.getItem("token") ? (
				<>
					<S.HeaderText>{`Hey, ${user?.username}!`}</S.HeaderText>
					<S.LinkButton to="/" onClick={onLogoutClick}>
						Log Out
					</S.LinkButton>
				</>
			) : (
				<>
					<S.LinkButton to="/register">Sign Up</S.LinkButton>
					<S.LinkButton to="/login">Login</S.LinkButton>
				</>
			)}
		</S.Container>
	)
}

export default NavBar
