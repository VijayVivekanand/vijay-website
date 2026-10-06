"use client";

import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { sound } from "@/lib/sound";

interface PortalArmProps {
  cursorPos?: { x: number; y: number } | null;
  targetedChamberId?: string | null;
}

export const PortalArm: React.FC<PortalArmProps> = ({
  cursorPos,
  targetedChamberId = null,
}) => {
  const containerRef = useRef<SVGSVGElement | null>(null);
  const gantryTrolleyRef = useRef<SVGGElement | null>(null);
  const upperArmRef = useRef<SVGGElement | null>(null);
  const forearmRef = useRef<SVGGElement | null>(null);
  const wristRef = useRef<SVGGElement | null>(null);
  const eyeGlowRef = useRef<SVGCircleElement | null>(null);
  const clawLeftRef = useRef<SVGPathElement | null>(null);
  const clawRightRef = useRef<SVGPathElement | null>(null);
  const laserBeamRef = useRef<SVGLineElement | null>(null);
  const laserReticleRef = useRef<SVGGElement | null>(null);

  // Arm geometry constants
  const railY = 32;
  const l1 = 150; // Length of upper arm
  const l2 = 140; // Length of forearm

  const stateRef = useRef({
    gantryX: 500,
    shoulderDeg: 0,
    elbowDeg: 25,
    wristDeg: 0,
    targetX: 500,
    targetY: 360,
  });

  // Inverse Kinematics calculation
  const solveIK = useCallback((targetPxX: number, targetPxY: number, gantryPxX: number) => {
    const shoulderX = gantryPxX;
    const shoulderY = railY + 36;

    const dx = targetPxX - shoulderX;
    const dy = Math.max(40, targetPxY - shoulderY);
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy), l1 + l2 - 10);
    const targetAngle = Math.atan2(dy, dx);

    const cosElbow = (dist * dist - l1 * l1 - l2 * l2) / (2 * l1 * l2);
    const clampedCosElbow = Math.max(-1, Math.min(1, cosElbow));
    const elbowAngle = Math.acos(clampedCosElbow);

    const angleOffset = Math.atan2(l2 * Math.sin(elbowAngle), l1 + l2 * Math.cos(elbowAngle));
    const shoulderAngle = targetAngle - angleOffset;

    const shoulderDeg = (shoulderAngle * 180) / Math.PI - 90;
    const elbowDeg = (elbowAngle * 180) / Math.PI;
    const wristDeg = (targetAngle * 180) / Math.PI - (shoulderDeg + 90 + elbowDeg);

    return {
      shoulderDeg,
      elbowDeg,
      wristDeg,
      shoulderX,
      shoulderY,
    };
  }, []);

  // Update arm position whenever cursor changes
  useEffect(() => {
    const tx = cursorPos ? cursorPos.x : 500;
    const ty = cursorPos ? cursorPos.y : 360;

    const targetGantryX = Math.max(160, Math.min(840, tx * 0.7 + 150));
    const ik = solveIK(tx, ty, targetGantryX);

    gsap.to(stateRef.current, {
      gantryX: targetGantryX,
      shoulderDeg: ik.shoulderDeg,
      elbowDeg: ik.elbowDeg,
      wristDeg: Math.max(-75, Math.min(75, ik.wristDeg)),
      targetX: tx,
      targetY: ty,
      duration: 0.35,
      ease: "power2.out",
      onUpdate: () => {
        if (gantryTrolleyRef.current) {
          gantryTrolleyRef.current.setAttribute("transform", `translate(${stateRef.current.gantryX}, 0)`);
        }
        if (upperArmRef.current) {
          upperArmRef.current.style.transform = `rotate(${stateRef.current.shoulderDeg}deg)`;
        }
        if (forearmRef.current) {
          forearmRef.current.style.transform = `rotate(${stateRef.current.elbowDeg}deg)`;
        }
        if (wristRef.current) {
          wristRef.current.style.transform = `rotate(${stateRef.current.wristDeg}deg)`;
        }
      },
    });
  }, [cursorPos, solveIK]);

  // Subtle optical eye pulsing
  useEffect(() => {
    if (!eyeGlowRef.current) return;
    const pulse = gsap.to(eyeGlowRef.current, {
      attr: { r: 9, opacity: 0.8 },
      yoyo: true,
      repeat: -1,
      duration: 1.4,
      ease: "sine.inOut",
    });

    return () => {
      pulse.kill();
    };
  }, []);

  // Clamp articulation on target change
  useEffect(() => {
    if (targetedChamberId && clawLeftRef.current && clawRightRef.current) {
      sound.playPneumaticHiss();
      gsap.timeline()
        .to([clawLeftRef.current, clawRightRef.current], {
          rotation: (i) => (i === 0 ? -18 : 18),
          duration: 0.15,
          ease: "power1.out",
        })
        .to([clawLeftRef.current, clawRightRef.current], {
          rotation: (i) => (i === 0 ? -6 : 6),
          duration: 0.25,
          ease: "back.out(2)",
        });
    }
  }, [targetedChamberId]);

  return (
    <div className="relative w-full h-full select-none pointer-events-none flex items-center justify-center">
      <svg
        ref={containerRef}
        viewBox="0 0 1000 520"
        className="w-full h-full max-h-[500px] drop-shadow-lg overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="subtleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="armTitanium" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2c3644" />
            <stop offset="50%" stopColor="#1a222c" />
            <stop offset="100%" stopColor="#11161d" />
          </linearGradient>

          <linearGradient id="armWhiteChassis" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d5dde5" />
            <stop offset="65%" stopColor="#9cb0c2" />
            <stop offset="100%" stopColor="#64788c" />
          </linearGradient>

          <linearGradient id="armChromeShaft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>

        {/* 1. Overhead Gantry Beam */}
        <g id="overhead-rail">
          <rect x="0" y="0" width="1000" height="20" fill="#131922" stroke="#1f2937" strokeWidth="1" />
          <rect x="0" y="20" width="1000" height="6" fill="#0b0f14" />
          <rect x="0" y="26" width="1000" height="6" fill="#1b2430" stroke="#253242" strokeWidth="0.8" />

          {/* Precision Mounting Bolts */}
          {[60, 160, 260, 360, 460, 560, 660, 760, 860, 960].map((boltX) => (
            <g key={boltX} transform={`translate(${boltX}, 10)`}>
              <circle r="3.5" fill="#1e293b" stroke="#0f172a" strokeWidth="0.8" />
              <circle r="1.2" fill="#64748b" />
            </g>
          ))}

          {/* Minimalist Conduit Line */}
          <path
            d="M 10 29 Q 250 40, 500 32 T 990 29"
            fill="none"
            stroke="#151d27"
            strokeWidth="3"
            strokeDasharray="8 3"
          />
        </g>

        {/* 2. Sliding Gantry Trolley Carriage */}
        <g ref={gantryTrolleyRef} transform="translate(500, 0)">
          {/* Trolley Roller Chassis */}
          <rect x="-50" y="16" width="100" height="22" rx="3" fill="url(#armTitanium)" stroke="#334155" strokeWidth="1.2" />
          <circle cx="-34" cy="26" r="5" fill="#090d12" stroke="#475569" strokeWidth="1.2" />
          <circle cx="34" cy="26" r="5" fill="#090d12" stroke="#475569" strokeWidth="1.2" />

          {/* Base Swivel Turret */}
          <rect x="-34" y="38" width="68" height="14" rx="2" fill="#1a2330" stroke="#2c3a4d" strokeWidth="1" />
          <circle cx="0" cy="48" r="16" fill="url(#armTitanium)" stroke="#475569" strokeWidth="1" />
          <circle cx="0" cy="48" r="9" fill="#0b1016" />

          {/* Professional Model Label */}
          <text x="0" y="30" textAnchor="middle" fill="#718295" fontSize="6.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.8">
            ROBOTICS LAB // IK-SYSTEM
          </text>

          {/* Status Indicator Light */}
          <circle cx="24" cy="48" r="2.5" fill="#5294e2" opacity="0.85" />

          {/* 3. Articulated Robotic Arm Hierarchy */}
          {/* SHOULDER JOINT */}
          <g transform="translate(0, 48)">
            {/* Upper Arm Group */}
            <g ref={upperArmRef} style={{ transformOrigin: "0px 0px" }}>
              {/* Upper Arm Frame */}
              <path
                d="M -14 0 L -8 145 L 8 145 L 14 0 Z"
                fill="url(#armWhiteChassis)"
                stroke="#2a3848"
                strokeWidth="1.5"
              />

              {/* Inset Graphite Core */}
              <rect x="-6" y="25" width="12" height="85" rx="1.5" fill="#161e28" />

              {/* Chrome Hydraulic Piston Shaft */}
              <rect x="-3" y="50" width="6" height="70" rx="1.5" fill="url(#armChromeShaft)" stroke="#0f172a" strokeWidth="0.8" />

              {/* ELBOW JOINT at y = 145 */}
              <g transform="translate(0, 145)">
                <circle cx="0" cy="0" r="14" fill="url(#armTitanium)" stroke="#38495c" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="8" fill="#0b1016" stroke="#475569" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="3" fill="#94a3b8" />

                {/* Forearm Group */}
                <g ref={forearmRef} style={{ transformOrigin: "0px 0px" }}>
                  {/* Lower Forearm Armature */}
                  <path
                    d="M -10 0 L -6 135 L 6 135 L 10 0 Z"
                    fill="url(#armWhiteChassis)"
                    stroke="#2a3848"
                    strokeWidth="1.5"
                  />

                  {/* Secondary Hydraulic Piston */}
                  <path d="M 8 15 L 12 95" stroke="#4a5a6c" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M 8 35 L 12 90" stroke="#cbd5e1" strokeWidth="1.5" />

                  {/* WRIST JOINT at y = 135 */}
                  <g transform="translate(0, 135)">
                    <g ref={wristRef} style={{ transformOrigin: "0px 0px" }}>
                      <circle cx="0" cy="0" r="10" fill="url(#armTitanium)" stroke="#334155" strokeWidth="1.2" />
                      <rect x="-12" y="0" width="24" height="13" rx="3" fill="#161f2b" stroke="#334155" strokeWidth="1" />

                      {/* Optical Sensor Housing */}
                      <circle cx="0" cy="16" r="13" fill="#0b1016" stroke="#2c3a4c" strokeWidth="2" />
                      
                      {/* Optical Sensor Core */}
                      <circle
                        ref={eyeGlowRef}
                        cx="0"
                        cy="16"
                        r="6"
                        fill="#5294e2"
                        filter="url(#subtleGlow)"
                        opacity="0.8"
                      />
                      <circle cx="0" cy="16" r="2.5" fill="#ffffff" />

                      {/* Concentric Precision Ring */}
                      <circle cx="0" cy="16" r="10" fill="none" stroke="#4a6482" strokeWidth="0.8" strokeDasharray="4 2" />

                      {/* Left Gripper Clamp */}
                      <path
                        ref={clawLeftRef}
                        d="M -10 18 C -18 25, -18 40, -8 50 C -6 50, -11 36, -6 24 Z"
                        fill="url(#armTitanium)"
                        stroke="#475569"
                        strokeWidth="1.2"
                        style={{ transformOrigin: "-10px 18px" }}
                      />

                      {/* Right Gripper Clamp */}
                      <path
                        ref={clawRightRef}
                        d="M 10 18 C 18 25, 18 40, 8 50 C 6 50, 11 36, 6 24 Z"
                        fill="url(#armTitanium)"
                        stroke="#475569"
                        strokeWidth="1.2"
                        style={{ transformOrigin: "10px 18px" }}
                      />

                      {/* Targeting Reticle Laser (Muted Blue) */}
                      <line
                        ref={laserBeamRef}
                        x1="0"
                        y1="24"
                        x2="0"
                        y2="180"
                        stroke="#5294e2"
                        strokeWidth="1.5"
                        strokeDasharray="5 4"
                        opacity={0.5}
                      />

                      <g ref={laserReticleRef} transform="translate(0, 180)">
                        <circle cx="0" cy="0" r="6" fill="none" stroke="#5294e2" strokeWidth="1" opacity="0.7" />
                        <line x1="-8" y1="0" x2="8" y2="0" stroke="#5294e2" strokeWidth="0.8" opacity="0.7" />
                        <line x1="0" y1="-8" x2="0" y2="8" stroke="#5294e2" strokeWidth="0.8" opacity="0.7" />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
