import React, { Component } from 'react';
import { PostWrapper, Navigate, Post, Warning } from '../../components';
import * as service from '../../services/post';

class PostContainer extends Component {
  constructor(props) {//LifeCycleAPI for initialize state
    super();
    this.state = {//component 호출됐을 때 state 초기화
      postId: 1,
      fetching: false,//knowing request waiting request or complete. true: requesting, false: complete
      warning: false,
      post: {
        title: null,
        body: null
      },
      comments: [],
      styles: {
        opacity: 0,
      }
    };
  }
  componentDidMount() {//LifeCycleAPI for ajax request
    this.fetchPostInfo(1);
  }

  fetchPostInfo = async (postId) => {//async-await ajax call via axios
    this.setState({
      fetching: true //requsting
    });

    try {
      //wait for two promises
      const info = await Promise.all([//여러개의 post를 한번에 전달할 때 Promise.all을 사용한다.
        service.getPost(postId),
        service.getComments(postId)
      ]);
      console.log(info);
      /* post 순서대로 하나씩 전달할 때
      //async-await: 비동기 작업을 동기작업 하듯이 코드 작성(callback이나 promise 사용되지 않음)
      const post = await service.getPost(postId);//await: Promise를 기다려주는 역할
      console.log(post);
      const comments = await service.getComments(postId);
      console.log(comments);
      */

      const { title, body } = info[0].data;
      const comments = info[1].data;

      this.setState({
        post: {
          title,
          body
        },
        comments,
        fetching: false, //done
        warning: false,
        postId
      });

    } catch(e) {
      this.setState({
        fetching: false,
        warning: true
      });
      console.log('error occured', e);
    }
  }

  warningAni = () => {
    const frame = () => {
      console.log("warninng ani running");
      this.setState((state) => {
        if(state.styles.opacity > 0.8) {
          clearInterval(id);
          return {styles: {opacity: 0}}
        }
        return {styles: {opacity: state.styles.opacity + 0.01}}
      })
    }
    var id = setInterval(frame, 15);
  }

  handleNavigateClick = (direction) => {
    const postId = this.state.postId;
    if(direction === "Prev") {
      this.fetchPostInfo(postId-1);
      this.warningAni();
    }
    if(direction === "Next") this.fetchPostInfo(postId+1);
  }

  render() {
    const { postId, fetching, post, comments, styles } = this.state;

    if(!this.state.warning) {
      return (
        <PostWrapper>
          <Navigate
            postId={postId}
            disabled={fetching}
            onClick={this.handleNavigateClick}
          />
          <Post
            title={post.title}
            body={post.body}
            comments={comments}
          />
        </PostWrapper>
      );
    } else {
      return (
        <PostWrapper>
          <Navigate
            postId={postId}
            disabled={fetching}
            onClick={this.handleNavigateClick}
          />
          <Post
            title={post.title}
            body={post.body}
            comments={comments}
          />
          <Warning
            styles={styles}
          />
        </PostWrapper>
      );
    }
  }
}

export default PostContainer;
