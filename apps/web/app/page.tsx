'use client';
import { OrbitPath, OrbitItem } from 'react-orbit-component';
import Image from 'next/image';
import React from 'react';
import { Props } from 'useful-react-types';
const SHARED_CLASSNAME = 'w-10 h-10 bg-zinc-800 border-white/20 border-2 rounded-full flex items-center justify-center text-lg';
const OrbitItemFreezeOnMouseOver = ({ children, radius }: Props.ForceChildren & {radius?: number}) => {
  const [isFreeze, setIsFreeze] = React.useState(false);
  return (
    <OrbitItem
      direction="clockwise"
      className="w-10 h-10 bg-zinc-800 border-white/20 border-2 rounded-full flex items-center justify-center text-lg cursor-pointer hover:scale-110"
      step={isFreeze ? 0 : 0.2}
      delay={0.1}
      radius={radius}
      style={{
        transition: 'transform 0.1s ease-in-out',
      }}
      onMouseOver={(e) => {
        setIsFreeze(true);
      }}
      onMouseOut={(e) => {
        setIsFreeze(false);
      }}
    >
      {children}
    </OrbitItem>
  );
}
export default function Page(): JSX.Element {
  return (
    <main>
      <div className="flex items-center justify-center min-h-screen">
        <OrbitPath type="circle" className="absolute w-[25vh] h-[25vh] bg-transparent rounded-full border-2 border-white/10">
          <OrbitItemFreezeOnMouseOver>🐒</OrbitItemFreezeOnMouseOver>
        </OrbitPath>

        <OrbitPath type="circle" className="absolute w-[45vh] h-[45vh] bg-transparent rounded-full border-2 border-white/10">
          <OrbitItem direction="clockwise" startAngle={120} step={0.2} className={SHARED_CLASSNAME}>
            😀
          </OrbitItem>

          <OrbitItem direction="clockwise" startAngle={240} step={0.2} className={SHARED_CLASSNAME}>
            🐒
          </OrbitItem>

          <OrbitItem direction="clockwise" startAngle={360} step={0.2} className={SHARED_CLASSNAME}>
            🪐
          </OrbitItem>
        </OrbitPath>

        <OrbitPath type="circle" className="absolute w-[65vh] h-[65vh] bg-transparent rounded-full border-2 border-white/10">
          <OrbitItem direction="counter-clockwise" startAngle={240} step={0.3} className={SHARED_CLASSNAME}>
            🚀
          </OrbitItem>
        </OrbitPath>

        <div>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="logo"
            width={100}
            height={100}
            className="absolute inset-0 m-auto w-20 h-20"
          />
          <div className="w-36 h-36 bg-cyan-400/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </main>
  );
}
