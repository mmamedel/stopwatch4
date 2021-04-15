import { rollup, OutputOptions } from 'rollup'
import rollUpOptions from '../rollup.config.js'
import ghpages from 'gh-pages'
import pkg from '../package.json'

const repo = pkg.repository.url.replace(
  /(https:\/\/)/,
  `$1${process.env.GH_TOKEN}@`
)
deploy()

async function deploy() {
  const bundle = await rollup(rollUpOptions)
  await bundle.generate({})
  await bundle.write(rollUpOptions.output as OutputOptions)
  await bundle.close()

  ghpages.publish(
    'public',
    {
      repo,
      user: {
        name: 'Git Hub Actions',
        email: 'actions@github.com'
      }
    },
    (err) => {
      err && console.error(err)
    }
  )
}

export {}
