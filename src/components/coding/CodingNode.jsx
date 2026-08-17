import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CODING_THEME } from '../../data/codingSceneConfig.js'

// Helper to create a crisp monospace canvas label texture
function createNodeLabelTexture(label, code) {
  if (typeof document === 'undefined') return null
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Background pill
  ctx.fillStyle = 'rgba(8, 14, 10, 0.75)'
  ctx.strokeStyle = 'rgba(57, 255, 114, 0.4)'
  ctx.lineWidth = 2
  if (ctx.roundRect) {
    ctx.roundRect(4, 4, canvas.width - 8, canvas.height - 8, 8)
  } else {
    ctx.rect(4, 4, canvas.width - 8, canvas.height - 8)
  }
  ctx.fill()
  ctx.stroke()

  // Monospace technical text
  ctx.font = 'bold 22px monospace'
  ctx.fillStyle = '#39FF72'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(`[${code}] ${label}`, canvas.width / 2, canvas.height / 2)

  const texture = new THREE.CanvasTexture(canvas)
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  return texture
}

function CodingNode({ node, sceneStateRef, index }) {
  const groupRef = useRef(null)
  const meshRef = useRef(null)
  const edgesRef = useRef(null)
  const centerGlowRef = useRef(null)
  const spriteRef = useRef(null)

  // Current interpolated values
  const currentOpacity = useRef(0.2)
  const currentScale = useRef(0.7)
  const floatOffset = index * 0.85 + ((index * 7) % 5) * 0.1

  const labelTexture = useMemo(
    () => createNodeLabelTexture(node.label, node.code),
    [node.label, node.code],
  )

  // Geometry based on node shape
  const { shapeGeometry, edgesGeometry } = useMemo(() => {
    let geo
    const s = node.size || 0.14
    switch (node.shape) {
      case 'octahedron':
        geo = new THREE.OctahedronGeometry(s, 0)
        break
      case 'icosahedron':
        geo = new THREE.IcosahedronGeometry(s, 0)
        break
      case 'tetrahedron':
        geo = new THREE.TetrahedronGeometry(s, 0)
        break
      case 'dodecahedron':
        geo = new THREE.DodecahedronGeometry(s, 0)
        break
      case 'box':
      default:
        geo = new THREE.BoxGeometry(s * 1.5, s * 1.5, s * 1.5)
        break
    }
    const edges = new THREE.EdgesGeometry(geo)
    return { shapeGeometry: geo, edgesGeometry: edges }
  }, [node.shape, node.size])

  useFrame((state, delta) => {
    if (!groupRef.current || !sceneStateRef?.current) return

    const { targetState, reducedMotion, isMobile } = sceneStateRef.current
    const activeNodes = targetState?.activeNodes || []
    const isActive = activeNodes.includes(node.id)

    const targetOpacityVal = isActive ? 0.9 : 0.18
    const targetScaleVal = (isActive ? 1.05 : 0.68) * (isMobile ? 0.8 : 1.0)

    const lerpFactor = Math.min(delta * 4.5, 0.12)
    currentOpacity.current = THREE.MathUtils.lerp(
      currentOpacity.current,
      targetOpacityVal,
      lerpFactor,
    )
    currentScale.current = THREE.MathUtils.lerp(
      currentScale.current,
      targetScaleVal,
      lerpFactor,
    )

    // Base position with subtle hover/float
    const [bx, by, bz] = node.position
    const floatY = reducedMotion
      ? by
      : by + Math.sin(state.clock.elapsedTime * 1.4 + floatOffset) * 0.04

    groupRef.current.position.set(bx * (isMobile ? 0.75 : 1.0), floatY, bz)
    groupRef.current.scale.setScalar(currentScale.current)

    if (!reducedMotion && meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.x += 0.003
    }

    // Update material opacities
    if (edgesRef.current?.material) {
      edgesRef.current.material.opacity = currentOpacity.current
    }
    if (meshRef.current?.material) {
      meshRef.current.material.opacity = currentOpacity.current * 0.25
    }
    if (centerGlowRef.current?.material) {
      centerGlowRef.current.material.opacity = THREE.MathUtils.clamp(
        currentOpacity.current * 1.2,
        0.15,
        0.95,
      )
    }
    if (spriteRef.current?.material) {
      spriteRef.current.material.opacity = THREE.MathUtils.clamp(
        currentOpacity.current * 1.1,
        0.12,
        0.9,
      )
    }
  })

  return (
    <group ref={groupRef} position={node.position}>
      {/* 1. Translucent Core Facet */}
      <mesh ref={meshRef} geometry={shapeGeometry}>
        <meshStandardMaterial
          color="#0d2816"
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* 2. Wireframe Edges */}
      <lineSegments ref={edgesRef} geometry={edgesGeometry}>
        <lineBasicMaterial
          color={CODING_THEME.primaryGreen}
          transparent
          opacity={0.2}
        />
      </lineSegments>

      {/* 3. Center Glowing Point */}
      <mesh ref={centerGlowRef}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial
          color={CODING_THEME.brightGreen}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* 4. Monospace Badge Label Sprite */}
      {labelTexture && (
        <sprite ref={spriteRef} position={[0, (node.size || 0.14) + 0.14, 0]} scale={[0.55, 0.14, 1]}>
          <spriteMaterial map={labelTexture} transparent opacity={0.2} />
        </sprite>
      )}
    </group>
  )
}

export default CodingNode
