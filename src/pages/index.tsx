import React, {
  FC,
  useEffect
} from 'react';
import {
  Button,
  message
} from 'antd';
import styled from 'styled-components';
import {
  NextRouter,
  useRouter
} from 'next/router';

const Index: FC = () => {
  const router: NextRouter = useRouter();
  useEffect(() => {
    const eCode: string = router?.query?.eCode as string;
    if (eCode === '401') {
      void message.warn(`접근 권한이 없습니다.`);
    }
  }, [router?.query]);

  return (<Container>
    <Inner>
      <div>
        <h2>Oauth Template</h2>
      </div>
      <div>
        <Btn onClick={() => {
          location.href = '/oauth-google';
        }}>구글 로그인</Btn>
      </div>
      <div>
        <Btn onClick={() => {
          location.href = '/oauth-kakao';
        }}>카카오 로그인</Btn>
      </div>
      <div>
        <Btn onClick={() => {
          location.href = '/oauth-naver';
        }}>네이버 로그인</Btn>
      </div>
    </Inner>
  </Container>);
};

export default Index;

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

const Btn = styled(Button)`
  min-width: 200px;
  font-size: 12px;
`;
