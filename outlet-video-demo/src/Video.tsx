import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, interpolate} from 'remotion';
import {Scene01Current} from './scenes/Scene01Current';
import {Scene02Overall} from './scenes/Scene02Overall';
import {Scene03Storefront} from './scenes/Scene03Storefront';
import {Scene04Interior} from './scenes/Scene04Interior';
import {Scene05Ending} from './scenes/Scene05Ending';

const TRANSITION_FRAMES = 18;

const Fade: React.FC<{start: number; children: React.ReactNode}> = ({start, children}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [start, start + TRANSITION_FRAMES], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return <AbsoluteFill style={{opacity}}>{children}</AbsoluteFill>;
};

export const OutletVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#050505'}}>
      <Sequence from={0} durationInFrames={90}>
        <Scene01Current />
      </Sequence>

      <Sequence from={90 - TRANSITION_FRAMES} durationInFrames={90 + TRANSITION_FRAMES}>
        <Fade start={90 - TRANSITION_FRAMES}>
          <Scene02Overall />
        </Fade>
      </Sequence>

      <Sequence from={180 - TRANSITION_FRAMES} durationInFrames={90 + TRANSITION_FRAMES}>
        <Fade start={180 - TRANSITION_FRAMES}>
          <Scene03Storefront />
        </Fade>
      </Sequence>

      <Sequence from={270 - TRANSITION_FRAMES} durationInFrames={120 + TRANSITION_FRAMES}>
        <Fade start={270 - TRANSITION_FRAMES}>
          <Scene04Interior />
        </Fade>
      </Sequence>

      <Sequence from={360 - TRANSITION_FRAMES} durationInFrames={90 + TRANSITION_FRAMES}>
        <Fade start={360 - TRANSITION_FRAMES}>
          <Scene05Ending />
        </Fade>
      </Sequence>
    </AbsoluteFill>
  );
};
