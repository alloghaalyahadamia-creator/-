import React from 'react';

interface YahadamiyaEmblemProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export const YahadamiyaEmblem: React.FC<YahadamiyaEmblemProps> = ({
  className = '',
  size = 180,
  animated = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 600 600"
        className={`w-full h-full relative z-10 drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] drop-shadow-[0_0_15px_rgba(201,168,76,0.2)] ${
          animated ? 'animate-celestial-spin' : ''
        }`}
      >
        <defs>
          <linearGradient id="goldPlate" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff8db" />
            <stop offset="20%" stopColor="#f3d47a" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="80%" stopColor="#aa7c11" />
            <stop offset="100%" stopColor="#6e4f0a" />
          </linearGradient>

          <linearGradient id="goldRingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fae596" />
            <stop offset="50%" stopColor="#c59b27" />
            <stop offset="100%" stopColor="#875e0d" />
          </linearGradient>

          <filter id="goldShine" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Deep Black Inner Background */}
        <circle cx="300" cy="300" r="285" fill="#040306" />

        {/* Concentric Sacred Yah'adamiya Rings */}
        <circle
          cx="300"
          cy="300"
          r="270"
          fill="none"
          stroke="url(#goldRingGrad)"
          strokeWidth="3.5"
        />
        <circle
          cx="300"
          cy="300"
          r="205"
          fill="none"
          stroke="url(#goldRingGrad)"
          strokeWidth="4.5"
          filter="url(#goldShine)"
        />

        {/* Outer Circular Astrological Nodes / Stardust dots */}
        {/* Intermediate Dots between glyphs */}
        <circle cx="300" cy="72" r="5" fill="url(#goldPlate)" />
        <circle cx="430" cy="115" r="5" fill="url(#goldPlate)" />
        <circle cx="505" cy="210" r="5" fill="url(#goldPlate)" />
        <circle cx="510" cy="390" r="5" fill="url(#goldPlate)" />
        <circle cx="435" cy="485" r="5" fill="url(#goldPlate)" />
        <circle cx="300" cy="528" r="5" fill="url(#goldPlate)" />
        <circle cx="165" cy="485" r="5" fill="url(#goldPlate)" />
        <circle cx="90" cy="390" r="5" fill="url(#goldPlate)" />
        <circle cx="95" cy="210" r="5" fill="url(#goldPlate)" />
        <circle cx="170" cy="115" r="5" fill="url(#goldPlate)" />

        {/* 1. TOP NODE (12 O'clock) - Divided box with 2 dots */}
        <g transform="translate(300, 95)">
          <rect x="-16" y="-30" width="32" height="60" fill="none" stroke="url(#goldPlate)" strokeWidth="3.5" />
          <line x1="-16" y1="0" x2="16" y2="0" stroke="url(#goldPlate)" strokeWidth="3" />
          <circle cx="0" cy="-15" r="3.5" fill="url(#goldPlate)" />
          <circle cx="0" cy="15" r="3.5" fill="url(#goldPlate)" />
        </g>

        {/* 2. TOP-RIGHT 1 (1:30 O'clock) - Horizontal bar with vertical stalk */}
        <g transform="translate(425, 145)">
          <line x1="-12" y1="-22" x2="-12" y2="0" stroke="url(#goldPlate)" strokeWidth="3.5" />
          <rect x="-35" y="0" width="48" height="20" fill="none" stroke="url(#goldPlate)" strokeWidth="3.5" />
        </g>

        {/* 3. TOP-RIGHT 2 (2:30 O'clock) - Key box with central node */}
        <g transform="translate(485, 235)">
          <line x1="0" y1="-24" x2="0" y2="0" stroke="url(#goldPlate)" strokeWidth="3.5" />
          <rect x="-24" y="0" width="48" height="20" fill="none" stroke="url(#goldPlate)" strokeWidth="3.5" />
          <circle cx="0" cy="10" r="3.5" fill="url(#goldPlate)" />
        </g>

        {/* 4. RIGHT (3 O'clock) - Double stepped bracket with center node */}
        <g transform="translate(498, 335)">
          <rect x="-22" y="-20" width="44" height="40" fill="none" stroke="url(#goldPlate)" strokeWidth="3.5" />
          <line x1="-22" y1="0" x2="22" y2="0" stroke="url(#goldPlate)" strokeWidth="3.5" />
          <circle cx="0" cy="10" r="3.5" fill="url(#goldPlate)" />
        </g>

        {/* 5. BOTTOM-RIGHT (4:30 O'clock) - Stepped L-box with node */}
        <g transform="translate(470, 435)">
          <rect x="-30" y="-18" width="48" height="36" fill="none" stroke="url(#goldPlate)" strokeWidth="3.5" />
          <line x1="-6" y1="-18" x2="-6" y2="18" stroke="url(#goldPlate)" strokeWidth="3.5" />
          <circle cx="-18" cy="8" r="3.5" fill="url(#goldPlate)" />
        </g>

        {/* 6. BOTTOM-RIGHT 2 (5:30 O'clock) - Hanging pendant box */}
        <g transform="translate(395, 510)">
          <rect x="-18" y="-18" width="36" height="36" fill="none" stroke="url(#goldPlate)" strokeWidth="3.5" />
          <line x1="0" y1="18" x2="0" y2="40" stroke="url(#goldPlate)" strokeWidth="3.5" />
          <circle cx="0" cy="0" r="3.5" fill="url(#goldPlate)" />
        </g>

        {/* 7. BOTTOM (6 O'clock) - Hanging central key box */}
        <g transform="translate(300, 520)">
          <rect x="-18" y="-18" width="36" height="36" fill="none" stroke="url(#goldPlate)" strokeWidth="3.5" />
          <line x1="0" y1="18" x2="0" y2="45" stroke="url(#goldPlate)" strokeWidth="3.5" />
          <circle cx="0" cy="0" r="3.5" fill="url(#goldPlate)" />
        </g>

        {/* 8. BOTTOM-LEFT (6:30 O'clock) - Hanging pendant box left */}
        <g transform="translate(205, 510)">
          <rect x="-18" y="-18" width="36" height="36" fill="none" stroke="url(#goldPlate)" strokeWidth="3.5" />
          <line x1="0" y1="18" x2="0" y2="40" stroke="url(#goldPlate)" strokeWidth="3.5" />
          <circle cx="0" cy="0" r="3.5" fill="url(#goldPlate)" />
        </g>

        {/* 9. BOTTOM-LEFT (8 O'clock) - Angular bracket with dot */}
        <g transform="translate(125, 410)">
          <polyline points="0,-25 -25,-25 -25,25" fill="none" stroke="url(#goldPlate)" strokeWidth="3.5" />
          <circle cx="-12" cy="-12" r="3.5" fill="url(#goldPlate)" />
        </g>

        {/* 10. LEFT (9 O'clock) - Narrow divided rectangle */}
        <g transform="translate(102, 300)">
          <rect x="-14" y="-24" width="28" height="48" fill="none" stroke="url(#goldPlate)" strokeWidth="3.5" />
          <line x1="-14" y1="0" x2="14" y2="0" stroke="url(#goldPlate)" strokeWidth="3" />
        </g>

        {/* 11. TOP-LEFT (10 O'clock) - S / 5 Glyph */}
        <g transform="translate(128, 195)">
          <path
            d="M 12 -24 L -16 -24 L -16 -2 C 2 -2, 14 6, 14 18 C 14 26, 2 30, -14 26"
            fill="none"
            stroke="url(#goldPlate)"
            strokeWidth="3.5"
            strokeLinecap="square"
          />
        </g>

        {/* 12. TOP-LEFT 2 (11 O'clock) - Tall divided rectangle */}
        <g transform="translate(200, 115)">
          <rect x="-14" y="-26" width="28" height="52" fill="none" stroke="url(#goldPlate)" strokeWidth="3.5" />
          <line x1="-14" y1="0" x2="14" y2="0" stroke="url(#goldPlate)" strokeWidth="3" />
        </g>

        {/* Central Master Inscription: شَفْرَة اليَحَادَمِيّة */}
        <g id="central-calligraphy" transform="translate(300, 300)">
          {/* Main Title Top: شَفْرَة */}
          <text
            x="0"
            y="-22"
            textAnchor="middle"
            fontFamily="'Amiri', 'Tajawal', serif"
            fontSize="72"
            fontWeight="bold"
            letterSpacing="2"
            fill="url(#goldPlate)"
            filter="url(#goldShine)"
          >
            شَفْرَة
          </text>

          {/* Main Title Bottom: اليَحَادَمِيّة */}
          <text
            x="0"
            y="65"
            textAnchor="middle"
            fontFamily="'Amiri', 'Tajawal', serif"
            fontSize="78"
            fontWeight="900"
            letterSpacing="1"
            fill="url(#goldPlate)"
            filter="url(#goldShine)"
          >
            اليَحَادَمِيّة
          </text>
        </g>
      </svg>
    </div>
  );
};
