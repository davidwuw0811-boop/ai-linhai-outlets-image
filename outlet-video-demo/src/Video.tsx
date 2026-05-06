import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, interpolate} from 'remotion';
import {Scene01Current} from './scenes/Scene01Current';
import {Scene02Overall} from './scenes/Scene02Overall';
import {Scene03Storefront} from './scenes/Scene03Storefront';
import {Scene04Interior} from './scenes/Scene04Interior';
import {Scene05Ending} from './scenes/Scene05Ending';

const TRANSITION_FRAMES = 18;
const SCENE_FRAMES = 90;

const FadeIn: React.FC<{children: React.ReactNode}> = ({children}) => {
  // IMPORTANT: useCurrentFrame() is local to this Sequence.
  // Therefore fade timing must start at 0, not at the global timeline frame.
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, TRANSITION_FRAMES], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return <AbsoluteFill style={{opacity}}>{children}</AbsoluteFill>;
};

export const OutletVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#050505'}}>
      <Sequence from={0} durationInFrames={SCENE_FRAMES}>
        <Scene01Current />
      </Sequence>

      <Sequence from={SCENE_FRAMES - TRANSITION_FRAMES} durationInFrames={SCENE_FRAMES + TRANSITION_FRAMES}>
        <FadeIn>
          <Scene02Overall />
        </FadeIn>
      </Sequence>

      <Sequence from={SCENE_FRAMES * 2 - TRANSITION_FRAMES} durationInFrames={SCENE_FRAMES + TRANSITION_FRAMES}>
        <FadeIn>
          <Scene03Storefront />
        </FadeIn>
      </Sequence>

      <Sequence from={SCENE_FRAMES * 3 - TRANSITION_FRAMES} durationInFrames={SCENE_FRAMES + TRANSITION_FRAMES}>
        <FadeIn>
          <Scene04Interior />
        </FadeIn>
      </Sequence>

      <Sequence from={SCENE_FRAMES * 4 - TRANSITION_FRAMES} durationInFrames={SCENE_FRAMES + TRANSITION_FRAMES}>
        <FadeIn>
          <Scene05Ending />
        </FadeIn>
      </Sequence>
    </AbsoluteFill>
  );
};
