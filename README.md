# React ajax tutorial
Simple react ajax request via axios, without redux. Virtual server(JSONPlaceholder) used. SNS kind of page construct via react. Animation(Warning, Translate) applied version. Check it via [githubPages](https://ginnyang2.github.io/react-ajax-tutorial/)

![](./video/ReactAppAjax.gif)

## Components structure
<p align="center">
  <img width="80%" src="./image/react-ajax-tutorial-structure.png" />
</p>

## Apply Warning Animation
When it fails to post request, Warning Animation appears to know user that request is failed. There are two ways to adapt animation. The one is using SetInterval, the other is using SetTimeout. I chose the previous one, blogger who wrote reference chose the latter. Compare two structures below.

### Using SetInterval
<p align="center">
  <img width="80%" src="./image/applyWarningAni_gibaekWay.png" />
</p>

### Using SetTimeout
<p align="center">
  <img width="80%" src="./image/applyWarningAni_velopertWay.png" />
</p>

## Reference
- React tutorial - Velopert Blog [컴포넌트 구성 & AJAX & 애니메이션](https://velopert.com/2597)
- JSONPlaceholder - [Fake online REST API for Testing and Prototyping](https://jsonplaceholder.typicode.com/)
