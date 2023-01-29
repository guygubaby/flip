import { expect, it } from 'vitest'
import { transformCMD2AMD } from './cmd2amd'

const code = `
  const foo = 'foo'
  const bar = 'nar'
  const fn = () => {}

  module.exports = {
    foo,
    bar,
    fn,
  }
`

it('transform cmd to amd', async () => {
  const result = await transformCMD2AMD(code)
  expect(result).toMatchInlineSnapshot(`
    "const foo = 'foo';
    const bar = 'nar';
    const fn = () => {};
    define(() => ({
      foo,
      bar,
      fn
    }));
    "
  `)
})
