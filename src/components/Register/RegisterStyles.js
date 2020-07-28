import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 350px;
  margin-top: 200px;
  border-radius: 15px;
  border: 2px solid lightgray;
  align-items: center;
  padding: 20px;

  & > input:first-child {
    margin-top: 15px;
  }
`

export const Input = styled.input`
  width: 200px;
  height: 40px;
  margin-top: 15px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
`

export const Button = styled.button`
  width: 100px;
  height: 40px;
  margin-top: 30px;
  border: none;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  background-color: lightskyblue;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;

  &:disabled {
    opacity: 0.5;
  }
`

export const Text = styled.p`
  margin: 20px 0 0 0;
  font-size: 16px;
  font-weight: 300;
`

export const ErrorText = styled.p`
  height: 20px;
  margin: 5px 0 0 0;
  color: red;
  font-size: 10px;
`
