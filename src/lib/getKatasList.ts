import { ls } from 'shelljs'

function exitBuildDirectory(path: string): string {
  return path.replace('/lib', '')
}

export function extractFileName(path: string): string {
  const fileName = path.replace(/^.+\//, '')
  const fileNameWithoutExtension = fileName.replace(/\.md/, '')
  return fileNameWithoutExtension
}

export function getKatasList() {
  let katas: string[] = []
  const kataclismDirectory = exitBuildDirectory(`${__dirname}`)
  ls(`${kataclismDirectory}/katasReadme/*.md`).forEach(file => {
    katas.push(file)
  })
  const allKatas = katas.map((file: string) => extractFileName(file))
  return allKatas
}