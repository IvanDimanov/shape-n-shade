import React from 'react'
import * as THREE from 'three'

import RenderingArea from 'components/RenderingArea'

const getObject = () => {
  const material = new THREE.MeshPhongMaterial({
    color: '#606060',
    dithering: true,
  })

  const geometry = new THREE.CylinderGeometry(0.5, 0.2, 1, 50)

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(2, 0.5, 0)
  mesh.castShadow = true

  mesh.name = 'invertedCone'

  return mesh
}

const InvertedConePage = () => (
  <RenderingArea getObject={getObject} />
)

export default InvertedConePage
