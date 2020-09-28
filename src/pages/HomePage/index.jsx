import React from 'react'

const HomePage = () => (
  <div class="py-10 px-40">
    <h1 className="text-2xl">Shape & Shade</h1>
    <span>Drawing helper for shapes and shades.</span>
    <br />
    <br />
    <br />

    <h2 className="text-xl">Tech stack</h2>
    <ul className="list-disc list-inside">
      <li>
        Create React App - <a
          className="underline"
          href="https://reactjs.org/docs/create-a-new-react-app.html#create-react-app"
          target="blank"
        >https://reactjs.org/docs/create-a-new-react-app.html#create-react-app</a>
      </li>
      <li>
        three.js for 3D Rending - <a
          className="underline"
          href="https://threejs.org"
          target="blank"
        >https://threejs.org</a>
      </li>
      <li>
        Tailwind as low-level CSS framework - <a
          className="underline"
          href="https://tailwindcss.com"
          target="blank"
        >https://tailwindcss.com</a>
      </li>
    </ul>
    <br />
    <br />

    <h2 className="text-xl">Run locally</h2>
    <div className="border-l-2 border-teal-500 pl-4 mt-1">
      git clone git@github.com:IvanDimanov/shape-n-shade.git<br />
      cd shape-n-shade<br />
      npm ci<br />
      npm start
    </div>
  </div>
)

export default HomePage
