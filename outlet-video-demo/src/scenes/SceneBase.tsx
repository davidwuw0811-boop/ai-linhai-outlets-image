import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';

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
};

export const SceneBase: React.FC<SceneBaseProps> = ({
  image,
  title,
  subtitle,
  overlay = 0.36,
  zoomFrom = 1.03,
  zoomTo = 1.1,
  translateX = 0,
  translateY = 0,
  align = 'left',
}) => {
  const frame = useCurrentFrame();
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
  const textY = interpolate(frame, [12, 32], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textOpacity = interpolate(frame, [12, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#080808', overflow: 'hidden'}}>
      <Img
        src={staticFile(image)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${scale}) translate(${x}px, ${y}px)`,
          filter: 'contrast(1.02) saturate(0.98)',
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(90deg, rgba(0,0,0,${overlay + 0.12}) 0%, rgba(0,0,0,${overlay}) 42%, rgba(0,0,0,0.08) 100%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: align === 'left' ? 105 : 0,
          right: align === 'center' ? 0 : undefined,
          bottom: 118,
          width: align === 'left' ? 980 : '100%',
          color: '#fff',
          textAlign: align,
          transform: `translateY(${textY * 34}px)`,
          opacity: textOpacity,
          fontFamily: 'Noto Sans SC, Microsoft YaHei, sans-serif',
          textShadow: '0 8px 28px rgba(0,0,0,0.45)',
        }}
      >
        <div style={{fontSize: 64, fontWeight: 800, letterSpacing: 2, lineHeight: 1.15}}>{title}</div>
        <div style={{fontSize: 32, marginTop: 22, opacity: 0.92, lineHeight: 1.35}}>{subtitle}</div>
      </div>
    </AbsoluteFill>
  );
};
