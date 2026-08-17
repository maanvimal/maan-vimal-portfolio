import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import CodingNode from './CodingNode.jsx'
import {
  CODING_THEME,
  SCENE_CONNECTIONS,
  SCENE_NODES,
} from '../../data/codingSceneConfig.js'

// Pre-create map of nodes by ID for fast lookup
const nodeMap = new Map(SCENE_NODES.map((n) => [n.id, n]))

// Pre-defined deterministic initial packet states
const INITIAL_PACKETS = Array.from({ length: 12 }, (_, i) => ({
  connectionIndex: i % SCENE_CONNECTIONS.length,
  progress: (i / 12) + ((i * 3) % 7) * 0.012,
  speed: 0.35 + (i % 3) * 0.15,
  size: 0.022 + (i % 2) * 0.008,
  forward: i % 2 === 0,
}))

function CodingNetwork({ sceneStateRef }) {
  const lineSegmentsRef = useRef(null)
  const packetsGroupRef = useRef(null)
  const packetMeshesRef = useRef([])

  // Store interpolated connection opacities
  const connectionOpacities = useRef(new Float32Array(SCENE_CONNECTIONS.length).fill(0.12))

  // Data packets state: fixed pool of 12 subtle data pulses
  const packetData = useRef(INITIAL_PACKETS.map((p) => ({ ...p })))

  // Create geometry for connection lines
  const { linePositions, lineIndices } = useMemo(() => {
    const positions = []
    const indices = []

    SCENE_CONNECTIONS.forEach((conn, idx) => {
      const fromNode = nodeMap.get(conn.from)
      const toNode = nodeMap.get(conn.to)
      if (fromNode && toNode) {
        const vStart = idx * 2
        positions.push(...fromNode.position)
        positions.push(...toNode.position)
        indices.push(vStart, vStart + 1)
      }
    })

    return {
      linePositions: new Float32Array(positions),
      lineIndices: new Uint16Array(indices),
    }
  }, [])

  const linesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    geo.setIndex(new THREE.BufferAttribute(lineIndices, 1))
    return geo
  }, [linePositions, lineIndices])

  useFrame((_, delta) => {
    if (!sceneStateRef?.current) return

    const { targetState, reducedMotion, isMobile } = sceneStateRef.current
    const activeNodes = targetState?.activeNodes || []
    const activeConnections = targetState?.activeConnections || []
    const baseSpeed = (targetState?.packetSpeed || 0.5) * (reducedMotion ? 0 : 1)
    const scaleFactor = isMobile ? 0.75 : 1.0

    // Update connection line opacities
    let avgActiveOpacity = 0
    SCENE_CONNECTIONS.forEach((conn, idx) => {
      const isDirectlyActive = activeConnections.includes(idx)
      const isConnectedActive =
        activeNodes.includes(conn.from) && activeNodes.includes(conn.to)
      const targetOp = isDirectlyActive ? 0.7 : isConnectedActive ? 0.45 : 0.09

      connectionOpacities.current[idx] = THREE.MathUtils.lerp(
        connectionOpacities.current[idx],
        targetOp,
        Math.min(delta * 4, 0.12),
      )
      avgActiveOpacity += connectionOpacities.current[idx]
    })

    avgActiveOpacity /= SCENE_CONNECTIONS.length

    if (lineSegmentsRef.current) {
      lineSegmentsRef.current.material.opacity = Math.max(0.12, avgActiveOpacity)
    }

    // Update moving data packets along lines
    packetData.current.forEach((packet, i) => {
      const mesh = packetMeshesRef.current[i]
      if (!mesh) return

      if (reducedMotion) {
        mesh.visible = false
        return
      }

      const conn = SCENE_CONNECTIONS[packet.connectionIndex]
      const fromNode = nodeMap.get(conn.from)
      const toNode = nodeMap.get(conn.to)

      if (!fromNode || !toNode) return

      // Advance progress
      packet.progress += delta * packet.speed * baseSpeed
      if (packet.progress >= 1.0) {
        packet.progress = 0
        // Switch to next active connection to keep network lively
        if (activeConnections.length > 0) {
          const nextIdx = (i + Math.floor(packet.progress * 10)) % activeConnections.length
          packet.connectionIndex = activeConnections[nextIdx]
        }
      }

      const t = packet.forward ? packet.progress : 1 - packet.progress
      const currentPos = new THREE.Vector3(
        THREE.MathUtils.lerp(fromNode.position[0] * scaleFactor, toNode.position[0] * scaleFactor, t),
        THREE.MathUtils.lerp(fromNode.position[1], toNode.position[1], t),
        THREE.MathUtils.lerp(fromNode.position[2], toNode.position[2], t),
      )

      mesh.position.copy(currentPos)
      const connOp = connectionOpacities.current[packet.connectionIndex] || 0.1
      mesh.visible = connOp > 0.2
      if (mesh.material) {
        mesh.material.opacity = THREE.MathUtils.clamp(connOp * 1.3, 0.2, 0.95)
      }
    })
  })

  return (
    <group>
      {/* 1. Spatial Nodes */}
      {SCENE_NODES.map((node, idx) => (
        <CodingNode
          key={node.id}
          node={node}
          sceneStateRef={sceneStateRef}
          index={idx}
        />
      ))}

      {/* 2. Thin Technical Connection Lines */}
      <lineSegments ref={lineSegmentsRef} geometry={linesGeometry}>
        <lineBasicMaterial
          color={CODING_THEME.primaryGreen}
          transparent
          opacity={0.25}
          linewidth={1}
        />
      </lineSegments>

      {/* 3. Data Packets (Subtle Information Flow) */}
      <group ref={packetsGroupRef}>
        {INITIAL_PACKETS.map((packet, idx) => (
          <mesh
            key={idx}
            ref={(el) => {
              packetMeshesRef.current[idx] = el
            }}
          >
            <sphereGeometry args={[packet.size, 8, 8]} />
            <meshBasicMaterial
              color={CODING_THEME.brightGreen}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export default CodingNetwork
