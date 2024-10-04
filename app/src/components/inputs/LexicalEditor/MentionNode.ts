/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextNode } from "lexical";

// Define the custom MentionNode class
export class MentionNode extends TextNode {
  static getType() {
    return "mention";
  }

  static clone(node: any) {
    return new MentionNode(node.__text, node.__key);
  }

  createDOM(config: any) {
    const dom = super.createDOM(config);
    dom.className = "editor-mention"; // Style the mention
    return dom;
  }

  static importJSON(serializedNode: any) {
    const node = new MentionNode(serializedNode.text);
    return node;
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: "mention",
    };
  }
}

export function $createMentionNode(mentionText: any) {
  const mentionNode = new MentionNode(mentionText);
  mentionNode.setMode("token");
  return mentionNode;
}
