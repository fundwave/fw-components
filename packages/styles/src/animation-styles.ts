import { html } from "lit";

export const ScaleUpHorizontalCenter = html`
  <style>
    .scale-up-hor-center {
      -webkit-animation: scale-up-hor-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
      animation: scale-up-hor-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    }

    @-webkit-keyframes scale-up-hor-center {
      0% {
        -webkit-transform: scaleX(0.1);
        transform: scaleX(0.1);
      }
      100% {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
      }
    }
    @keyframes scale-up-hor-center {
      0% {
        -webkit-transform: scaleX(0.1);
        transform: scaleX(0.1);
      }
      100% {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
      }
    }
  </style>
`;

export const ScaleUpVerticalBottom = html`
  <style>
    @-webkit-keyframes scale-up-ver-bottom {
      0% {
        -webkit-transform: scaleY(0.4);
        transform: scaleY(0.4);
        -webkit-transform-origin: 0% 100%;
        transform-origin: 0% 100%;
      }
      100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
        -webkit-transform-origin: 0% 100%;
        transform-origin: 0% 100%;
      }
    }

    @keyframes scale-up-ver-bottom {
      0% {
        -webkit-transform: scaleY(0.4);
        transform: scaleY(0.4);
        -webkit-transform-origin: 0% 100%;
        transform-origin: 0% 100%;
      }
      100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
        -webkit-transform-origin: 0% 100%;
        transform-origin: 0% 100%;
      }
    }

    .scale-up-ver-bottom {
      -webkit-animation: scale-up-ver-bottom 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
      animation: scale-up-ver-bottom 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    }
  </style>
`;
