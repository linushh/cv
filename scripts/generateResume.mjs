// Generates public/resume-en.pdf from the project's own data sources.
// Admission: the previous iterations of this script hand-rolled a PDF layout
// engine and got messy. This version delegates layout to pdfmake, which is
// installed ad hoc (`npm install --no-save pdfmake`) and is NOT a project
// dependency — it only runs when you regenerate the resume.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const en = (await import(new URL('../src/locales/en.js', import.meta.url))).default
const socialsRaw = (await import(new URL('../src/service/socials.js', import.meta.url))).default
const socials = socialsRaw.getSocials()
const selfie = fs.readFileSync(path.join(root, 'src/assets/selfie.jpg'), 'base64')

const pdfmake = (await import('pdfmake')).default
const vfs = (await import('pdfmake/build/vfs_fonts.js')).default

for (const [name, content] of Object.entries(vfs)) pdfmake.virtualfs.writeFileSync(name, Buffer.from(content, 'base64'))
pdfmake.setFonts({
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
})
pdfmake.setUrlAccessPolicy(() => false)
pdfmake.setLocalAccessPolicy((file) => { throw new Error(`Local file access not allowed: ${file}`) })

const content = []
content.push({ image: `data:image/jpeg;base64,${selfie}`, width: 120, alignment: 'center' })
content.push({ text: socials.name, style: 'name' })
content.push({ text: `${socials.email} · ${socials.phoneNumber}`, style: 'contact' })
content.push({ text: 'About me', style: 'heading' })
for (const para of en.home.about.split('\n')) {
  if (para.trim()) content.push({ text: para, margin: [0, 2, 0, 2] })
}
content.push({ text: 'Experience', style: 'heading' })
for (const key of ['infobric', 'skolon', 'saab', 'bredakra']) {
  content.push({ text: en.experience[`${key}Title`], style: 'entryTitle', margin: [0, 8, 0, 2] })
  for (const line of en.experience[key].split('\n')) {
    if (!line.trim()) continue
    if (line.trim().startsWith('*')) {
      content.push({ text: line.trim().replace(/^\*\s*/, ''), style: 'bullet', margin: [0, 1, 0, 1] })
    } else {
      content.push({ text: line, margin: [0, 2, 0, 2] })
    }
  }
}

const docDefinition = {
  content,
  defaultStyle: { font: 'Roboto', fontSize: 10.5, lineHeight: 1.35 },
  styles: {
    name: { fontSize: 21, bold: true, alignment: 'center', margin: [0, 12, 0, 2] },
    contact: { fontSize: 10, alignment: 'center', color: '#555555', margin: [0, 0, 0, 10] },
    heading: { fontSize: 14, bold: true, margin: [0, 18, 0, 8], decoration: 'underline' },
    entryTitle: { fontSize: 11.5, bold: true },
    bullet: { marginLeft: 14 }
  }
}

const output = pdfmake.createPdf(docDefinition)
const pdfBuffer = await output.getBuffer()

const out = path.join(root, 'public/resume-en.pdf')
fs.writeFileSync(out, pdfBuffer)
console.log(`Generated public/resume-en.pdf (${(fs.statSync(out).size / 1024).toFixed(0)} KB)`)
