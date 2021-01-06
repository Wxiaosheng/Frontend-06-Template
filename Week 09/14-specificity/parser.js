const { ETIME } = require('constants')
const css = require('css')

const EOF = Symbol('EOF') // EOF: End Of File


let currentToke = null, currentAttrbute = null

let stack = [{ type: 'document', children: [] }]


// 加入一个新的函数，addCSSRules 这里把 CSS 规则暂存到一个数组中
let rules = []
function addCSSRules(text) {
  var ast = css.parse(text)
  rules.push(...ast.stylesheet.rules)
}

function match(element, selector) {
  if (!selector || !element.attributes) return false

  if (selector.charAt(0) === '#') {
    const attr = element.attributes.filter(attr => attr.name === 'id')[0]
    if (attr && attr.value === selector.replace('#', '')) return true
  } else if (selector.charAt(0) === '.') {
    const attr = element.attributes.filter(attr => attr.name === 'class')
    if (attr && attr.value === selector.replace('#', '')) return true
  } else {
    if (element.tagName === selector) return true
  }

  return false
}

function specificity(selector) {
  const p = [0, 0, 0, 0]
  const selectorPaths = selector.split(' ')
  for (let path of selectorPaths) {
    if (path.charAt(0) === '#') {
      p[1] += 1
    } else if (path.charAt(0) === '.') {
      p[2] += 1
    } else {
      p[3] += 1
    }
  }
  return p
}

function compare(sp1, sp2) {
  if (sp1[0] - sp2[0]) {
    return sp1[0] - sp2[0]
  }
  if (sp1[1] - sp2[1]) {
    return sp1[1] - sp2[1]
  }
  if (sp1[2] - sp2[2]) {
    return sp1[2] - sp2[2]
  }

  return sp1[3] - sp2[3]
}

function computeCSS(element) {
  const elements = stack.slice().reverse()

  if (!element.computedStyle) {
    element.computedStyle = {}
  }

  for (let rule of rules) {
    const selectPaths = rule.selectors[0].split(' ').reverse()

    if (!match(element, selectPaths[0])) {
      continue
    }

    let matched = false

    let j = 1
    for (let i = 0; i < elements.length; i++) {
      if (match(elements[i], selectPaths[j])) j++
    }

    if (j >= selectPaths.length) {
      matched = true
    }

    // 如果匹配到，就要加入
    if (matched) {
      const sp = specificity(rule.selectors[0])
      const computedStyle = element.computedStyle
      for (let declaration of rule.declarations) {
        if (!computedStyle[declaration.property]) {
          computedStyle[declaration.property] = {}
        }

        if (!computedStyle[declaration.property].specificity) {
          computedStyle[declaration.property].value = declaration.value
          computedStyle[declaration.property].specificity = sp
        } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
          computedStyle[declaration.property].value = declaration.value
          computedStyle[declaration.property].specificity = sp
        }

      }
    }
  }
}


function emit(token) {
  let top = stack[stack.length - 1]

  if (token.type === 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: []
    }

    element.tagName = token.tagName

    for (let p in token) {
      if (p !== 'type' && p !== 'tagName') {
        element.attributes.push({ name: p, value: token[p] })
      }
    }

    computeCSS(element)

    top.children.push(element)
    element.parent = top

    if (!token.isSelfClosing) {
      stack.push(element)
    }

    currentTextNode = null
  } else if (token.type === 'endTag') {
    if (top.tagName !== token.tagName) {
      throw new Error("Tag start end doesn't match!")
    } else {
      // 如果当前标签是 style 标签，则执行添加 CSS 规则操作
      if (top.tagName === 'style') {
        addCSSRules(top.children[0].content)
      }
      stack.pop()
    }

    currentTextNode = null
  } else if (token.type === 'text') {
    if (currentTextNode === null) {
      currentTextNode = {
        type: 'text',
        content: ''
      }

      top.children.push(currentTextNode)
    }
    currentTextNode.content += token.content
  }
}

