import { Button } from 'antd';
import React, { FC, ReactNode } from 'react';
import ReactObjectTableViewer from 'react-object-table-viewer';
import Router from 'next/router';

interface PropTypes {
  children?: ReactNode;
  member?: any;
}
const main: FC<PropTypes> = (props: PropTypes) => {
  return (<>
    로그인 성공
    <ReactObjectTableViewer data={props.member}/>

    <Button onClick={() => {
      void Router.push('/auth/logout');
    }}>로그아웃</Button>
  </>);
};

export default main;