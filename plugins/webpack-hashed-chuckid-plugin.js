'use strict'
const crypto = require('crypto')

function hashedChunkIdsPlugin(options = {}) {
    this.options = Object.assign(
        {
            length: 4
        },
        options
    )
}

hashedChunkIdsPlugin.prototype.apply = function(compiler) {
    let options = this.options
    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('optimize-chunks', function(chunks) {
            const hashes = new Set()
            chunks.forEach(chunk => {
                let path = chunk.entryModule ? chunk.entryModule.resource : chunk.name

                let hash = crypto
                    .createHash('md5')
                    .update(path)
                    .digest('hex')

                let len = Number(options.length)
                while (hashes.has(hash.substr(0, len))) {
                    len++
                }
                hash = hash.substr(0, len)
                hashes.add(hash)
                chunk.id = hash
            })
        })
    })
}

module.exports = hashedChunkIdsPlugin
