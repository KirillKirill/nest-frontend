import styled from "styled-components"
import { Form, Input, Button } from "../Register/RegisterStyles"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.h3`
  margin: 50px 0 0 0;
`

export const EditForm = styled(Form)`
  margin-top: 50px;
  height: 300px;
`

export const EditInput = styled(Input)`
  width: 200px;
  height: 40px;
  margin-top: 15px;
  margin-left: 15px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
`

export const Label = styled.label``

export const EditButton = styled(Button)``

export const DeleteButton = styled(EditButton)`
  background-color: red;
`
