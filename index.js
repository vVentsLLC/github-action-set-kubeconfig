const fs = require('fs')
const path = require('path')
const core = require('@actions/core')
const io = require('@actions/io')

async function run() {
  const kubeconfig = core.getInput('kubeconfig')
  const fileDir = `/tmp/set_kubeconfig_${Date.now()}`
  const fileName = 'config'
  const filePath = path.join(fileDir, fileName)

  core.debug(`writing kubeconfig to: ${filePath}`)

  await io.mkdirP(fileDir)
  fs.writeFileSync(filePath, kubeconfig, 'utf8')

  core.debug(`Setting KUBECONFIG to: ${filePath}`)
  core.exportVariable('KUBECONFIG', filePath)
}

run().catch(error => {
  console.error(error)
  core.setFailed(error.message)
})
