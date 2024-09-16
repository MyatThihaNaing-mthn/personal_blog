import deleteImageInFirebase from "@/firebase/deleteImageInFirebase";
import {uploadImageToFirebase, uploadBase64ImageToFirebase} from "@/firebase/uploadImageToFirebase";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import PropTypes from 'prop-types';

export default function CreateBlogPost({ placeholder="Tpye here" }) {
    const editorRef = useRef(null);
    const [content, setContent] = useState('');
    // Store imageupload success obj {url,filename}
    const [imagesInContent, setImagesInContent] = useState([]);

    const config = {
        placeholder: placeholder,
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
                    .then((successObj) => {
                      this.selection.insertImage(successObj.url);
                      setImagesInContent(prev => [...prev, successObj]);
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
              const successObj = await uploadImageToFirebase(file);
              const imageUrl = successObj.url
              return {
                success: true,
                data: [{ imageUrl }]
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

    const onChangeHandler = (content) => {
      console.log(content);

      setContent(content);

      const imageUrlsInEditor = Array.from(content.matchAll(/<img src="([^"]+)"/g)).map(match => match[1]);

      const deletedImages = imagesInContent.filter(obj => !imageUrlsInEditor.includes(obj.url));

      deletedImages.forEach(obj => {
        const filename = obj.filename;
        deleteImageInFirebase(filename).catch(error => console.log("Error deleting image in firebase", error));
      })
      const updatedImages = imagesInContent.filter(obj => !deletedImages.includes(obj));
      setImagesInContent(updatedImages);
    }
    return (
        <div className="editor w-full px-20 py-8">
            <JoditEditor
                ref={editorRef}
                value={content}
                tabIndex={1}
                config={config}
                onBlur={newContent => setContent(newContent)} // Save content on blur
                onChange={newContent => onChangeHandler(newContent)}
            />
        </div>
    )
}

CreateBlogPost.propTypes = {
  placeholder : PropTypes.string
}