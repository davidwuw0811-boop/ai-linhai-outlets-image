import React from 'react';
import {SceneBase} from './SceneBase';

export const Scene01Current: React.FC = () => {
  return (
    <SceneBase
      image="/assets/scene01_factory_current.jpg"
      title="原始厂区界面老旧"
      subtitle="空间价值尚未释放"
      overlay={0.48}
      zoomFrom={1.02}
      zoomTo={1.08}
      translateX={-10}
      translateY={4}
    />
  );
};
