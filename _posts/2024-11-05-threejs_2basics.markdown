---
layout: post
title:  "three.js零基础入门（坑）整理（二）：threejs基础"
date:   2024-11-05
is_project: false
categories: blogs
---
# three.js零基础入门（坑）整理（二）：threejs基础

接上篇，这里主要涉及到three.js一些基本概念，例如场景，渲染方法（加上 camera、调整参数、光源、材质，等等）。

## 1. 添加依赖项

回顾上一篇的内容，如果要在当前项目添加 three.js 作为依赖，需要运行 `npm install three`，然后 `three/` 文件夹就会被添加到 `node_modules/` 文件夹中，并且 `package.json` 和 `package-lock.json` 现在都包含对它的引用。
其他不再多说，导入 `three`之后，就可以开始创建场景开始 coding 了。

## 2. 基本概念

* 场景 scene：可以理解为一个容器，可以把所有的对象、模型、粒子、灯光等放入其中，并在某个时候要求 Three.js 渲染该场景。创建一个场景只需要：

  ```javascript
  // Scene
  const scene = new THREE.Scene()
  ```
* 对象 object：对象可以是许多事物。可以拥有基础的几何体、导入的模型、粒子、灯光等。以一个简单的红色立方体为例，我们需要创建名为[Mesh](https://threejs.org/docs/#api/en/objects/Mesh) 的对象类型。[Mesh](https://threejs.org/docs/#api/en/objects/Mesh) 可以理解为几何体 （形状） 和材质 （外观） 的组合。举一个例子：

  ```javascript
  // Object
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  ```

  这个代码就生成了一个颜色为红色的基础立方体，再用 Mesh 封装一下即可。然后记得加到场景中，否则无法看到它😛。
* 相机 camera：相机是不可见的。它更像是一种理论上的观察点。当我们渲染场景时，就会从相机的视角进行渲染。似乎是可以像在电影布景中一样拥有多个摄像机的，并
  且可以根据需要在这些摄像机之间切换，暂时没有尝试过。但是通常我们只使用一个处理透视的相机（使近处的物体看起来比远处的物体更突出）。

  * 透视相机（Perspective Camera）：需要调用 [PerspectiveCamera](https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera) 类，有两个基本参数。
    * 视野 field of view：视野是你的视角有多大。如果使用非常大的角度，您将能够同时看到各个方向，但会有很大的失真，因为结果将绘制在一个小矩形上。如果你使用一个小角度，事情看起来会放大。视野（或 `fov`）以度表示，对应于垂直视角。大部分简单demo 代码都使用 `75` 度角。
    * 纵横比 aspect ration：在大多数情况下，纵横比是画布的宽度除以高度。

  ```javascript
  // Sizes
  const sizes = {
      width: 800,
      height: 600
  }

  // Camera
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
  scene.add(camera)
  ```

  **不要忘记将相机添加到场景中。**
* 渲染器 renderer：要求渲染器从摄像机的角度渲染我们的场景，结果就会被绘制到画布中。可以自己创建画布，也可以让渲染器生成画布，然后将其添加到 html 页面。比如可以在 html 中加入：

  ```html
  <canvas class="webgl"></canvas>
  ```

  然后，在 javascript （script.js 文件）的部分：

  ```javascript
  // Canvas
  const canvas = document.querySelector('canvas.webgl')

  // Renderer
  const renderer = new THREE.WebGLRenderer({
      canvas: canvas
  })
  renderer.setSize(sizes.width, sizes.height)
  ```

  使用 `document.querySelector（...）` 获取我们在 HTML 中创建的 `canvas` 元素，然后使用带有一个参数的 [WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer) 类，关联到添加到页面的相对应的 `canvas` 属性。还需要使用 `setSize（...）` 方法来使用我们之前创建的 sizes 对象，自动相应地调整更新渲染器的大小。

## 3. 开始渲染

在渲染器上调用 `render（...）` 方法，并将 `scene` 和 `camera` 作为参数发送给它：

```javascript
renderer.render(scene, camera)
```

如果直接这样做，那恭喜🎉，会获得一个黑屏。因为此时，默认情况下，对象和相机的位置。两者都位于默认位置，即场景的中心，我们无法从其内部看到对象。我们需要移动东西。然而，每个对象都可以被移动，并且我们可以调整每个对象的多个属性：`position`、`rotation` 和 `scale`。`position` 属性是具有三个相关属性的对象：`x`、`y` 和 `z`。默认情况下，three.js 将前进/后退轴视为 `z`。这里，要向后移动摄像机，我们需要为该属性提供一个正值。在原来的代码上，加上对 `position.z` 的调整。

```javascript
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
```

运行服务器（`npm run dev`），就可以看到类似于这样的画面就完成啦！🎉

<div style="text-align: center; margin: 0 auto;">
    <img src="/assets/images/first_render.jpeg" style="width: 30%; display: block; margin: 0 auto;" alt="first render" />
</div>
