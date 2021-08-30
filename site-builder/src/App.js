import { BrowserRouter as Router, Route } from 'react-router-dom';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import './App.css';

function App() {
  function handleSubmit(event) {
    event.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      'http://localhost/site-builder-app/api/login/index.php',
      true
    );
    xhr.onload = function () {
      if (this.status == 200) {
        console.log(this.responseText);
      }
    };
    xhr.send();
  }
  return (
    <div className='App'>
      Hello world
      <form onSubmit={handleSubmit}>
        <input type='submit' value='Submit' />
      </form>
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
                'http://localhost/site-builder-app/api/upload/index.php',
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

export default App;
