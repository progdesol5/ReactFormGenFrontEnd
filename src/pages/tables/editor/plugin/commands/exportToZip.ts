import { saveAs } from 'file-saver';
import { Editor } from 'grapesjs';
import JSZip from 'jszip';

export default (editor: Editor) => {
  editor.Commands.add('export-to-zip', {
    run(editor) {
      const zip = new JSZip();

      // Get HTML, CSS, and JS content
      const htmlContent = editor.getHtml(); // HTML content
      const cssContent: any = editor.getCss(); // CSS content
      const jsContent = ''; // Add JavaScript content if necessary

      // Collect images or assets from components
      const components = editor.getComponents();
      // const assets = extractAssets(components); // Extract assets (images)

      // Add content to ZIP
      zip.file('index.html', htmlContent);
      zip.file('styles.css', cssContent);
      if (jsContent) zip.file('script.js', jsContent);

      // Add assets to `/assets` folder
      const assetsFolder = zip.folder('assets');
      // assets.forEach((asset) => {
      //   // Fetch the asset content and add it to the ZIP
      //   fetch(asset.src)
      //     .then((res) => res.blob())
      //     .then((blob) => assetsFolder?.file(asset.name, blob))
      //     .catch(console.error);
      // });

      // Generate ZIP and download
      setTimeout(() => {
        zip.generateAsync({ type: 'blob' }).then((content) => {
          saveAs(content, 'template.zip'); // Trigger download
        });
      }, 1000); // Delay to allow asset fetching
    }
  });

  // Optional: Add button in the toolbar
  editor.Panels.addButton('options', {
    id: 'export-zip',
    className: 'fa fa-download',
    command: 'export-to-zip',
    attributes: { class: 'gjs-pn-btn custom-gjs-pn-btn', title: 'Export to ZIP' }
  });
};

/**
 * Extract assets (images) from editor components
 */
function extractAssets(components: any): { src: string; name: string }[] {
  const assets: { src: string; name: string }[] = [];
  const extractFromComponent = (comp: any) => {
    const style = comp.get('style');
    const src = comp.get('src');

    // Check for background images in styles
    if (style?.['background-image']) {
      const urlMatch = style['background-image'].match(/url\(["']?(.*?)["']?\)/);
      if (urlMatch) {
        const url = urlMatch[1];
        assets.push({ src: url, name: getFileNameFromURL(url) });
      }
    }

    // Check for direct `src` property (e.g., images)
    if (src) {
      assets.push({ src, name: getFileNameFromURL(src) });
    }

    // Recursive for child components
    if (comp && comp.components) {
      comp.components.forEach(extractFromComponent);
    }
  };

  components.forEach(extractFromComponent);
  return assets;
}

/**
 * Extract file name from a URL
 */
function getFileNameFromURL(url: string): string {
  return url.split('/').pop() || 'asset';
}
