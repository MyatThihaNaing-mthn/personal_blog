import JoditEditor from "jodit-react";
import { useMemo, useRef, useState } from "react";

export default function CreateBlogPost({placeholder}) {
    const editorRef = useRef(null);
    const [content, setContent] = useState('');
    const config = useMemo(() => ({
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        placeholder: placeholder || 'Start typings...'
    }),
    [placeholder]
);
    return (
        <div className="editor w-full px-20 py-8">
            <JoditEditor
                ref={editorRef}
                value={content}
                tabIndex={1}
                config={config}
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			    onChange={newContent => {}}
            />
        </div>
    )
}

