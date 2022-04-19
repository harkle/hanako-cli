
import { GluegunToolbox } from 'gluegun'

const regex = /(export class )([A-Za-z]+)( extends)/;

function getClassName(filesystem, file) {
  const fileContent = filesystem.read(file, 'utf8');
  const found = fileContent.match(regex);

  const className = (found) ? found[2] : '';

  console.log(className);

  return className;
}

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
      'views/ts/components/',
      'views/twig/components/',
      'views/twig/modules/',
      'views/twig/pages/archives/',
      'views/twig/pages/singles/',
      'views/twig/pages/root/',
      'views/twig/pages/page-templates/',
      'views/twig/pages/templates/',
      'views/twig/partials/',
    ];

    paths.forEach((path) => {
      if (path == 'views/ts/components/') {
        filesystem.list(path).forEach((file) => {
          const className = getClassName(filesystem, path + file);
          if (className) includes.ts.push({ path: 'views/ts/components/' + className, className: className });
        });
      } else {
        filesystem.subdirectories(path).forEach((componentFolder) => {
          if (filesystem.exists(componentFolder + '/index.scss')) includes.scss.push({ path: componentFolder });

          if (filesystem.exists(componentFolder + '/index.ts')) {
            const className = getClassName(filesystem, componentFolder + '/index.ts');
            if (className) includes.ts.push({ path: componentFolder, className: className });
          }
        });
      }
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
