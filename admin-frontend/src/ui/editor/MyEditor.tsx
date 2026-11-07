import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface EditorProps {
    onChange: (data: string) => void;
    value: string;
}
import 'ckeditor5/ckeditor5.css';
const MyEditor: React.FC<EditorProps> = ({ onChange, value }) => {

    return (
        <div>
            <CKEditor
                editor={ClassicEditor}
                data={value}
                config={{
                    licenseKey: 'GPL',
                    toolbar: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'undo',
                        'redo'
                    ],
                    // removePlugins: ['ImageUpload', 'MediaEmbed', 'ImageToolbar', 'ImageCaption', 'ImageStyle'],
                }}
                onChange={(_, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
                onReady={() => {
                    // console.log('Editor is ready to use!', editor);
                }}
                onError={(error) => {
                    const typedError = error as Error & { willEditorRestart?: boolean };

                    if (typedError.willEditorRestart) {
                        console.warn('Editor will restart.');
                    } else {
                        console.error('CKEditor error:', error);
                    }
                }}
            />
        </div>
    );
};

export default MyEditor;