function data(c) {
  if (c === '<') {
    return tagOpen
  } else if (c === EOF) {
    emit({ type: 'EOF' })
    return
  } else {
    emit({
      type: 'text',
      content: c
    })
    return data
  }
}

// tag 共有三种
function tagOpen(c) {
  if (c === '/') {
    return endTagOpen
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToke = {
      type: 'startTag',
      tagName: ''
    }
    return tagName(c)
  } else {
    return
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToke = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(c)
  } else if (c === '>') {

  } else if (c === EOF) {

  } else {

  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '/') {
    return selfClosingStartTag
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToke.tagName += c//.toLowerCase()
    return tagName
  } else if (c === '>') {
    emit(currentToke)
    return data
  } else {
    return tagName
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '/') {
    return selfClosingStartTag
  } else if (c === '>' || c === EOF) {
    emit(currentToke)
    return afterAttributeName(c)
  } else if (c === '=') {

  } else {
    currentAttrbute = {
      name: '',
      value: ''
    }
    return attributeName(c)
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
    return afterAttributeName(c)
  } else if (c === '=') {
    return beforeAttributeValue
  } else if (c === '\u0000') {

  } else if (c === '"' || c === "'" || c === '<') {

  } else {
    currentAttrbute.name += c
    return attributeName
  }
}

function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
    return beforeAttributeValue
  } else if (c === '"') {
    return doubleQuotedAttributeValue
  } else if (c === "'") {
    return singleQuotedAttributeValue
  } else if (c === '>') {
    // return data
  } else {
    return UnquotedAttributeValue(c)
  }
}

function doubleQuotedAttributeValue(c) {
  if (c === '"') {
    currentToke[currentAttrbute.name] = currentAttrbute.value
    return afterQuotedAttributeValue
  } else if (c === '\u0000') {

  } else if (c === EOF) {

  } else {
    currentAttrbute.value += c
    return doubleQuotedAttributeValue
  }
}

function singleQuotedAttributeValue(c) {
  if (c === "'") {
    currentToke[currentAttrbute.name] = currentAttrbute.value
    return afterQuotedAttributeValue
  } else if (c === '\u0000') {

  } else if (c === EOF) {

  } else {
    currentAttrbute.value += c
    return singleQuotedAttributeValue
  }
}

function afterQuotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '/') {
    return selfClosingStartTag
  } else if (c === '>') {
    currentToke[currentAttrbute.name] = currentAttrbute.value
    emit(currentToke)
    return data
  } else if (c === EOF) {

  } else {
    currentAttrbute.value += c
    return doubleQuotedAttributeValue
  }
}

function UnquotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToke[currentAttrbute.name] = currentAttrbute.value
    return beforeAttributeName
  } else if (c === '/') {
    currentToke[currentAttrbute.name] = currentAttrbute.value
    return selfClosingStartTag
  } else if (c === '>') {
    currentToke[currentAttrbute.name] = currentAttrbute.value
    emit(currentToke)
    return data
  } else if (c === '\u0000') {

  } else if (c === '"' || c === "'" || c === '<' || c === '=' || c === '`') {

  } else if (c === EOF) {

  } else {
    currentAttrbute.value += c
    return UnquotedAttributeValue
  }
}

function afterAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName
  } else if (c === '/') {
    return selfClosingStartTag
  } else if (c === '=') {
    return beforeAttributeValue
  } else if (c === '>') {
    currentToke[currentAttrbute.name] = currentAttrbute.value
    emit(currentToke)
    return data
  } else if (c === EOF) {

  } else {
    currentToke[currentAttrbute.name] = currentAttrbute.value
    currentAttrbute = {
      name: '',
      value: ''
    }
    return afterAttributeName(c)
  }
}

function selfClosingStartTag(c) {
  if (c === '>') {
    currentToke.isSelfClosing = true
    emit(currentToke)
    return data
  } else if (c === EOF) {

  } else {

  }
}

module.exports.parserHTML = function parserHTML(html) {
  let state = data
  for (let c of html) {
    state = state(c)
  }

  state = data(EOF)

  return stack[0]
}