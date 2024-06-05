import {
  escapeForBrowser,
  safeInnerHTML,
  sanitizeHTMLElement,
  sanitizeHTMLTree
} from '../../js/nodeHelpers.js'

const div = document.createElement('div')

const content1 = `<div href="javascript:alert();" onclick="alert()">toto</div><script>alert();</script><div>alert()<div oncfocus="alert()">toto</div><div data="<script>alert()</script>">titi</div>`
console.log(div)
div.insertAdjacentHTML('beforeend',content1 )
sanitizeHTMLTree(div)
document.body.appendChild(div)

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="15" height="15" version="1.1" viewBox="0 0 3.9687 3.9688" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
 <metadata>
  <rdf:RDF>
   <cc:Work rdf:about="">
    <dc:format>image/svg+xml</dc:format>
    <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
    <dc:title/>
   </cc:Work>
  </rdf:RDF>
 </metadata>
 <script xlink:href="external.js" />
 <script type="text/javascript">alert('coucou')  </script>
 <script xlink:href="external.js" />
 <g display="none">
  <path onclick="alert();" d="m0.67307 0.48679-0.185 0.1881 1.3095 1.3095-1.3095 1.3095 0.185 0.1881 1.311-1.311 1.311 1.311 0.18553-0.1881-1.31-1.3095 1.31-1.3095-0.18553-0.1881-1.311 1.311z" display="inline" stroke-width=".26458"/>
  <path d="m2.8796 1.9844-1.7904 1.5209v-3.0419z" display="inline"/>
 </g>
 <g>
  <path d="m1.2875 0.45656h0.15286a0.15286 0.15933 0 0 1 0.15285 0.15933v0.15933h0.7643v-0.15933a0.15286 0.15933 0 0 1 0.15285-0.15933h0.15286a0.15286 0.15933 0 0 1 0.15286 0.15933v0.15933a0.45858 0.47799 0 0 1 0.45858 0.47799v1.7526a0.45858 0.47799 0 0 1-0.45858 0.47799h-1.6815a0.45858 0.47799 0 0 1-0.45857-0.47799v-1.7526a0.45858 0.47799 0 0 1 0.45857-0.47799v-0.15933a0.15286 0.15933 0 0 1 0.15286-0.15933m1.2229 0.31866h0.15286v-0.15933h-0.15286v0.15933m-1.07 0v-0.15933h-0.15286v0.15933h0.15286m-0.30572 0.15933a0.30572 0.31866 0 0 0-0.30572 0.31866v0.15933h2.2929v-0.15933a0.30572 0.31866 0 0 0-0.30572-0.31866h-1.6815m-0.30572 2.0713a0.30572 0.31866 0 0 0 0.30572 0.31866h1.6815a0.30572 0.31866 0 0 0 0.30572-0.31866v-1.434h-2.2929v1.434m1.2229-0.79664h0.7643v0.79664h-0.7643v-0.79664m0.15286 0.15933v0.47799h0.45858v-0.47799z" stroke-width=".24608"/>
 </g>
 <g display="none">
  <path d="m3.5014 1.0215-3.0262 0.00154zm0.00675 0.96155-3.0267 9.645e-4zm0.00675 0.96105-3.0262 0.00154z" display="inline" fill="none" stroke="#000" stroke-width=".25757"/>
  <g>
   <path d="m1.9113 0.45656c-0.20652 5.3e-5 -0.37385 0.16761-0.37362 0.37414 5.3e-5 0.20632 0.1673 0.37357 0.37362 0.37362 0.20632-5.3e-5 0.37357-0.1673 0.37362-0.37362 2.32e-4 -0.20652-0.1671-0.37408-0.37362-0.37414zm0 1.1219c-0.20632 5.3e-5 -0.37357 0.1673-0.37362 0.37362 5.3e-5 0.20632 0.1673 0.37357 0.37362 0.37362 0.20632-5.3e-5 0.37357-0.1673 0.37362-0.37362-5.3e-5 -0.20632-0.1673-0.37357-0.37362-0.37362zm0 1.1214c-0.20632 5.3e-5 -0.37357 0.1673-0.37362 0.37362 5.3e-5 0.20632 0.1673 0.37357 0.37362 0.37362 0.20632-5.3e-5 0.37357-0.1673 0.37362-0.37362-5.3e-5 -0.20632-0.1673-0.37357-0.37362-0.37362z" display="inline" style="paint-order:fill markers stroke"/>
   <path d="m0.72452 0.59183c-0.08138-3e-6 -0.12725 0.09025-0.0801 0.15658l0.97462 1.3746c0.0019 3e-3 0.0024 0.0064 0.0021 0.0098v1.002c2.41e-4 0.03829 0.02162 0.07374 0.05633 0.08992 7.937e-4 -4.5e-5 0.0013-4.5e-5 0.0021 0l0.53692 0.25787c0.06655 0.03294 0.14291-0.015661 0.14263-0.08992v-1.2599c-2.646e-4 -0.0034 2.64e-4 -0.0069 0.0021-0.0098l0.9648-1.3746c0.04714-0.06633 0.0013-0.15658-0.0801-0.15658zm0.22272 0.19947h2.0758c0.01347-7.9401e-4 0.02183 0.01437 0.01394 0.02532l-0.85731 1.2247c-0.01164 0.01622-0.01921 0.03484-0.01963 0.05478v1.1152c-5.292e-4 0.01159-0.01291 0.01871-0.02326 0.01344l-0.30902-0.14831c-0.0049-0.0029-0.0078-0.0083-0.0078-0.01394v-0.96635c-9e-5 -0.02053-0.0072-0.04016-0.01913-0.05684l-0.8676-1.2227c-0.0079-0.01095 5.292e-4 -0.02614 0.01394-0.02532z" color="#000000" color-rendering="auto" display="inline" dominant-baseline="auto" image-rendering="auto" shape-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
   <path d="m2.9402 0.56818-0.046455 0.53627c-0.32822-0.32731-0.81518-0.44343-1.2657-0.28805-0.51329 0.17699-0.87393 0.66268-0.90994 1.2186-0.036 0.55588 0.26353 1.0703 0.75464 1.2836 0.4911 0.21328 1.0649 0.076817 1.4363-0.33451l-0.18783-0.17057c-0.30313 0.33574-0.75944 0.44001-1.1475 0.27146-0.38811-0.16856-0.62951-0.57838-0.59999-1.0341 0.029501-0.45567 0.3274-0.8524 0.7387-0.99423 0.37789-0.1303 0.77474-0.023208 1.0354 0.26747l-0.63716-0.055086-0.019227 0.22898 0.99158 0.086283 0.08695-0.99622z" color="#000000" color-rendering="auto" display="inline" dominant-baseline="auto" fill="#384c5e" image-rendering="auto" opacity=".999" shape-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;paint-order:markers stroke fill;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
  </g>
 </g>
</svg>`

const div2 = document.createElement('div')

div2.insertAdjacentHTML('beforeend',svg )
sanitizeHTMLTree(div2)
document.body.appendChild(div2)