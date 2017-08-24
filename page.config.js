module.exports = {
    dirs: {},
    files: {
        'index.less': `
@import "~commons/less/common.less";
@bs: 46.875rem;
`,

        'index.js': `
'use strict'

import './index.less'
import tmpl from './index.xtpl'
import Promise from 'es6-promise'
import Xtemplate from 'xtemplate/lib/runtime' 

class DefaultClass {
    
    constructor(){

    }
}

new DefaultClass()
`,
        
        'index.html': `
<!DOCTYPE html>
<html lang="en">
<head>
    <%- include('/src/units/layout/header.html') %>
    <title></title>
</head>
<body>
    <section>
        
    </section>
    <script type="text/javascript" src="/assets/libs/zepto.min.js"></script>
</body>
</html>
`
    }
    
}