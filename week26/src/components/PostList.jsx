// src/components/PostList.jsx
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts, getPostsByUsername, uploadPost } from "../api";
import Post from "./Post";
import { FEED_VARIANT } from "../values";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import PostForm from "./PostForm";
import { toast } from "react-toastify";

function PostList({ variant = FEED_VARIANT.HOME_FEED, showPostForm }) {
  const queryClient = useQueryClient();

  const myUsername =
    queryClient.getQueryData(["auth", "me"])?.username ||
    localStorage.getItem("username") ||
    "";

  let postsQueryKey;
  let postsQueryFn;

  if (variant === FEED_VARIANT.HOME_FEED) {
    postsQueryKey = ["posts", "home"];
    postsQueryFn = () => getPosts();
  } else if (variant === FEED_VARIANT.MY_FEED) {
    postsQueryKey = ["posts", "byUser", myUsername];
    postsQueryFn = () => getPostsByUsername(myUsername);
  } else {
    postsQueryKey = ["posts", "home"];
    postsQueryFn = () => getPosts();
  }

  const {
    data: postsData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: postsQueryKey,
    queryFn: postsQueryFn,
  });

  const uploadPostMutation = useMutation({
    mutationFn: uploadPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsQueryKey });
    },
  });

  const handleUploadPost = (newPost) => {
    uploadPostMutation.mutate(newPost, {
      onSuccess: () => {
        toast?.success
          ? toast.success("포스트가 성공적으로 업로드 되었습니다!")
          : alert("포스트가 성공적으로 업로드 되었습니다!");
      },
      onError: () => {
        toast?.error
          ? toast.error("업로드에 실패했습니다.")
          : alert("업로드에 실패했습니다.");
      },
    });
  };

  if (isPending) return <LoadingPage />;
  if (isError) return <ErrorPage message={error?.message} />;

  const posts = postsData?.results ?? [];

  return (
    <ListContainer>
      {showPostForm ? (
        <PostForm
          onSubmit={handleUploadPost}
          disabled={uploadPostMutation.isPending}
          
        />
      ) : (
        ""
      )}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ListContainer>
  );
}

export default PostList;

const ListContainer = styled.div`
  display: grid;
  gap: 20px;
  margin-top: 20px;
`;
