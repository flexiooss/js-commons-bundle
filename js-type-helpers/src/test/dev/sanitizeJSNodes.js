import {escapeForBrowser, safeInnerHTML, sanitizeJSNodes} from '../../js/nodeHelpers'

const div = document.createElement('div')

const content1 = `<div href="javascript:alert();" onclick="alert()">toto</div><script>alert();</script><div>alert()<div oncfocus="alert()">toto</div>`
console.log(div)
div.insertAdjacentHTML('beforeend',content1 )
sanitizeJSNodes(div)
document.body.appendChild(div)
// safeInnerHTML(window.document.body,
//   `<div>coucou</div><script>alert('toto')</script>`
// )
//
// document.body.insertAdjacentHTML('beforeend',`<hr />` )
// document.body.insertAdjacentHTML('beforeend',`<div>coucou</div><script>alert('toto')</script>` )
// document.body.insertAdjacentHTML('beforeend',`<hr />` )
// document.body.insertAdjacentHTML('beforeend',escapeForBrowser(`<div>coucou</div><script>alert('toto')</script>`) )
// document.body.insertAdjacentHTML('beforeend',`<hr />` )
// document.body.insertAdjacentText('beforeend',`<div>coucou</div><script>alert('toto')</script>` )
// document.body.insertAdjacentHTML('beforeend',`<hr />` )

// var g = document.createElement('script');
// var s = document.getElementsByTagName('script')[0];
// g.text = "alert(\"hi\");"
// s.parentNode.insertBefore(g, s);
