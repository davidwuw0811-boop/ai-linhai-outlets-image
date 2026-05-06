import React from 'react';
import {SceneBase} from './SceneBase';

export const Scene04Interior: React.FC = () => {
  return (
    <SceneBase
      image="/assets/scene04_store_interior.png"
      title="从街区到店内"
      subtitle="形成完整消费动线体验"
      overlay={0.22}
      zoomFrom={1.01}
      zoomTo={1.08}
      translateX={0}
      translateY={-4}
    />
  );
};
