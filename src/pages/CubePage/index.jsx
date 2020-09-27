import React from 'react'
import * as THREE from 'three'

import RenderingArea from 'components/RenderingArea'

const getObject = (gui) => {
  const material = new THREE.MeshPhongMaterial({
    color: '#606060',
    dithering: true,
  })

  const geometry = new THREE.BoxBufferGeometry(3, 1, 2)

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(1, 0.5, 0)
  mesh.rotation.y = Math.PI * 0.2
  mesh.castShadow = true

  const objectFolder = gui.addFolder('object')
  objectFolder.add(mesh.rotation, 'y', 0, 2 * Math.PI, 0.001)

  mesh.name = 'prism'

  return mesh
}

const CubePage = () => (
  <RenderingArea getObject={getObject} />
)

export default CubePage
