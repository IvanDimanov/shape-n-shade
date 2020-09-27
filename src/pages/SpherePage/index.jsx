import React from 'react'
import * as THREE from 'three'

import RenderingArea from 'components/RenderingArea'

const getObject = () => {
  const material = new THREE.MeshPhongMaterial({
    color: '#606060',
    dithering: true,
  })

  const geometry = new THREE.SphereGeometry(0.8, 50, 50)

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(2.2, 0.8, 0)
  mesh.castShadow = true

  mesh.name = 'sphere'

  return mesh
}

const SpherePage = () => (
  <RenderingArea getObject={getObject} />
)

export default SpherePage
