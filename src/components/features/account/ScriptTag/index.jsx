import React from 'react';

function ScriptTag({ src }) {
    return <script src={src} defer />;
}

export default ScriptTag;