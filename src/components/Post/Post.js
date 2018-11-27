import React, { Component } from 'react';
import './Post.css';
import { CommentList } from '../';

class Post extends Component {
  constructor(props) {
    super();
    this.state = {
      postId: 0,
      title: '',
      body: '',
      comments: [],
      navDirection: '',
      didComponentOut: false
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if( (nextProps.postId !== this.props.postId) && this.state.didComponentOut ) {
      console.log('UNSAFE_different');
      const navDirection = (this.props.postId <= nextProps.postId) ? 'right' : 'left';

      console.log("SetTimeout running");
      setTimeout( () => {
        console.log("SetTimeout finished");
        const { postId, title, body, comments } = nextProps;
        this.setState({
          postId,
          title,
          body,
          comments,
          didComponentOut: false//animation stop trigger
        });
        /* 이전 state의 내용이 담긴 Post의 Out Animation이 적당히 진행되기를 기다린 후
        새로운 props를 state로 담아서 Post rendering 시키고 In Animation을 동작시키기 위한
        싱크 맞추기: animation 1000ms <=> setTimeout 300ms */
      }, 300);

      this.setState({
        navDirection
      })
      return;
    }

    if(!this.props.postId) {//아직 fetching이 일어나기 전에 Post가 먼저 rendering 되므로 첫 Post가 보이기 위한 경계조건
      console.log('UNSAFE_nothing different_firstRender');
      const { postId, title, body, comments } = nextProps;
      this.setState({
        postId,
        title,
        body,
        comments
      });
    } else {//첫 경계조건 이후 animation start trigger
      console.log('UNSAFE_nothing different_afterFirstRender');
      this.setState({
        didComponentOut: true
      });
    }
  }
  shouldComponentUpdate(nextProps) {
    console.log('shouldComoponentUpdate');
    /*navDirection이 right/left 변환될 때 setState({didComponentOut: true})으로 인해
    한 차례 이전 Animation이 rendering되는 것을 막기 위한 조건이다.*/
    if((nextProps.postId === this.props.postId) && !this.state.didComponentOut) return false;
    //첫 페이지 이전으로 가려고 할 때 한번의 leftout 애니메이션이 발생하는것을 막기위한 경계조건
    if(nextProps.postId === 1 && this.props.postId === 1 && this.state.postId === 1) return false;
    return true;
  }

  render() {
    const { title, body, comments, navDirection, didComponentOut } = this.state;
    let animation = '';
    if(navDirection) {
      animation = didComponentOut
                ? ( (navDirection === 'right') ? 'rightOut' : 'leftOut' )
                : ( (navDirection === 'right') ? 'rightIn' : 'leftIn' );
    }
    console.log(`render(): ${animation}`);

    return (
      <div className = {`Post ${animation}`}>
        <h1>{title}</h1>
        <p>
          {body}
        </p>
        <CommentList comments={comments}/>
      </div>
    )
  }
}

export default Post;
