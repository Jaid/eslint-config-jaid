import * as nodeOs from 'node:os'
import * as path from 'forward-slash-path'

const dataFolder = path.join(nodeOs.homedir(), 'data')
export {dataFolder}
