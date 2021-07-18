module.exports = {
  name: 'add',
  alias: 'a',
  run: async function(toolbox) {
    const { updateAutoIncludes, print, prompt, filesystem } = toolbox

    // Ask question to determine what we have to create
    const { type } = await prompt.ask({
      type: 'select',
      name: 'type',
      message: 'Select a module type',
      choices: ['Component', 'Module', 'Page', 'Partial']
    });

    let pageType;
    if (type === 'Page') {
      const { type } = await prompt.ask({
        type: 'select',
        name: 'type',
        message: 'Select a page type',
        choices: ['Archive', 'Root', 'Single']
      });

      pageType = type;
    }

    const yesNo = ['Yes', 'No'];

    const askName = { type: 'input', name: 'name', message: 'Enter a module name' }

    const askSCSS = {
      type: 'select',
      name: 'useSCSS',
      message: 'Add scss',
      choices: yesNo
    }

    const askTS = {
      type: 'select',
      name: 'useTypeScript',
      message: 'Add typescript',
      choices: yesNo
    }
    
    const questions = [askName, askSCSS, askTS]
    const { name, useSCSS, useTypeScript } = await toolbox.prompt.ask(questions)

    const pageTypeAdditionalS = (pageType !== 'root') ? 's' : '';
    const filename = ('views/twig/' + type + 's/' + ((pageType) ? pageType + pageTypeAdditionalS + '/' : '') + name).toLowerCase();
    
    // Create the module
    const alreadyExisting = await filesystem.exists(filename);
    if (!alreadyExisting) {
      filesystem.dir(filename);

      await toolbox.template.generate({
        template: 'twig.ejs',
        target: filename + '/index.twig',
        props: { name },
      });

      if (useSCSS) {
        await toolbox.template.generate({
          template: 'scss.ejs',
          target: filename + '/index.scss',
          props: { name },
        });
      }

      if (useTypeScript) {
        const moduleName = name.charAt(0).toUpperCase() + name.slice(1);

        await toolbox.template.generate({
          template: 'ts.ejs',
          target: filename + '/index.ts',
          props: { moduleName },
        });
      }

      print.success(`Module ${name} successfuly added`);
  
      updateAutoIncludes();
    } else {
      print.error(`This module already exist ${filename}`);
    }
  }
}
