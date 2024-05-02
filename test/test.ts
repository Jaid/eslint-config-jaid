import {test} from 'node:test'

import {runTest} from '~/test/lib/runTest.js'

test(`basic`, async testContext => runTest(testContext))
