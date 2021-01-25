function createElement(type, attribute, ...children) {
  let element
  if (typeof type === 'string') {
    element = new ElementWrapper(type)
  } else {
    element = new type
  }

  for (let key in attribute) {
    element.setAttribute(key, attribute[key])
  }
  for (let child of children) {
    if (typeof child === 'string') {
      child = new TextWrapper(child)
    }
    element.appendChild(child)
  }
  return element
}

class ElementWrapper {
  constructor(type) {
    this.root = document.createElement('div')
  }
  setAttribute(k, v) {
    this.root.setAttribute(k, v)
  }
  appendChild(child) {
    child.mountTo(this.root)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content)
  }
  setAttribute(k, v) {
    this.root.setAttribute(k, v)
  }
  appendChild(child) {
    child.mountTo(this.root)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class Carousel {
  constructor() {
    this.root = document.createElement('div')
  }
  setAttribute(k, v) {
    this.root.setAttribute(k, v)
  }
  appendChild(child) {
    child.mountTo(this.root)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

let a = <Carousel id="a">
  Hello World!
  <div class="spans">
    <span>111</span>
    <span>222</span>
    <span>333</span>
  </div>
</Carousel>

// document.body.appendChild(a)

a.mountTo(document.body)