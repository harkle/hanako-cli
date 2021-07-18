
import { GluegunToolbox } from 'gluegun'


// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = (toolbox: GluegunToolbox) => {
  toolbox.updateAutoIncludes = async () => {
    const { print, filesystem } = toolbox

    let includes = {
      'scss': [],
      'ts': []
    }
  
    let paths = [
      'views/twig/components/',
      'views/twig/modules/',
      'views/twig/pages/archives/',
      'views/twig/pages/root/',
      'views/twig/pages/singles/',
      'views/twig/pages/templates/',
      'views/twig/partials/',
    ]
  
    const regex = /(export class )([A-Za-z]+)( extends)/;
  
    paths.forEach((path) => {
      filesystem.subdirectories(path).forEach((componentFolder) => {
        if (filesystem.exists(componentFolder + '/index.scss')) includes.scss.push({ path: componentFolder });
  
        if (filesystem.exists(componentFolder + '/index.ts')) {
          const fileContent = filesystem.read(componentFolder + '/index.ts', 'utf8');
          const found = fileContent.match(regex);
          const className = (found) ? found[2] : '';
        
          console.log(className);
          if (className) includes.ts.push({ path: componentFolder, className: className });
        }
      });
    });

    await toolbox.template.generate({
      template: '_modules.ejs',
      target: 'views/scss/_modules.scss',
      props: { modules: includes.scss },
    });

    await toolbox.template.generate({
      template: 'site.ejs',
      target: 'views/ts/site.ts',
      props: { modules: includes.ts },
    });

    print.success(`Auto-includes files updates`);
  }

  // enable this if you want to read configuration in from
  // the current folder's package.json (in a "hanako" property),
  // hanako.config.json, etc.
  // toolbox.config = {
  //   ...toolbox.config,
  //   ...toolbox.config.loadConfig("hanako", process.cwd())
  // }
}
