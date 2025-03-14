import type { Editor } from 'grapesjs';
import { cmdClear, cmdDeviceDesktop, cmdDeviceMobile, cmdDeviceTablet } from '../consts';
import { RequiredPluginOptions } from '../pluginOptsTypes';

export default (editor: Editor, config: RequiredPluginOptions) => {
  const { Commands } = editor;
  const txtConfirm = config.textCleanCanvas;

  Commands.add(cmdDeviceDesktop, {
    run: (ed) => ed.setDevice('Desktop'),
    stop: () => {}
  });
  Commands.add(cmdDeviceTablet, {
    run: (ed) => ed.setDevice('Tablet'),
    stop: () => {}
  });
  Commands.add(cmdDeviceMobile, {
    run: (ed) => ed.setDevice('Mobile portrait'),
    stop: () => {}
  });
  Commands.add(cmdClear, (e: Editor) => confirm(txtConfirm) && e.runCommand('core:canvas-clear'));
};
