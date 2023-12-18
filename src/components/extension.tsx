import React, { useState, useEffect } from 'react';
import './extension.css'




declare const chrome: any;


const Extension: React.FC = () => {
  const [count, setCount] = useState<number | any>(0);
  const [scan, setScan] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const countSearches = (targetUrl: string) => {
    if (chrome && chrome.history) {
      chrome.history.search({ text: targetUrl }, (results: any) => {
        const resultsCount = results.length;
        console.log(resultsCount)
        setCount(resultsCount);
      });
    } else {
      console.error("chrome.history is not available");
    }
  };

  const removeSearches = (targetUrl: string) => {
    if (chrome && chrome.history) {
      chrome.history.search({ text: targetUrl }, (results: any) => {
        const urlsToDelete = results.map((result: { url: any }) => result.url);
        urlsToDelete.forEach((url: any) => {
          chrome.history.deleteUrl({ url }, () => {
            console.log(`History entry deleted: ${url}`);
          });
        });
      });
    } else {
      console.error("chrome.history is not available");
    }
  };

  const handleClick = () => {
    const targetUrl = "pornhub.com";
    countSearches(targetUrl);
    setScan(true);
    console.log('clicked');
  };

  const handleDelete = () => {
    const targetUrl = "pornhub.com";
    removeSearches(targetUrl);
    setDeleted(true);
    setScan(false);
  };

  

  return (
    <div>
      {!scan && <button className='scan-btn' onClick={handleClick}>Scan history <span>for PornHub searches</span></button>}
      {scan && (
        <div className='results-div'>
          <h1>PornHub Search History Scan Results</h1>
          <p>Results found: {count}</p>
          <button className='delete-btn' onClick={handleDelete}>Remove <span>from history</span></button>
        </div>
      )}
      {deleted && (
        <div className='deleted-div'>
          <p>{count} results removed from search history</p>
        </div>
      )}
    </div>
  );
};

export default Extension;
