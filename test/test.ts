import {test} from 'node:test'

import {runTest} from './lib/runTest.js'

test(`basic`, async testContext => runTest(testContext))
