import React from 'react';
import {SceneBase} from './SceneBase';

export const Scene02Overall: React.FC = () => {
  return (
    <SceneBase
      image="/assets/scene02_outlet_overall.png"
      badge="AFTER"
      title="焕新为南加州奥特莱斯风格街区"
      subtitle="重塑商业界面与消费场景"
      overlay={0.30}
      zoomFrom={1.0}
      zoomTo={1.22}
      translateX={46}
      translateY={-8}
    />
  );
};
