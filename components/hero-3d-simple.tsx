"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"

function Box(props) {
  const ref = useRef(null)

  useFrame((state) => {
    if (!ref.current) return

    const t = state.clock.getElapsedTime()
    ref.current.rotation.x = Math.sin(t / 2) / 3
    ref.current.rotation.y = Math.sin(t / 4) * 0.5
  })

  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#4285F4" metalness={0.8} roughness={0.2} />
    </mesh>
  )
}

function FloatingBoxes() {
  const boxes = Array(10)
    .fill()
    .map((_, i) => ({
      position: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10],
      size: Math.random() * 0.5 + 0.1,
      color: `hsl(${Math.random() * 90 + 200}, 100%, 70%)`,
    }))

  return (
    <>
      {boxes.map((box, i) => (
        <mesh key={i} position={box.position} scale={box.size}>
          <boxGeometry />
          <meshStandardMaterial color={box.color} />
        </mesh>
      ))}
    </>
  )
}

export function Hero3DSimple() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return <div className="w-full h-[500px] md:h-[600px]" />

  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Box position={[0, 0, 0]} />
        <FloatingBoxes />
        <OrbitControls enableZoom={false} enablePan={false} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

