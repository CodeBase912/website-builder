import React from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

function Builder() {
  return (
    <div>
      <div className='editor-wrapper'>
        <CKEditor
          editor={ClassicEditor}
          data='<p>Hello from CKEditor 5!</p>'
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          config={{
            ckfinder: {
              uploadUrl:
                'http://localhost:8080/site-builder-app/api/upload/index.php',
            },
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
      </div>
    </div>
  );
}

export default Builder;
