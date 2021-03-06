import styled from 'styled-components';
import is from 'typescript-styled-is';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: lightgray;

  ${is('isAuth')`
    justify-content: space-between
  `};
`;

export const LeftHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

export const RightHeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

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
`;

export const HeaderText = styled.p`
  margin: 10px 20px 10px 0;
  font-size: 16px;
  font-weight: 500;
`;
