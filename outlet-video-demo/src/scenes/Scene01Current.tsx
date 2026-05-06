import React from 'react';
import {SceneBase} from './SceneBase';

export const Scene01Current: React.FC = () => {
  return (
    <SceneBase
      image="/assets/scene01_factory_current.jpg"
      badge="BEFORE"
      title="原始厂区界面老旧"
      subtitle="空间价值尚未释放"
      overlay={0.54}
      zoomFrom={1.0}
      zoomTo={1.24}
      translateX={-54}
      translateY={10}
    />
  );
};
