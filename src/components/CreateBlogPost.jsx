import deleteImageInFirebase from "@/firebase/deleteImageInFirebase";
import { uploadImageToFirebase, uploadBase64ImageToFirebase } from "@/firebase/uploadImageToFirebase";
import JoditEditor from "jodit-react";
import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import { useMemo } from "react";
import { Button } from "./ui/button";
import { ArticleFormContext } from "@/Context";
import { useArticleFormContext } from "@/UseArticleFormContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { IoIosClose } from "react-icons/io";
import uploadDocument from "@/firebase/uploadDocumentToFirestore";
import { useNavigate } from "react-router-dom";
import { extractSummaryFromArticle } from "@/utils/utils";

const defaultArticle = {
  'id': '',
  'title': '',
  'content': '',
  'thumbnailImage': '',
  'tags': [],
  'fetchCount': 0
}

const articleSummary = {
  'id': '',
  'title': '',
  'content': '',
  'thumbnailImage': '',
  'createdAt': ''
}
const placeholder = {
  value: "Start Typing here"
}

export default function CreateBlogPost({ article = defaultArticle, updateHandler }) {
  const [step, setStep] = useState(1);
  const [selectedImage, setSeletedImage] = useState(undefined);
  const [articleForm, setArticleForm] = useState(article);

  return (
    <ArticleFormContext.Provider value={{ articleForm, setArticleForm }}>
      {step === 1 && <StepOne setStep={setStep} placeholder={placeholder} />}
      {step === 2 && <StepTwo setStep={setStep} selectedImage={selectedImage} setSeletedImage={setSeletedImage} updateHandler={updateHandler} />}
    </ArticleFormContext.Provider>
  )
}

CreateBlogPost.propTypes = {
  article: PropTypes.object,
  updateHandler: PropTypes.func,
}

const StepOne = ({ placeholder, setStep }) => {
  const editorRef = useRef(null);
  const { articleForm, setArticleForm } = useArticleFormContext();
  console.log(articleForm)
  const [content, setContent] = useState(articleForm.content);

  // Store imageupload success obj {url,filename}
  const [imagesInContent, setImagesInContent] = useState([]);
  placeholder = placeholder ? placeholder.value : "Start typing here";
  const config = useMemo(() => ({
    placeholder: placeholder,
    style: {
      textAlign: "left",
    },
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
                  console.log("called in handler success")
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
          console.log("called in upload func")
          const imageUrl = successObj.url
          setImagesInContent(prev => [...prev, successObj]);
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
  }), [placeholder]);

  const onChangeHandler = useCallback(
    (newContent) => {
      console.log(content);
      setContent(newContent);

      console.log("next ", imagesInContent)
      const imageUrlsInEditor = Array.from(content.matchAll(/<img src="([^"]+)"/g)).map(match => match[1]);
      console.log("imageUrls in editor", imageUrlsInEditor)
      console.log("images in content", imagesInContent)
      const decodedUrls = imageUrlsInEditor.map(url => url.replace(/&amp;/g, '&'));
      const imagesToDelete = imagesInContent.filter(obj => !decodedUrls.includes(obj.url));
      console.log("images to be deleted ", imagesToDelete)
      imagesToDelete.forEach(obj => {
        const filename = obj.filename;
        console.log("deleted here")
        deleteImageInFirebase(filename).catch(error => console.log("Error deleting image in firebase", error));
      })
      const updatedImages = imagesInContent.filter(obj => !imagesToDelete.includes(obj));
      setImagesInContent(updatedImages);
    }, [content, imagesInContent]
  )

  const onClickHandler = () => {
    setArticleForm({
      ...articleForm,
      content: content
    })
    setStep(2);
  }

  useEffect(() => {
    if (articleForm.content !== '') {
      setContent(articleForm.content);
    }
  }, [articleForm.content])

  return (
    <>
      <div className="editor relative flex flex-col w-full h-full sm:px-1 md:px-10 lg:px-20 py-8 overflow-y-scroll ">
        <JoditEditor
          ref={editorRef}
          value={content}
          tabIndex={0}
          config={config}
          //onBlur={newContent => setContent(newContent)} // Save content on blur
          onChange={newContent => onChangeHandler(newContent)}
        />
      </div>
      <div className="fixed bottom-16 right-4 z-10">
        <Button className="w-auto px-4 py-2" onClick={onClickHandler}>
          Next
        </Button>
      </div>
    </>
  )
}

StepOne.propTypes = {
  placeholder: PropTypes.string
}
StepOne.propTypes = {
  setStep: PropTypes.func.isRequired
}

