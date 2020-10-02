import styled from 'styled-components';
import is from 'typescript-styled-is';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserList = styled.section`
  display: flex;
  flex-direction: column;
  margin: 30px 20px 0 20px;
  text-align: left;
`;

export const Title = styled.h3`
  margin: 0 0 40px 0;
  font-size: 30px;
`;

export const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserText = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserInfo = styled.div`
  display: grid;
  grid-template-columns: 200px 300px 100px 100px 100px 100px;
  grid-gap: 15px;
  margin-bottom: 30px;
`;

export const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  background-color: red;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;

  &:disabled {
    opacity: 0.5;
  }
`;

export const EditButton = styled(DeleteButton)`
  background-color: lightskyblue;
`;

export const SaveButton = styled(DeleteButton)`
  display: none;
  background-color: forestgreen;

  ${is('isVisible')`
    display: flex
  `};
`;

export const Input = styled.input`
  height: 48px;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
`;

export const Select = styled.select`
  height: 48px;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
`;
