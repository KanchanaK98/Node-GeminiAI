import React, { useState } from 'react';
import DialogBox from './DialogBox';
import axios from 'axios';

function Main() {
  const [text, setText] = useState('');
  const [count, setCount] = useState('');
  const [essay, setEssay] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTopicChange = (event) => {
    setText(event.target.value);
  };
  const handleCountChange = (event) => {
    setCount(event.target.value);
  };

  const handleGenerateEssay = async () => {
    // Send POST request to backend with topic
    try {
      const response = await axios.post('http://localhost:5000/text/processText', {
        text: text,
        count:count
      });
      console.log(response);
      setEssay(response.data.message);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error generating essay:', error);
      // Handle error gracefully (e.g., display error message)
    }
  };

  return (
    <div className="app">
      {/* Main page content */}
      <input type="text" value={text} onChange={handleTopicChange} placeholder="Enter essay topic" />
      <input type="text" value={count} onChange={handleCountChange} placeholder="Enter word count" />
      <button onClick={handleGenerateEssay}>Generate Essay</button>

      {/* Dialog box (using a modal library for example) */}
      <DialogBox essay={essay} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
}

export default Main;
