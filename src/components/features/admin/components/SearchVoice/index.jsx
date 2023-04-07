// import React from 'react'
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
// import MicNoneIcon from '@mui/icons-material/MicNone';
// import IconButton from '@mui/material/IconButton';

// const VoiceSearch = () => {
//     const { transcript, resetTranscript } = useSpeechRecognition()

//     if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//         console.log('không hỗ trợ thư viện')
//     }

//     return (
//         <div style={{ color: 'black', padding: '200px', minHeight: '500px' }}>
//             < IconButton color="secondary" onClick={SpeechRecognition.startListening} > <MicNoneIcon /></IconButton>
//             {/* <button onClick={SpeechRecognition.stopListening}>Stop</button>
//             <button onClick={resetTranscript}>Reset</button> */}
//             <p>{transcript}</p>
//         </div>
//     )
// }
// export default VoiceSearch