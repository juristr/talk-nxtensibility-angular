import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { CustomlibGeneratorSchema } from './schema';

import { libraryGenerator } from '@nx/angular/generators';

export async function customlibGenerator(
  tree: Tree,
  options: CustomlibGeneratorSchema
) {
  await libraryGenerator(tree, {
    name: options.name,
    directory: 'modules',
  });

  const projectRoot = `modules/${options.name}`;
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default customlibGenerator;
