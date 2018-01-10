'use strict'

class chunkIDsByFilePath {
    constructor(options) {}

    apply(compiler) {
        compiler.plugin('compilation', compilation => {
            compilation.plugin('optimize-chunks', chunks => {
                chunks.forEach(chunk => {
                    chunk.id = chunk.name
                })
            })
        })
    }
}

module.exports = chunkIDsByFilePath
