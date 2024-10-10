/* eslint-disable @typescript-eslint/no-explicit-any */

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { CharacterLimitPlugin } from "@lexical/react/LexicalCharacterLimitPlugin";
import {
  AutoLinkPlugin,
  createLinkMatcherWithRegExp,
} from "@lexical/react/LexicalAutoLinkPlugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  EditorState,
  EditorThemeClasses,
  LexicalEditor,
} from "lexical";
import { HashtagNode } from "@lexical/hashtag";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import "./LexicalEditor.scss";
import MentionPlugin from "./MentionPlugin";
import { MentionNode } from "./MentionNode";
import { OverflowNode } from "@lexical/overflow";
import { useState } from "react";
import api from "@/api";
import useAuthStore from "@/stores/authStore";
import { IPostApi } from "@/types/ApiTypes";
import { ExtendedPost, IPostStore } from "@/stores/postStore";

const TinyBlogEditorTheme: EditorThemeClasses = {
  hashtag: "hashtag",
  link: "link",
  characterLimit: "character-limit",
};

const urlRegExp = new RegExp(
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/,
);
export function validateUrl(url: string): boolean {
  return url === "https://" || urlRegExp.test(url);
}

const URL_REGEX =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

const MATCHERS = [
  createLinkMatcherWithRegExp(URL_REGEX, (text) => {
    return text;
  }),
  createLinkMatcherWithRegExp(EMAIL_REGEX, (text) => {
    return `mailto:${text}`;
  }),
];

function onError(error: any) {
  console.error(error);
}

interface Props {
  initialState?: string;
  store: IPostStore;
  parent?: ExtendedPost;
  onShared?: (post: IPostApi) => void;
}

function Editor({ initialState = undefined, store, parent, onShared }: Props) {
  const authStore = useAuthStore();
  const [content, setContent] = useState<string>("");
  const [lexical, setLexical] = useState<object>({});
  const [editor, setEditor] = useState<LexicalEditor>();

  const initialConfig = {
    editorState: (editor: LexicalEditor) => {
      const root = $getRoot();
      root.clear();
      const p = $createParagraphNode();
      p.append($createTextNode(initialState));
      root.append(p);

      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        onChange(editor.getEditorState(), editor);
      });
    },
    namespace: "TinyBlog",
    theme: TinyBlogEditorTheme,
    nodes: [HashtagNode, MentionNode, AutoLinkNode, LinkNode, OverflowNode],
    onError,
  };

  const onChange = (editorState: EditorState, editor: LexicalEditor) => {
    if (editor) {
      setEditor(editor);
    }

    editorState.read(() => {
      const plainText = $getRoot().getTextContent();
      setContent(plainText);

      const jsonContenxt = editorState.toJSON();
      setLexical(jsonContenxt);
    });
  };

  const clearState = () => {
    if (editor) {
      // onChange(editor.getEditorState(), editor);
      setContent(initialState || "");
      editor.update(() => {
        const root = $getRoot();
        root.clear();
        const p = $createParagraphNode();
        p.append($createTextNode(initialState));
        root.append(p);
      });
    }
  };

  const handleShare = async () => {
    const response = await api.post.store({
      content: content,
      lexical: JSON.stringify(lexical),
      parent_id: parent?.id,
    });
    const post = await response.json();

    authStore.increase("stats_post");
    clearState();

    const newPost: IPostApi = {
      id: post.id,
      content: post.content,
      created_at: post.created_at,
      updated_at: post.updated_at,
      stats_likes: 0,
      stats_shares: 0,
      stats_views: 0,
      stats_replies: 0,
      user: authStore.state.user,
      is_liked_by_you: false,
      is_shared_by_you: false,
      hashtags: post.hashtags,
      mentions: post.mentions,
      links: post.links,
    };

    if (onShared) {
      onShared(newPost);
    } else {
      store.pushPost(newPost);
    }
  };

  return (
    <div className="editor-shell">
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <AutoLinkPlugin matchers={MATCHERS} />
        <LinkPlugin validateUrl={validateUrl} />
        <HashtagPlugin />
        <MentionPlugin />
        <ClickableLinkPlugin />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <div className="button-bar flex justify-between items-center py-2">
          <CharacterLimitPlugin charset={"UTF-16"} maxLength={240} />
          <button
            type="button"
            className="px-3 py-1 border bg-gray-200 hover:bg-gray-300 rounded font-semibold text-sm disabled:text-neutral-300"
            onClick={handleShare}
            disabled={content.trim().length === 0}
          >
            Share
          </button>
        </div>
      </LexicalComposer>
    </div>
  );
}

export default Editor;
