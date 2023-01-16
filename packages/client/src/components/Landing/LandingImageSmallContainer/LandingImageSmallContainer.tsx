import React from 'react';
import { LandingImageSmallContainerProps } from './LandingImageSmallContainer.types';

const getFormattedText = (text:string) => {
    const regStr = /(\n)/;
    if (regStr.test(text)) {
        // eslint-disable-next-line react/no-array-index-key
        return text.split('\n').map((str, i) => <p key={`p_${i}`}>{str}</p>);
    }
    return text;
};

export default function LandingImageSmallContainer({ image, text }: LandingImageSmallContainerProps) {
    return (
        <div className="landingImageContainer">
            <div className="landingImageContainerTextBlock">
                <span className="landingImageContainerText">
                    {getFormattedText(text)}
                </span>
            </div>
            <div className="landingImageOuterWrapper">
                <div className="landingImageWrapper">
                    <img className="landingImage" src={image} alt={text} />
                </div>
            </div>
        </div>
    );
}
