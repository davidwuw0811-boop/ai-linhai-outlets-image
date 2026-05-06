import React from 'react';
import {SceneBase} from './SceneBase';

export const Scene03Storefront: React.FC = () => {
  return (
    <SceneBase
      image="/assets/scene03_storefront_closeup.png"
      title="品牌店铺展示面"
      subtitle="开放式街区 · 沉浸式消费体验"
      overlay={0.24}
      zoomFrom={1.02}
      zoomTo={1.12}
      translateX={-18}
      translateY={2}
    />
  );
};
