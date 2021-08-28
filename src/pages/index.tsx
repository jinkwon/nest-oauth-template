import React, { FC } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

const index: FC = () => {

  return (<Container>
    <Inner>
      <div>
        <h2>Hello World</h2>
      </div>
      <div>
        <Button onClick={() => {
          location.href ='/oauth-google';
        }}>구글 로그인</Button>
      </div>
      <div>
        <Button onClick={() => {
          location.href = '/oauth-kakao';
        }}>카카오 로그인</Button>
      </div>
    </Inner>
  </Container>);
};

export default index;

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
