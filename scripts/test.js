const minimist = require('minimist')
const rawArgs = process.argv.slice(2)
const args = minimist(rawArgs) //获取命令行参数
console.log(rawArgs)
console.log(args)

let regex = ''
if (args.p) {
  const packages = (args.p || args.package).split(',').join('|')
  regex = `packages/**/${packages}/.*\\.spec\\.js$`
  const i = rawArgs.indexOf('-p')
  rawArgs.splice(i, 2)
}
