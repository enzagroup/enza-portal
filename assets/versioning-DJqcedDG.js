import{p as s,j as e}from"./entry.client-CWWKNZtj.js";const d="This document outlines how enza manages versioning for the TX API and its documentation.",o=[{depth:1,text:"Versioning Policy",id:"versioning-policy",children:[{depth:2,text:"API Version",id:"api-version",children:[{depth:3,text:"When We Create a New API Version",id:"when-we-create-a-new-api-version"}]},{depth:2,text:"Documentation Version",id:"documentation-version"},{depth:2,text:"Changelog",id:"changelog"},{depth:2,text:"Support Policy",id:"support-policy"}]}],c={lastModifiedTime:"2026-03-17T08:24:41.000Z"},h="pages/versioning.mdx";function r(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"versioning-policy",children:"Versioning Policy"}),`
`,e.jsx(n.p,{children:"This document outlines how enza manages versioning for the TX API and its documentation."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"api-version",children:"API Version"}),`
`,e.jsx(n.p,{children:"The public API version is defined in the URL path. This ensures clear separation between different API generations and prevents breaking changes from affecting existing integrations."}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Version"}),e.jsx(n.th,{children:"URL Path"}),e.jsx(n.th,{children:"Status"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"v1"}),e.jsx(n.td,{children:e.jsx(n.code,{inline:"true",children:"/TX/v1"})}),e.jsx(n.td,{children:"Current"})]})})]}),`
`,e.jsx(n.h3,{id:"when-we-create-a-new-api-version",children:"When We Create a New API Version"}),`
`,e.jsxs(n.p,{children:["A new major version (e.g., ",e.jsx(n.code,{inline:"true",children:"/TX/v2"}),") is created ",e.jsx(n.strong,{children:"only"})," for breaking changes such as:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Removing or renaming endpoints"}),`
`,e.jsx(n.li,{children:"Changing request/response structures"}),`
`,e.jsx(n.li,{children:"Modifying authentication requirements"}),`
`,e.jsx(n.li,{children:"Altering core business logic behavior"}),`
`]}),`
`,e.jsx(n.p,{children:"We maintain older API versions for a reasonable deprecation period to ensure you have time to migrate."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"documentation-version",children:"Documentation Version"}),`
`,e.jsxs(n.p,{children:["The OpenAPI specification uses ",e.jsx(n.a,{href:"https://semver.org/",children:"Semantic Versioning"})," (",e.jsx(n.code,{inline:"true",children:"MAJOR.MINOR.PATCH"}),"):"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Version Change"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Example"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.strong,{children:"Patch"})," ",e.jsx(n.code,{inline:"true",children:"1.0.0"})," → ",e.jsx(n.code,{inline:"true",children:"1.0.1"})]}),e.jsx(n.td,{children:"Bug fixes, typo corrections, clarifications"}),e.jsx(n.td,{children:e.jsx(n.code,{inline:"true",children:"1.0.1"})})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.strong,{children:"Minor"})," ",e.jsx(n.code,{inline:"true",children:"1.0.0"})," → ",e.jsx(n.code,{inline:"true",children:"1.1.0"})]}),e.jsx(n.td,{children:"New endpoints, non-breaking additions"}),e.jsx(n.td,{children:e.jsx(n.code,{inline:"true",children:"1.1.0"})})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.strong,{children:"Major"})," ",e.jsx(n.code,{inline:"true",children:"1.0.0"})," → ",e.jsx(n.code,{inline:"true",children:"2.0.0"})]}),e.jsx(n.td,{children:"Breaking documentation changes, new API version line"}),e.jsx(n.td,{children:e.jsx(n.code,{inline:"true",children:"2.0.0"})})]})]})]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"changelog",children:"Changelog"}),`
`,e.jsxs(n.p,{children:["Every documentation and API release is recorded in the ",e.jsx(n.a,{href:"/changelog",children:"Changelog"}),". We use the following format:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{inline:"true",children:"v1.0.0"})," — Major documentation releases"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{inline:"true",children:"v1.0.1"})," — Patch releases"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{inline:"true",children:"v1.1.0"})," — Minor releases with new features"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{inline:"true",children:"v2.0.0"})," — New API version line"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"support-policy",children:"Support Policy"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"API Version"}),e.jsx(n.th,{children:"Support Status"}),e.jsx(n.th,{children:"Notes"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"v1"}),e.jsx(n.td,{children:"Active"}),e.jsx(n.td,{children:"Current stable version"})]})})]}),`
`,e.jsx(n.p,{children:"For questions about versioning or migration, contact your assigned Product Manager or our support team."})]})}function l(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{h as __filepath,l as default,d as excerpt,c as frontmatter,o as tableOfContents};
//# sourceMappingURL=versioning-DJqcedDG.js.map
