import React, { FC, ReactNode } from 'react';
import { Button } from 'antd';

interface PropTypes {
  children?: ReactNode;
}
const index: FC<PropTypes> = (props: PropTypes) => {
  return (<>
    hello!
    <Button>world</Button>
  </>);
};

export default index;