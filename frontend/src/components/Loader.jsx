import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div id="box">
        <div id="l1">L</div>
        <div id="l2">O</div>
        <div id="l3">A</div>
        <div id="l4">D</div>
        <div id="l5">I</div>
        <div id="l6">N</div>
        <div id="l7">G</div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #box div {
    display: inline-block;
    margin: 5px;
    font-size: 35px;
    animation: 2s obrot linear infinite;
  }

  #box {
    width: 500px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @keyframes obrot {
    0% {
      transform: rotateX(0);
    }
    12.5% {
      transform: rotateX(90deg);
    }
    25% {
      transform: rotateX(180deg);
    }
    37.5% {
      transform: rotateX(270deg);
    }
    50% {
      transform: rotateX(360deg);
    }
    100% {
      transform: rotateX(360deg);
    }
  }

  #box div:nth-child(1) {
    animation-delay: 0s;
  }
  #box div:nth-child(2) {
    animation-delay: 0.1s;
  }
  #box div:nth-child(3) {
    animation-delay: 0.2s;
  }
  #box div:nth-child(4) {
    animation-delay: 0.3s;
  }
  #box div:nth-child(5) {
    animation-delay: 0.4s;
  }
  #box div:nth-child(6) {
    animation-delay: 0.5s;
  }
  #box div:nth-child(7) {
    animation-delay: 0.6s;
  }`;

export default Loader;
