import {escapeForBrowser, safeInnerHTML} from '../../js/nodeHelpers'

// document.body.innerHTML = `<div>coucou</div><script>alert('toto')</script>`
safeInnerHTML(window.document.body,
  `<div>coucou</div><script>alert('toto')</script>`
)

document.body.insertAdjacentHTML('beforeend',`<hr />` )
document.body.insertAdjacentHTML('beforeend',`<div>coucou</div><script>alert('toto')</script>` )
document.body.insertAdjacentHTML('beforeend',`<hr />` )
document.body.insertAdjacentHTML('beforeend',escapeForBrowser(`<div>coucou</div><script>alert('toto')</script>`) )
document.body.insertAdjacentHTML('beforeend',`<hr />` )
document.body.insertAdjacentText('beforeend',`<div>coucou</div><script>alert('toto')</script>` )
document.body.insertAdjacentHTML('beforeend',`<hr />` )
