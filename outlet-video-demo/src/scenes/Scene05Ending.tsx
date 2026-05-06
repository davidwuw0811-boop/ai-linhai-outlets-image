import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';

const bullets = ['南加州风格街区界面', '品牌零售 + 休闲体验', '可招商、可运营、可落地'];

export const Scene05Ending: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 90], [1.02, 1.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleOpacity = interpolate(frame, [10, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(frame, [10, 28], [28, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#050505', overflow: 'hidden'}}>
      <Img
        src={staticFile('/assets/scene02_outlet_overall.png')}
        style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${scale})`}}
      />
      <AbsoluteFill style={{background: 'rgba(0,0,0,0.58)'}} />
      <div
        style={{
          position: 'absolute',
          left: 120,
          right: 120,
          top: 210,
          color: '#fff',
          fontFamily: 'Noto Sans SC, Microsoft YaHei, sans-serif',
          opacity: titleOpacity,
          transform: `translateY(${y}px)`,
          textShadow: '0 10px 36px rgba(0,0,0,0.55)',
        }}
      >
        <div style={{fontSize: 76, fontWeight: 850, letterSpacing: 3}}>世通奥特莱斯国际广场</div>
        <div style={{fontSize: 38, marginTop: 28, opacity: 0.9}}>城市更新 × 场景消费 × 品牌招商</div>
        <div style={{display: 'flex', gap: 26, marginTop: 72}}>
          {bullets.map((item, index) => {
            const itemOpacity = interpolate(frame, [28 + index * 8, 42 + index * 8], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div
                key={item}
                style={{
                  opacity: itemOpacity,
                  border: '1px solid rgba(255,255,255,0.35)',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(8px)',
                  padding: '24px 34px',
                  borderRadius: 18,
                  fontSize: 28,
                  fontWeight: 600,
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div style={{marginTop: 88, fontSize: 34, fontWeight: 700, letterSpacing: 4}}>招商洽谈中</div>
      </div>
    </AbsoluteFill>
  );
};
