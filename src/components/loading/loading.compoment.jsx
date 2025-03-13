
// =================================
//     Official Loading Screen
// =================================

// LottieAnimation.js
import React from 'react';
import Lottie from 'react-lottie';
// import animationData from '../../assets/newLoading.lottie';
import './loading.style.scss';
import animationData from '../../assets/newLoading.json';

const Loading = ({setHeight=400, setWidth=400}) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return <Lottie options={defaultOptions} height={setHeight} width={setWidth} />;
};

export default Loading;
