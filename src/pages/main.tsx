import { Button } from 'antd';
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import ReactObjectTableViewer from 'react-object-table-viewer';
import Router from 'next/router';

interface PropTypes {
  children?: ReactNode;
  member?: any;
}
const main: FC<PropTypes> = (props: PropTypes) => {
  return (<Container>
    <Inner>
      <h2>로그인 성공</h2>

      <ObjectViewer data={props.member}/>

      <Button onClick={() => {
        void Router.push('/auth/logout');
      }}>로그아웃</Button>
    </Inner>
  </Container>);
};

export default main;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Inner = styled.div`
  text-align: center;
  & div {
    margin-bottom: 10px;
  }
`;

const ObjectViewer = styled(ReactObjectTableViewer)`
  th {
    background-color: #f8f8f8;    
  }

  td, th {
    border: 1px solid #ccc;
    padding: 5px 10px;
  }
  margin-bottom: 10px;
`;