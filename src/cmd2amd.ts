export const transformCMD2AMD = async (code: string) => {
  const { parse } = await import('acorn')
  const { walk } = await import('estree-walker')

  const ast = parse(code, {
    ecmaVersion: 2020,
    sourceType: 'module',
  })

  walk(ast as any, {
    enter(node) {
      if (node.type === 'ExpressionStatement') {
        const { expression } = node
        if (expression.type !== 'AssignmentExpression')
          return
        const { left, right } = expression
        if (left.type !== 'MemberExpression')
          return
        const { object, property } = left
        if (object.type !== 'Identifier')
          return
        if (object.name !== 'module')
          return
        if (property.type !== 'Identifier')
          return
        if (property.name !== 'exports')
          return

        // @ts-expect-error ignore
        const { type, properties } = right
        if (type !== 'ObjectExpression')
          return

        node.type = 'ExpressionStatement'
        // @ts-expect-error ignore
        node.expression = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'define',
          },
          arguments: [
            {
              type: 'ArrowFunctionExpression',
              params: [],
              async: false,
              expression: false,
              body: {
                type: 'ObjectExpression',
                properties,
              },
            },
          ],
        }
      }
    },
  })

  const { generate } = await import('astring')

  return generate(ast)
}
