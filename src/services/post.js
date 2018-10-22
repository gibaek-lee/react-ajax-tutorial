import axios from 'axios';//document: https://github.com/axios/axios

export function getPost(postId) {
  return axios.get('https://jsonplaceholder.typicode.com/posts/' + postId);
}

export function getComments(postId) {
  return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
}
