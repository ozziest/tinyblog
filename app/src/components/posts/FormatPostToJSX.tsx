import { ExtendedPost } from "@/stores/postStore";
import { Link } from "react-router-dom";

export interface Props {
  data: ExtendedPost;
}

const render = ({ data }: Props) => {
  // Split the content by spaces and newlines
  const regex = /(@[\p{L}\p{N}_]+|#[\p{L}\p{N}_]+|https?:\/\/[^\s]+|\n)/gu;
  const parts = data.content.split(regex);

  return parts.map((part: string, index: number) => {
    if (part === "\n") {
      return <br key={index} />;
    }

    // Check if the part matches any mention
    const mentions = (data?.mentions || []).find(
      (item) => item.username === part,
    );
    if (mentions) {
      return (
        <Link
          key={index}
          to={`/u/${part.slice(1)}`}
          className="transition-colors font-semibold text-neutral-800 hover:underline hover:text-neutral-900"
          onClick={(event) => event.stopPropagation()}
        >
          {part}
        </Link>
      );
    }

    // Check if the part matches any hashtag
    const hashtag = (data?.hashtags || []).find(
      (item) => item.hashtag === part,
    );
    if (hashtag) {
      return (
        <a
          key={index}
          href={`/tags/${part.slice(1)}`}
          className="transition-colors font-semibold text-neutral-800 hover:underline hover:text-neutral-900"
          onClick={(event) => event.stopPropagation()}
        >
          {part}
        </a>
      );
    }

    // // Check if the part matches any link
    const linkMatch = (data?.links || []).find((item) => item.link === part);

    if (linkMatch) {
      return (
        <a
          key={index}
          href={`/redirect/${linkMatch.code}`}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors font-medium text-indigo-800 hover:underline hover:text-indigo-950"
          onClick={(event) => event.stopPropagation()}
        >
          {linkMatch.link}
        </a>
      );
    }

    // Otherwise, render the part as normal text
    return part;
  });
};

const FormatPostToJSX = ({ data }: Props) => {
  const formattedContent = render({ data });

  return <>{formattedContent}</>;
};

export default FormatPostToJSX;
