import React, { useState, useEffect } from 'react';
declare const chrome: any;

const Extension: React.FC = () => {
  const [count, setCount] = useState<number | any>(0);
  const [scan, setScan] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const countSearches = (targetUrl: string) => {
    if (chrome && chrome.history) {
      chrome.history.search({ text: targetUrl }, (results: any) => {
        const resultsCount = results.length;
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
  };

  const handleHome = () => {
    setDeleted(false);
    setScan(false);
  };

  return (
    <div>
      {!scan && <button onClick={handleClick}>Scan history for PornHub searches</button>}
      {scan && (
        <div>
          <h1>PornHub Search History Scan Results</h1>
          <p>Results found: {count}</p>
          <button onClick={handleDelete}>Remove from history</button>
        </div>
      )}
      {deleted && (
        <div>
          <p>{count} results removed from search history</p>
          <button onClick={handleHome}>Home</button>
        </div>
      )}
    </div>
  );
};

export default Extension;
