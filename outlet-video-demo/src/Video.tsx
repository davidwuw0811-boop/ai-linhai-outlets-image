import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, interpolate} from 'remotion';
import {Scene01Current} from './scenes/Scene01Current';
import {Scene02Overall} from './scenes/Scene02Overall';
import {Scene03Storefront} from './scenes/Scene03Storefront';
import {Scene04Interior} from './scenes/Scene04Interior';
import {Scene05Ending} from './scenes/Scene05Ending';

const TRANSITION_FRAMES = 24;
const SCENE_FRAMES = 90;

const FadeIn: React.FC<{children: React.ReactNode; blur?: boolean}> = ({children, blur = true}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, TRANSITION_FRAMES], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const blurPx = blur
    ? interpolate(frame, [0, TRANSITION_FRAMES], [10, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  return <AbsoluteFill style={{opacity, filter: `blur(${blurPx}px)`}}>{children}</AbsoluteFill>;
};

const WipeTransition: React.FC<{from: number}> = ({from}) => {
  const frame = useCurrentFrame();
  const local = frame - from;
  const width = interpolate(local, [0, TRANSITION_FRAMES], [0, 2200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(local, [0, 8, TRANSITION_FRAMES], [0, 0.28, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width,
        opacity,
        background: 'linear-gradient(90deg, rgba(218,188,111,0.92), rgba(255,255,255,0.22), rgba(255,255,255,0))',
        transform: 'skewX(-10deg)',
        transformOrigin: 'left center',
        pointerEvents: 'none',
      }}
    />
  );
};

export const OutletVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#050505'}}>
      <Sequence from={0} durationInFrames={SCENE_FRAMES}>
        <Scene01Current />
      </Sequence>

      <Sequence from={SCENE_FRAMES - TRANSITION_FRAMES} durationInFrames={SCENE_FRAMES + TRANSITION_FRAMES}>
        <FadeIn blur={false}>
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

      <WipeTransition from={SCENE_FRAMES - TRANSITION_FRAMES} />
      <WipeTransition from={SCENE_FRAMES * 2 - TRANSITION_FRAMES} />
      <WipeTransition from={SCENE_FRAMES * 3 - TRANSITION_FRAMES} />
      <WipeTransition from={SCENE_FRAMES * 4 - TRANSITION_FRAMES} />
    </AbsoluteFill>
  );
};
