import { ExecutorContext, joinPathFragments } from '@nx/devkit';
import { CompilemdExecutorSchema } from './schema';

import { readFileSync } from 'fs';
import { ensureDirSync, writeFileSync } from 'fs-extra';
import * as showdown from 'showdown';

export default async function runExecutor(
  options: CompilemdExecutorSchema,
  context: ExecutorContext
) {
  // read project configuration
  if (!context.projectName) {
    throw new Error('No project name');
  }

  const projConfig =
    context.projectsConfigurations?.projects[context.projectName];

  const projectRoot = projConfig?.root;

  if (!projectRoot) {
    throw new Error('No project root');
  }

  // read README from project root and convert to markdown with remark
  const readmeContent = readFileSync(
    joinPathFragments(projectRoot, 'README.md'),
    'utf8'
  );

  const readmeHtml = await markdownToHtml(readmeContent);

  if (!context.targetName || !context.projectGraph) {
    throw new Error('No target name or task graph');
  }

  // write to output
  const fileOutputDir = joinPathFragments(
    context.root,
    'dist',
    projectRoot,
    'html'
  );
  ensureDirSync(fileOutputDir);
  writeFileSync(joinPathFragments(fileOutputDir, 'README.html'), readmeHtml, {
    encoding: 'utf8',
  });

  return {
    success: true,
  };
}

// compile markdown to html
export async function markdownToHtml(markdown: string) {
  const converter = new showdown.Converter();
  return converter.makeHtml(markdown);
}
