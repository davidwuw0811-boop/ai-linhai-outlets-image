import {Composition} from 'remotion';
import {OutletVideo} from './Video';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="OutletDemo"
      component={OutletVideo}
      durationInFrames={450}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
