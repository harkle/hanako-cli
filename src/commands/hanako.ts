
import { GluegunCommand } from 'gluegun'


const command: GluegunCommand = {
  name: 'hanako',
  run: async toolbox => {
    const { print } = toolbox

    print.info('Welcome to Hanako CLI')
  },
}

module.exports = command
