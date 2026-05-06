import React from 'react';
import {SceneBase} from './SceneBase';

export const Scene02Overall: React.FC = () => {
  return (
    <SceneBase
      image="/assets/scene02_outlet_overall.png"
      title="焕新为南加州奥特莱斯风格街区"
      subtitle="重塑商业界面与消费场景"
      overlay={0.28}
      zoomFrom={1.01}
      zoomTo={1.07}
      translateX={8}
      translateY={0}
    />
  );
};
