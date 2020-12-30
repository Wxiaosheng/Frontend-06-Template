const EOF = Symbol('EOF') // EOF: End Of File

function data (c) {


}

module.exports.parserHTML = function parserHTML (html) {
    let state = data
    for (let c of html){
        state = state(c)
    }

    state = data(EOF)
}