const StepTwo = ({ setStep, selectedImage, setSeletedImage, updateHandler }) => {
  const { articleForm, setArticleForm } = useArticleFormContext();
  const tagRef = useRef(null);
  const navigate = useNavigate();

  const tagsRemoveHandler = (tag) => {
    const tags = articleForm.tags
    const index = tags.indexOf(tag);
    if (index > -1) {
      tags.splice(index, 1)
    }
    setArticleForm({
      ...articleForm,
      tags: [...tags]
    })
  }

  const addTagHandler = () => {
    const tag = tagRef.current.value
    if (articleForm.tags.includes(tag)) {
      return
    }
    tagRef.current.value = ''
    setArticleForm({
      ...articleForm,
      tags: [...articleForm.tags, tag]
    })
  }

  const titleChangeHandler = (e) => {
    const title = e.target.value
    setArticleForm({
      ...articleForm,
      title: title
    })
  }
  const stepHandler = () => {
    setStep(1);
  }
  const imagePickHandler = async (e) => {
    if (e.target.files.length < 1) {
      return
    }
    if (e.target.files != null && e.target.files.length > 0) {
      const image = e.target.files[0];
      if (selectedImage && image.name === selectedImage) {
        return
      } else if (selectedImage) {
        await deleteImageInFirebase(selectedImage)
      }
      const uploadedImage = await uploadImageToFirebase(image);
      if (uploadedImage) {
        setArticleForm({
          ...articleForm,
          thumbnailImage: uploadedImage.url
        })
        setSeletedImage(uploadedImage.filename)
        return
      }
      throw new Error("Error uploading thumbnail image")
    }
  }

  const articleUploadHandler = async () => {
    if (updateHandler === undefined) {
      articleForm.id = Date.now().toString();
      // upload separate article summary document for summary collections
      articleSummary.id = articleForm.id;
      articleSummary.title = articleForm.title;
      articleSummary.thumbnailImage = articleForm.thumbnailImage;
      articleSummary.content = extractSummaryFromArticle(articleForm.content)
      articleSummary.createdAt = Date.now().toString();

      await uploadDocument(articleSummary, "article-summary")
      await uploadDocument(articleForm, "articles")
    }else{
      await updateHandler(articleForm);
    }
    navigate("/")
  }
  return (
    <div className="flex justify-center w-full h-full sm:px-1 md:px-10 lg:px-20 py-8 overflow-y-scroll">
      <Card className=" relative w-full max-w-2xl mx-2" >
        <CardHeader>
          <CardTitle className=" text-2xl">Article Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" type="text" value={articleForm.title} required onChange={(e) => titleChangeHandler(e)} />
          </div>
          <div className=" grid gap-2">
            <Label htmlFor="thumbnailImage">Thumbnail Image</Label>
            <span></span>
            <Input className=" w-full max-w-xs"
              id="thumbnailImage"
              type="file"
              accept="image/*"
              placeholder="Thumbnail"
              onChange={(e) => imagePickHandler(e)}
              required />
          </div>
          <div className=" grid gap-2">
            <Label htmlFor="tags">Tags</Label>
            {articleForm.tags.map((tag) => (<TagCard key={tag} content={tag} tagsHandler={tagsRemoveHandler} />))}
            <Input id="tags" type="text" required ref={tagRef} />
            <Button onClick={addTagHandler}>Add</Button>
          </div>
        </CardContent>
      </Card>
      <div className=" fixed bottom-16 left-4 z-10">
        <Button className="w-auto px-4 py-2" onClick={stepHandler}>
          Back
        </Button>
      </div>
      <div className=" fixed bottom-16 right-4 z-10">
        <Button className="w-auto px-4 py-2" onClick={articleUploadHandler}>
          {updateHandler? "Save": "Create"}
        </Button>
      </div>
    </div>
  )
}

StepTwo.propTypes = {
  setStep: PropTypes.func.isRequired,
  selectedImage: PropTypes.object,
  setSeletedImage: PropTypes.func,
  updateHandler: PropTypes.func
}

const TagCard = ({ content, tagsHandler }) => {

  return (
    <Card className="w-fit">
      <CardContent className=" w-fit flex p-1 justify-center items-center">
        {content}
        <IoIosClose size={20}
          className=" cursor-pointer"
          onClick={() => tagsHandler(content)}
        />
      </CardContent>
    </Card>
  )
}

TagCard.propTypes = {
  content: PropTypes.string.isRequired,
  tagsHandler: PropTypes.func.isRequired
}