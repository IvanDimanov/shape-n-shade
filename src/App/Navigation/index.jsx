import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import HomeIcon from './icons/home.png'
import CubeIcon from './icons/cube.png'
import SphereIcon from './icons/sphere.png'
import CylinderIcon from './icons/cylinder.png'
import ConeIcon from './icons/cone.png'
import InvertedConeIcon from './icons/invertedCone.png'

import './index.css'

const links = [
  {
    to: '/',
    src: HomeIcon,
    alt: 'Home',
  },
  {
    to: '/cube',
    src: CubeIcon,
    alt: 'Cube',
  },
  {
    to: '/sphere',
    src: SphereIcon,
    alt: 'Sphere',
  },
  {
    to: '/cylinder',
    src: CylinderIcon,
    alt: 'Cylinder',
  },
  {
    to: '/cone',
    src: ConeIcon,
    alt: 'Cone',
  },
  {
    to: '/inverted-cone',
    src: InvertedConeIcon,
    alt: 'Inverted cone',
  },
]

const Navigation = ({ location }) => (
  <div className="flex justify-around py-1 select-none">
    {links.map(({ to, src, alt }) => (
      <Link
        key={to}
        to={to}
        className={`
          rounded-md py-3 px-6
          ${location.pathname === to
            ? 'border-b-4 border-gray-500 bg-gray-600'
            : 'hover:bg-gray-500'
          }
        `}
      >
        <img
          src={src}
          alt={alt}
        />
      </Link>
    ))}
  </div>
)

export default withRouter(Navigation)
