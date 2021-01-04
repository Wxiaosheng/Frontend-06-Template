let currentToke = null

function emit (token) {
    // if (token.type === 'text') 
    console.log(token)
}

const EOF = Symbol('EOF') // EOF: End Of File

function data (c) {
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
function tagOpen (c) {
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

function endTagOpen (c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToke = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(c)
  } else if (c === '>'){

  } else if (c === EOF) {

  } else {

  }
}

function tagName (c) {
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

function beforeAttributeName (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '>') {
    emit(currentToke)
    return data
  } else if (c === '=') {
    return beforeAttributeName
  } else {
    return beforeAttributeName
  }
}

function selfClosingStartTag (c) {
  if (c === '>') {
    currentToke.isSelfClosing = true
    emit(currentToke)
    return data
  } else if (c === EOF) {

  } else {

  }
}

module.exports.parserHTML = function parserHTML (html) {
  let state = data
  for (let c of html){
      state = state(c)
  }

  state = data(EOF)
}