import styled from "styled-components"
import { Link } from "react-router-dom"

export const RoutesContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: lightgray;
`

export const LinkButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  margin-top: 0;
  margin-right: 20px;
  border: none;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  background-color: lightskyblue;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
`
