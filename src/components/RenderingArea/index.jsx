import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'utils/jsm/controls/OrbitControls'


const getCamera = () => {
  const fov = 75
  const aspect = 1 // the canvas default
  const near = 0.1
  const far = 10000

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(5, 2, 0)
  camera.lookAt(0, 0, 0)

  return camera
}

const getAmbientLight = () => {
  const color = '#FFF'
  const intensity = 0.1
  const ambientLight = new THREE.AmbientLight(color, intensity)

  return ambientLight
}

const getSpotLight = (gui) => {
  const spotLight = new THREE.SpotLight(0xffffff, 1)
  spotLight.position.set(0, 9, 5)
  spotLight.angle = Math.PI / 4
  spotLight.penumbra = 0.05
  spotLight.decay = 2
  spotLight.distance = 200

  spotLight.castShadow = true
  spotLight.shadow.mapSize.width = 1024
  spotLight.shadow.mapSize.height = 1024
  spotLight.shadow.camera.near = 10
  spotLight.shadow.camera.far = 200

  const spotLightFolder = gui.addFolder('spotLight')
  spotLightFolder.add(spotLight.position, 'x', -50, 50, 0.001)
  spotLightFolder.add(spotLight.position, 'y', -50, 50, 0.001)
  spotLightFolder.add(spotLight.position, 'z', -50, 50, 0.001)

  return spotLight
}

const getSurface = () => {
  const material = new THREE.MeshPhongMaterial({
    color: '#C0C0C0',
    dithering: true,
  })

  const geometry = new THREE.PlaneBufferGeometry(200, 200)

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(0, 0, 0)
  mesh.rotation.x = -Math.PI * 0.5
  mesh.receiveShadow = true

  return mesh
}

const getBackgroundSurface = () => {
  const material = new THREE.MeshPhongMaterial({
    color: '#C0C0C0',
    dithering: true,
  })

  const geometry = new THREE.PlaneBufferGeometry(200, 100)

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(-100, 50, 0)
  mesh.rotation.y = Math.PI * 0.5
  mesh.receiveShadow = true

  return mesh
}


const RenderingArea = ({ getObject }) => {
  const canvasRef = useRef()

  const [gui, setGui] = useState()
  useEffect(() => () => gui && gui.destroy(), [gui])

  const [renderer, setRenderer] = useState()
  const [scene, setScene] = useState()
  const [camera, setCamera] = useState()


  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    })
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputEncoding = THREE.sRGBEncoding
    setRenderer(renderer)

    const scene = new THREE.Scene()
    scene.add(getAmbientLight())
    setScene(scene)

    const newGui = new dat.GUI()
    setGui(newGui)
    const spotLight = getSpotLight(newGui)
    scene.add(spotLight)

    const camera = getCamera()
    setCamera(camera)

    new OrbitControls(camera, renderer.domElement)

    scene.add(getSurface())
    scene.add(getBackgroundSurface())
  }, [canvasRef])


  useEffect(() => {
    if (scene && getObject) {
      const object = getObject(gui)

      if (!object.name) {
        object.name = Date.now()
      }

      scene.add(object)

      const objectInScene = scene.getObjectByName(object.name)
      return () => scene.remove(objectInScene)
    }
  }, [
    scene,
    gui,
    getObject,
  ])


  const requestRef = useRef()

  const animate = useCallback(() => {
    if (renderer && scene && camera) {
      requestRef.current = requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
  }, [
    renderer,
    scene,
    camera,
  ])

  useEffect(() => {
    if (renderer && scene && camera) {
      requestRef.current = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(requestRef.current)
    }
  }, [
    animate,
    renderer,
    scene,
    camera,
  ])


  const resizeRendererToDisplaySize = useCallback(() => {
    if (!camera || !renderer) {
      return
    }

    const {
      clientWidth,
      clientHeight,
      width,
      height,
    } = canvasRef.current
  
    const needResize = clientWidth !== width || clientHeight !== height
    if (needResize) {
      renderer.setSize(clientWidth, clientHeight, false)

      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
    }
  }, [
    camera,
    renderer,
  ])


  useEffect(() => {
    if (camera) {
      resizeRendererToDisplaySize()
      window.addEventListener('resize', resizeRendererToDisplaySize)
      return () => window.removeEventListener('resize', resizeRendererToDisplaySize)
    }
  }, [
    camera,
    resizeRendererToDisplaySize,
  ])


  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-full"
    />
  )
}


export default memo(RenderingArea)
