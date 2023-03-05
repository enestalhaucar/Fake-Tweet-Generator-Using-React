import React, { useState, createRef, useEffect } from 'react';
import MyLoader from './MyLoader.js';
import { useScreenshot } from 'use-react-screenshot';
import './style.scss';
import {
  ReplyIcon,
  RetweetIcon,
  LikeIcon,
  ShareIcon,
  VerifiedIcon,
} from './icons.js';

const tweetFormat = (tweet) => {
  tweet = tweet
    .replace(/@([\w]+)/g, '<span>@$1</span>')
    .replace(/#([\wşçöğüıİ]+)/gi, '<span>#$1</span>')
    .replace(/(https?:\/\/[\w\.\/]+)/, '<span>$1</span>')
    .replace(/\n/g, '<br />');
  return tweet;
};
const formatNumber = (number) => {
  if (!number) {
    number = 0;
  }
  if (number < 1000) {
    return number;
  }
  number /= 1000;
  number = String(number).split('.');

  return (
    number[0] + (number[1] > 100 ? ',' + number[1].slice(0, 1) + ' B' : ' B')
  );
};

export default function App() {
  const tweetRef = createRef(null);
  const downloadRef = createRef();
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [tweet, setTweet] = useState();
  const [avatar, setAvatar] = useState();
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const [view, setView] = useState();
  const [retweet, setRetweet] = useState();
  const [quotes, setQuotes] = useState();
  const [likes, setLikes] = useState();
  const [isVerified, setIsVerified] = useState(1);
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => takeScreenshot(tweetRef.current);

  useEffect(() => {
    if (image) {
      downloadRef.current.click();
    }
  }, [image]);

  const avatarHandle = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', function () {
      setAvatar(this.result);
    });
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="tweet-settings">
        <h3>Tweet Settings</h3>
        {/* Input Name and Changing Name  */}
        <label className="labelInput">Name</label>
        <input
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* Input username and Changing Username  */}
        <label className="labelInput">Username</label>
        <input
          className="input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* Input Tweet and Changing Tweet  */}
        <label className="labelInput">Tweet</label>
        <input
          className="input"
          type="textarea"
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
        />
        {/* Input Avatar and Changing Avatar  */}
        <label className="labelInput">Avatar</label>
        <input className="input" type="file" onChange={avatarHandle} />
        {/* Input Time and Changing Time  */}
        <label className="labelInput">Time</label>
        <input
          className="input"
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        {/* Input Date and Changing Date  */}
        <label className="labelInput">Date</label>
        <input
          className="input"
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {/* Input View and Changing View  */}
        <label className="labelInput">View</label>
        <input
          className="input"
          type="text"
          value={view}
          onChange={(e) => setView(e.target.value)}
        />
        {/* Input Retweet and Changing Retweet  */}
        <label className="labelInput">Retweet</label>
        <input
          className="input"
          type="number"
          value={retweet}
          onChange={(e) => setRetweet(e.target.value)}
        />
        {/* Input Quotes and Changing Quotes  */}
        <label className="labelInput">Quotes</label>
        <input
          className="input"
          type="number"
          value={quotes}
          onChange={(e) => setQuotes(e.target.value)}
        />
        {/* Input Likes and Changing Likes  */}
        <label className="labelInput">Likes</label>
        <input
          className="input"
          type="number"
          value={likes}
          onChange={(e) => setLikes(e.target.value)}
        />
        {/* Input Likes and Changing Likes  */}
        <label>Doğrulanmış Hesap</label>
        <select
          onChange={(e) => setIsVerified(e.target.value)}
          defaultValue={isVerified}
        >
          <option value="1">Evet</option>
          <option value="0">Hayır</option>
        </select>
        <button className="btn" onClick={getImage}>
          Generate
        </button>
        <div className="download-url">
          {image && (
            <a ref={downloadRef} href={image} download="tweet.png">
              Download Screenshot
            </a>
          )}
        </div>
      </div>
      <div className="tweet-container">
        <div className="tweet" ref={tweetRef}>
          <div className="tweet-author">
            {(avatar && <img src={avatar} />) || <MyLoader />}
            <div>
              <div className="nameandicon">
                <div className="name">{name || 'Undefined'}</div>
                {isVerified == 1 && <VerifiedIcon width="19" height="19" />}
              </div>
              <div className="username">{'@' + username || '@undefined'}</div>
            </div>
          </div>
          <div className="tweet-content">
            <p
              dangerouslySetInnerHTML={{
                __html:
                  (tweet && tweetFormat(tweet)) ||
                  'Bu alana örnek tweet gelecek',
              }}
            />
          </div>
          <div className="tweet-dates">
            <span>{time || '0:00 AM-or-PM'}</span>
            <span>·</span>
            <span>{date || 'Month Day, Year'}</span>
            <span>·</span>
            <span>
              <b>{view || 'NaN'}</b> Views
            </span>
          </div>
          <div className="tweet-stats">
            <span>
              <b>{formatNumber(retweet) || 'NaN'}</b> Retweets
            </span>
            <span>
              <b>{formatNumber(quotes) || 'NaN'}</b> Quotes
            </span>
            <span>
              <b>{formatNumber(likes) || 'NaN'}</b> Likes
            </span>
          </div>
          <div className="tweet-actions">
            <span>
              {<ReplyIcon color="#6e767e" width="20px" height="20px" />}
            </span>
            <span>
              {<RetweetIcon color="#6e767e" width="20px" height="20px" />}
            </span>
            <span>
              {<LikeIcon color="#6e767e" width="20px" height="20px" />}
            </span>
            <span>
              {<ShareIcon color="#6e767e" width="20px" height="20px" />}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
