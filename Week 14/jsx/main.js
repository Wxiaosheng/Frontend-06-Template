import { Component, createElement } from './framework'

class Carousel extends Component {
  constructor() {
    super()
    this.attributes = Object.create(null)
  }

  setAttribute(k, v) {
    this.attributes[k] = v
  }

  mountTo(parent) {
    parent.appendChild(this.render())
  }

  render() {
    console.log(this.attributes.src)
    this.root = document.createElement('div')
    this.root.classList.add('carousel')
    for (let record of this.attributes.src) {
      const child = document.createElement("div")
      child.style.backgroundImage = `url(${record})`
      this.root.appendChild(child)
    }

    let position = 0

    this.root.addEventListener('mousedown', event => {
      let children = this.root.children
      // 推荐使用 clientX、clientY，相对于浏览器
      let startX = event.clientX

      const move = event => {
        let x = event.clientX - startX

        let current = position - ((x - x % 500) / 500)

        for (let offset of [-1, 0, 1]) {
          let pos = current + offset
          pos = (pos + children.length) % children.length
          children[pos].style.transition = ''
          children[pos].style.transform = `translateX(${-pos * 500 + offset * 500 + x % 500}px)`
        }
      }
      const up = event => {
        let x = event.clientX - startX
        position = position - Math.round(x / 500)
        for (let offset of [0, -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
          let pos = position + offset
          pos = (pos + children.length) % children.length

          children[pos].style.transition = ''
          children[pos].style.transform = `translateX(${-pos * 500 + offset * 500 + x % 500}px)`
        }
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }

      document.addEventListener("mousemove", move)
      document.addEventListener("mouseup", up)
    })



    // let currentIndex = 0
    // setInterval(() => {
    //   let children = this.root.children
    //   let nextIndex = (currentIndex + 1) % children.length
    //   let current = children[currentIndex];
    //   let next = children[nextIndex];

    //   next.style.transition = 'none'
    //   next.style.transform = `translateX(${100 - nextIndex * 100}%)`;

    //   setTimeout(() => {
    //     next.style.transition = ''
    //     current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
    //     next.style.transform = `translateX(${ - nextIndex * 100}%)`

    //     currentIndex = nextIndex
    //   }, 16)

    //   // for (let child of this.root.children) {
    //   //   child.style.transform = `translateX(-${current*100}%)`
    //   // }
    // }, 3 * 1000)

    return this.root
  }
}


let d = [
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]

// document.body.appendChild(a)

const a = <Carousel src={d} />
a.mountTo(document.body)


console.log("main loader")