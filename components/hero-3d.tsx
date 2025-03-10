"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import { Vector3 } from "three"

function CPUModel(props) {
  const ref = useRef(null)

  useFrame((state) => {
    if (!ref.current) return

    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = Math.sin(t / 4) * 0.3
    ref.current.rotation.x = Math.cos(t / 4) * 0.2
  })

  return (
    <group ref={ref} {...props}>
      {/* Podstawa CPU */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.2, 3]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Główny chip */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[2.5, 0.3, 2.5]} />
        <meshStandardMaterial color="#2a2a5a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Piny na spodzie - zredukowana ilość dla lepszej wydajności */}
      {Array.from({ length: 5 }).map((_, i) =>
        Array.from({ length: 5 }).map((_, j) => (
          <mesh key={`pin-${i}-${j}`} position={[-1.2 + i * 0.5, -0.25, -1.2 + j * 0.5]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.1, 6]} />
            <meshStandardMaterial color="goldenrod" metalness={1} roughness={0.3} />
          </mesh>
        )),
      )}

      {/* Elementy na górze CPU */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.8, 0.1, 1.8]} />
        <meshStandardMaterial color="#3a3a8a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Radiator - zredukowana ilość dla lepszej wydajności */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={`radiator-${i}`} position={[0, 0.5 + i * 0.1, 0]} castShadow>
          <boxGeometry args={[2.2 - i * 0.1, 0.05, 2.2 - i * 0.1]} />
          <meshStandardMaterial color="silver" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Obwody na powierzchni */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={`circuit-${i}`} position={[-0.8 + i * 0.8, 0.36, 0.8]} castShadow>
          <boxGeometry args={[0.3, 0.02, 0.6]} />
          <meshStandardMaterial color="#2a2a5a" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* Świecące elementy */}
      <mesh position={[0.8, 0.36, 0]} castShadow>
        <boxGeometry args={[0.2, 0.02, 0.2]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
      </mesh>

      <mesh position={[-0.8, 0.36, 0]} castShadow>
        <boxGeometry args={[0.2, 0.02, 0.2]} />
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

function FloatingCircuits() {
  const circuitsRef = useRef([])

  // Zredukowana ilość elementów dla lepszej wydajności
  const positions = Array.from({ length: 8 }, () => [
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 5,
  ])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    circuitsRef.current.forEach((circuit, i) => {
      if (circuit) {
        circuit.position.y = positions[i][1] + Math.sin(t + i) * 0.5
        circuit.rotation.x = t * 0.1 + i * 0.1
        circuit.rotation.y = t * 0.1 + i * 0.2
      }
    })
  })

  return (
    <>
      {positions.map((pos, i) => (
        <mesh
          key={`circuit-float-${i}`}
          ref={(el) => {
            circuitsRef.current[i] = el
          }}
          position={new Vector3(...pos)}
          scale={0.2 + Math.random() * 0.3}
        >
          <boxGeometry args={[1, 0.1, 1]} />
          <meshStandardMaterial
            color={`hsl(${Math.random() * 90 + 200}, 100%, 70%)`}
            emissive={`hsl(${Math.random() * 90 + 200}, 100%, 30%)`}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </>
  )
}

export function Hero3D() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return <div className="w-full h-[500px] md:h-[600px]" />

  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <CPUModel position={[0, -1, 0]} scale={1.2} />
        </Float>

        <FloatingCircuits />
        <OrbitControls enableZoom={false} enablePan={false} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

