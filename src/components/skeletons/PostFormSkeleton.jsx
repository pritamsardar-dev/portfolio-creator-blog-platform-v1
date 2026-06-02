// Placeholder shown while the post form is loading
function PostFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-12 rounded skeleton" />
      <div className="h-12 rounded skeleton" />
      <div className="h-12 rounded skeleton" />
      <div className="h-[260px] rounded skeleton" />
      <div className="h-10 w-40 rounded skeleton" />
    </div>
  );
}

export default PostFormSkeleton;
