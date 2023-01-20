import React from 'react';

export const getMultilinesPText = (text: string) => {
    const regStr = /(\n)/;
    if (regStr.test(text)) {
    // eslint-disable-next-line react/no-array-index-key
        return text.split('\n').map((str, i) => <p key={`p_${i}`}>{str}</p>);
    }
    return text;
};
