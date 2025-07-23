import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'TianGong Sustainable Supply Chain',
          title: 'TianGong Sustainable Supply Chain',
          href: 'https://www.tiangong.earth',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/linancn/tiangong-lca-next',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
