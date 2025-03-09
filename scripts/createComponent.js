import fs from 'fs'

const componentFlag = process.argv[2]

if (!componentFlag) {
  console.log('Component name is missing. Use npm run create-component MyComponent.')
  process.exit()
}

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

const component = capitalize(componentFlag)
const rootPath = 'src/components'

if (fs.existsSync(`${rootPath}/${component}`)) {
    console.log(`Component ${component} already exists. Please choose another name.`)
    process.exit()
}

const format = template => template.trim().replace(new RegExp('^[ \\t]{8}', 'gm'), '')

const templates = {
    astro: `
---
import type { ${component}Props as Props } from './types';
---

<div>
  
</div>
\n
`,
    svelte: `
<script lang="ts">
  import type { ${component}Props } from './types'
</script>

    `,
    types: `
export type ${component}Props = {
  
}

`,
}

fs.mkdirSync(`${rootPath}/${component}`)

fs.writeFileSync(`${rootPath}/${component}/${component}.astro`, format(templates.astro))
fs.writeFileSync(`${rootPath}/${component}/${component}.svelte`, format(templates.svelte))
fs.writeFileSync(`${rootPath}/${component}/types.ts`, format(templates.types))

console.log(`✅ Component ${component} created at ${rootPath}/${component}.`)
