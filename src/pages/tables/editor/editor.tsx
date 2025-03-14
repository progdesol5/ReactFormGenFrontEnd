import { useTables } from '@/providers';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import { useEffect } from 'react';
import './editor.css';
import GjsPlugin from './plugin';

// @ts-ignore
const Editor = ({ data }) => {
  const { editor, setEditor, editorRef } = useTables();

  useEffect(() => {
    if (!editorRef.current) {
      const editor = grapesjs.init({
        container: '#gjs',
        fromElement: false,
        height: '100%',
        width: '100%',
        storageManager: false,
        plugins: [
          (editorInstance) => {
            GjsPlugin(editorInstance, data); // Pass data to the plugin
          },
        ],
      });
      editorRef.current = editor;
      setEditor(editor);
      localStorage.setItem('tableData', JSON.stringify(data));
    };



    return () => {
      editorRef.current.destroy();
      editorRef.current = null;
    };

  }, [editorRef, setEditor, data]);



  if (editor) {
    editor.on('load', () => {
      if (data && data.length) {
        data.forEach((field: any) => {
          editor.getWrapper().append({
            tagName: 'form',
            components: [
              {
                tagName: 'label',
                content: field.LABELNAME1,
                attributes: {
                  for: field.FIELDNAME,
                },
              },
              {
                tagName: 'input',
                attributes: {
                  id: field.CONTROLTYPE,
                  name: field.CONTROLTYPE,
                  type: field.CONTROLTYPE,
                },
              },
            ],
          });
        });
      }
    });
  }




  return (
    <div className='editor-container'>
      <div id='gjs'></div>
    </div>

  )
}

export default Editor