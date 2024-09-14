import {uploadImageToFirebase, uploadBase64ImageToFirebase} from "@/firebase/uploadImageToFirebase";
import JoditEditor from "jodit-react";
import { useMemo, useRef, useState } from "react";

export default function CreateBlogPost({ placeholder }) {
    const editorRef = useRef(null);
    const [content, setContent] = useState('');

    const config = {
        uploader: {
          insertImageAsBase64URI: true,
          url: '',
          imagesExtensions: ['jpg', 'png', 'jpeg', 'gif'],
          filesVariableName: 'files',
          withCredentials: false,
          prepareData: function (formData) {
            return formData;
          },
          isSuccess: function (resp) {
            return resp.success;
          },
          getMsg: function (resp) {
            return resp.data.messages !== undefined && resp.data.messages.length
              ? resp.data.messages.join(' ')
              : '';
          },
          process: function (resp) {
            return {
              files: resp.data
            };
          },
          error: function (e) {
            this.jodit.events.fire('errorMessage', [e.message]);
          },
          defaultHandlerSuccess: function (data) {
            console.log(data)
            if (data.files && data.files.length) {
              data.files.forEach((file) => {
                if (file.startsWith('data:image')) {
                  // If it's a base64 image, upload it to Firebase first
                  uploadBase64ImageToFirebase(file, "test")
                    .then((url) => {
                      this.selection.insertImage(url);
                    })
                    .catch((error) => {
                      console.error('Error uploading base64 image:', error);
                    });
                } else {
                  // If it's already a URL, insert it directly
                  this.selection.insertImage(file.url);
                }
              });
            }
          },
          upload: async function (data) {
            const file = data.getAll('files')[0];
            try {
              const url = await uploadImageToFirebase(file);
              return {
                success: true,
                data: [{ url }]
              };
            } catch (error) {
              return {
                success: false,
                data: {
                  messages: [error.message]
                }
              };
            }
          }
        }
      };
    return (
        <div className="editor w-full px-20 py-8">
            <JoditEditor
                ref={editorRef}
                value={content}
                tabIndex={1}
                config={config}
                onBlur={newContent => setContent(newContent)} // Save content on blur
                onChange={newContent => { }}
            />
        </div>
    )
}

