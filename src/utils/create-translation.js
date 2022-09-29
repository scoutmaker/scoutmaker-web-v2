const readline = require('readline')
const fs = require('fs')

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise(resolve =>
    rl.question(query, ans => {
      rl.close()
      resolve(ans)
    }),
  )
}

const getWriteTrans = async (lang, file, tag) => {
  const translation = await askQuestion(`${lang}: `)
  const path = __dirname + `/../../public/locales/${lang}/${file}.json`
  fs.access(path, fs.F_OK, err => {
    if (err) {
      const obj = {}
      obj[tag] = translation
      fs.writeFileSync(path, JSON.stringify(obj, null, 2))
      return
    }
    //file exists
    const objBuff = fs.readFileSync(path)
    const obj = JSON.parse(objBuff)
    obj[tag] = translation
    fs.writeFileSync(path, JSON.stringify(obj, null, 2))
  })
}

;(async () => {
  const langs = ['en', 'pl']
  const file = await askQuestion('File name: ')
  const times = await askQuestion('Amount of translations: ')

  for (let i = 0; i < times; i++) {
    const transTag = await askQuestion('Translation tag: ')
    for (const indx in langs) {
      await getWriteTrans(langs[indx], file, transTag)
    }
  }
})()
