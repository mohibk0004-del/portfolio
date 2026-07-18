import { MeshGradient } from "@paper-design/shaders-react";

export interface BackgroundShaderProps {
  colors: [string, string, string, string];
}

export default function BackgroundShader({ colors }: BackgroundShaderProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <MeshGradient
        style={{ height: "100%", width: "100%" }}
        distortion={0.8}
        swirl={0.1}
        offsetX={0}
        offsetY={0}
        scale={1}
        rotation={0}
        speed={1}
        colors={colors}
      />
    </div>
  );
}
