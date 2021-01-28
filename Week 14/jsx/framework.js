export function createElement(type, attribute, ...children) {
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

  export class Component {
    constructor (type) {
        // this.root = this.render()
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
  
  class ElementWrapper extends Component {
    constructor(type) {
      this.root = document.createElement('div')
    }
    
  }
  
  class TextWrapper extends Component {
    constructor(content) {
      this.root = document.createTextNode(content)
    }
    
  }