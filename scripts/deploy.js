import ghpages from 'gh-pages'
import pkg from '../package.json'

const repo = pkg.repository.url.replace(
  /(https:\/\/)/,
  `$1${process.env.GH_TOKEN}@`
)
publish()

async function publish() {
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
