let currentToke = null, currentAttrbute = null

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
  } else if (c === '/' || c === '>' || c === EOF) {
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

function doubleQuotedAttributeValue (c) {
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

function singleQuotedAttributeValue (c) {
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

function afterQuotedAttributeValue (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '/'){
    return selfClosingStartTag
  } else if (c === '>'){
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
  } else if (c === '>'){
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

function afterAttributeName (c) {
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