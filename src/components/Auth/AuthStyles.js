import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

export const RoutesContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: lightgray;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
  margin-top: 200px;
  border-radius: 15px;
  border: 2px solid lightgray;
  align-items: center;
  padding: 20px;
`

export const Input = styled.input`
  width: 200px;
  height: 40px;
  margin-bottom: 20px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
`

export const Button = styled.button`
  width: 100px;
  height: 40px;
  margin-top: 50px;
  border: none;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  background-color: lightskyblue;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
`

export const RouteButton = styled(Button)`
  margin-right: 20px;
  margin-top: 0;
`
