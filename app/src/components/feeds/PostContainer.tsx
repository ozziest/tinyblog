interface Props {
  children: React.ReactNode;
}

const PostContainer = ({ children }: Props) => {
  return (
    <div className="flex flex-col border border-neutral-100 rounded">
      {children}
    </div>
  );
};

export default PostContainer;
