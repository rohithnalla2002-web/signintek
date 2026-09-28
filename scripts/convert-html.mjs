import fs from 'fs'

const html = fs.readFileSync('index.html', 'utf8')
const match = html.match(/<body>([\s\S]*)<\/body>/)
if (!match) throw new Error('Could not find body in index.html')

let body = match[1]
  .replace(/&(?!(?:amp|lt|gt|nbsp|quot|apos|#\d+|#x[\da-fA-F]+);)/g, '&amp;')
  .replace(/\bclass=/g, 'className=')
  .replace(/<br>/g, '<br />')
  .replace(/<img([^>]*?)>/g, (_, attrs) => `<img${attrs.replace(/\s+$/, '')} />`)
  .replace(/src="\/illustration-engineer\.svg\?v=[^"]+"/, 'src="/illustration-engineer.svg"')
  .replace(/<button className="menu"/, '<button type="button" className="menu"')
  .replace(/<button className="close"/, '<button type="button" className="close"')

const app = `import { useEffect } from 'react'
import { initSite } from './effects'

export default function App() {
  useEffect(() => initSite(), [])

  return (
    <>
${body}    </>
  )
}
`

fs.mkdirSync('src', { recursive: true })
fs.writeFileSync('src/App.jsx', app)
console.log('Wrote src/App.jsx')
