'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import data from './data.json'; // ← import locally

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
});

const emotionalColorMap = {
  anxious: '#f87171',
  hopeful: '#60a5fa',
  pressured: '#fbbf24',
  uncertain: '#fcd34d',
  concerned: '#a78bfa',
  motivated: '#34d399',
  proud: '#4ade80',
  optimistic: '#93c5fd',
  'cautiously optimistic': '#38bdf8',
};

export default function LifeBubbles() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    const nodes = data.life_bubbles.map((b) => ({
      id: b.id,
      name: b.name,
      stressLevel: b.stress_level,
      emotionalState: b.emotional_state,
    }));

    const links = [];
    data.life_bubbles.forEach((b) => {
      if (b.impacts) {
        b.impacts.forEach((target) =>
          links.push({ source: b.id, target })
        );
      }
      if (b.connected_to) {
        b.connected_to.forEach((target) =>
          links.push({ source: b.id, target })
        );
      }
    });

    setGraphData({ nodes, links });
  }, []);

  return (
    <div className="w-full h-screen bg-gray-900 text-white">
      <ForceGraph2D
        graphData={graphData}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 12 / globalScale;
          const size = node.stressLevel * 2 + 5;

          ctx.beginPath();
          ctx.fillStyle =
            emotionalColorMap[
              node.emotionalState?.split(',')[0]?.toLowerCase().trim()
            ] || '#999';
          ctx.arc(node.x, node.y, size, 0, 2 * Math.PI);
          ctx.fill();

          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#fff';
          ctx.fillText(label, node.x, node.y);
        }}
        linkColor={() => '#aaa'}
        backgroundColor="#111827"
      />
    </div>
  );
}
