import React, { useState, useEffect } from 'react';
import axios from 'axios';
import robo from './robo.svg';
import Typewriter from 'typewriter-effect';
import ReactMarkdown from 'react-markdown';

function App() {
  const [generatedPost, setGeneratedPost] = useState('');
  const [platform, setPlatform] = useState('');
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePost = async (e) => {
    e.preventDefault();

    try {
      setIsGenerating(true);

      const response = await axios.post('http://localhost:4000/generate-post', {
        platform: platform,
        topic: topic,
      });
      setGeneratedPost(response.data.generatedText);
    } catch (error) {
      console.error('Error generating post:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="w-11/12 mx-auto my-12 flex flex-col items-center">
        <div>
          <h1 className="text-4xl text-bold">Content.AI</h1>
        </div>
        <div>
          <img src={robo} className="w-28" alt="Robot" />
        </div>
        <form className="w-full" onSubmit={handleGeneratePost}>
          <div className="upper w-2/5 mx-auto justify-center flex flex-col">
            <div className="form-control w-full my-4">
              <label className="label">
                <span className="label-text">Which platform are you posting on</span>
              </label>
              <input
                required
                maxLength={10}
                type="text"
                placeholder="LinkedIn / Instagram / Twitter / DevTo"
                className="input input-bordered w-full"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              />
            </div>
            <div className="form-control w-full my-4">
              <label className="label">
                <span className="label-text">What's your topic for the post?</span>
              </label>
              <input
                required
                maxLength={50}
                type="text"
                placeholder="won 1st prize in coding contest of leetcode"
                className="input input-bordered w-full"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="mx-auto">
              <button className="btn btn-outline btn-success" type="submit" disabled={isGenerating}>
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>
        </form>
        <div className="lower w-4/5 my-8">
          <div className="text-center mx-auto">
            <p className="text-red-500 text-sm">
          Content.AI can make mistakes. Consider checking important information.
            </p>
          </div>
          <div className="mockup-window border bg-base-300">
            <div className="justify-center p-4 bg-base-200 text-justify">

              {generatedPost ? (
                <>
                  {/* {generatedPost} */}
                  <ReactMarkdown children={generatedPost} />
                </>
              ) : (
                'Waiting for input!'
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
