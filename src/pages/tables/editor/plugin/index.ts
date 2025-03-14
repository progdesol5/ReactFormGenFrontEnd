import { Editor, PluginOptions } from 'grapesjs';
import blocks from './blocks';
import commands from './commands/commands';
import exportToZip from './commands/exportToZip';
import panels from './panels';
import { RequiredPluginOptions } from './pluginOptsTypes';
const GjsPlugin = (editor: Editor, data: any, opts: Partial<PluginOptions> = {}) => {
  const config: RequiredPluginOptions = {
    blocks: ['link-block', 'quote', 'text-basic'],
    block: () => ({}),
    modalImportTitle: 'Import',
    modalImportButton: 'Import',
    modalImportLabel: '',
    modalImportContent: '',
    importViewerOptions: {},
    textCleanCanvas: 'Are you sure you want to clear the canvas?',
    showStylesOnChange: true,
    useCustomTheme: true,
    ...opts
  };

  console.log(data);

  blocks(editor, config);
  panels(editor, config);
  commands(editor, config);
  exportToZip(editor);
};

export default GjsPlugin;
