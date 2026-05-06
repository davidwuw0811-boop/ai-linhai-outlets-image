import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

type SceneBaseProps = {
  image: string;
  title: string;
  subtitle: string;
  overlay?: number;
  zoomFrom?: number;
  zoomTo?: number;
  translateX?: number;
  translateY?: number;
  align?: 'left' | 'center';
  badge?: string;
};

export const SceneBase: React.FC<SceneBaseProps> = ({
  image,
  title,
  subtitle,
  overlay = 0.34,
  zoomFrom = 1.0,
  zoomTo = 1.2,
  translateX = 0,
  translateY = 0,
  align = 'left',
  badge,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const cameraSpring = spring({frame, fps, config: {damping: 90, stiffness: 45, mass: 1}});
  const scale = interpolate(frame, [0, 90], [zoomFrom, zoomTo], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const x = interpolate(frame, [0, 90], [0, translateX], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(frame, [0, 90], [0, translateY], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleOpacity = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(frame, [8, 22], [48, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subtitleOpacity = interpolate(frame, [22, 38], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subtitleY = interpolate(frame, [22, 38], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lineWidth = interpolate(frame, [18, 42], [0, 420], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sweepX = interpolate(frame, [26, 78], [-500, 2200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const left = align === 'left' ? 108 : 0;

  return (
    <AbsoluteFill style={{backgroundColor: '#080808', overflow: 'hidden'}}>
      <Img
        src={staticFile(image)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${scale + cameraSpring * 0.015}) translate(${x}px, ${y}px)`,
          filter: 'contrast(1.07) saturate(1.05)',
        }}
      />

      <AbsoluteFill
        style={{
          background:
            `linear-gradient(90deg, rgba(0,0,0,${overlay + 0.28}) 0%, rgba(0,0,0,${overlay}) 42%, rgba(0,0,0,0.06) 100%)`,
        }}
      />

      <AbsoluteFill
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,0) 42%, rgba(0,0,0,0.44) 100%)',
          mixBlendMode: 'multiply',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: sweepX,
          width: 260,
          transform: 'skewX(-18deg)',
          background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.22), rgba(255,255,255,0))',
          opacity: 0.42,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left,
          bottom: 120,
          width: align === 'left' ? 980 : '100%',
          color: '#fff',
          textAlign: align,
          fontFamily: 'Noto Sans SC, Microsoft YaHei, sans-serif',
          textShadow: '0 10px 34px rgba(0,0,0,0.55)',
        }}
      >
        {badge ? (
          <div
            style={{
              display: 'inline-block',
              marginBottom: 28,
              padding: '10px 18px',
              border: '1px solid rgba(223,190,121,0.72)',
              color: '#f1d69a',
              fontSize: 22,
              letterSpacing: 5,
              background: 'rgba(0,0,0,0.24)',
              opacity: titleOpacity,
              transform: `translateY(${titleY * 0.55}px)`,
            }}
          >
            {badge}
          </div>
        ) : null}

        <div
          style={{
            height: 3,
            width: lineWidth,
            background: 'linear-gradient(90deg, #d8b76d, rgba(255,255,255,0.25))',
            marginBottom: 26,
          }}
        />

        <div
          style={{
            fontSize: 72,
            fontWeight: 850,
            letterSpacing: 2,
            lineHeight: 1.12,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 34,
            marginTop: 24,
            opacity: subtitleOpacity * 0.94,
            lineHeight: 1.35,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          {subtitle}
        </div>
      </div>

      <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 74, background: 'rgba(0,0,0,0.42)'}} />
      <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 74, background: 'rgba(0,0,0,0.42)'}} />
    </AbsoluteFill>
  );
};
