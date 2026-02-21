import * as nodeOs from 'node:os'
import * as nodePath from 'node:path'

const dataFolder = nodePath.join(nodeOs.homedir(), 'data')
export {dataFolder}
