/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import '../styles/feed.css';

function FeedBack(): JSX.Element {
  return (
    <div className='container-feed'>
    <div className='feedback'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '25px 0 0 0 ',
        width: '25em',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '800px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <iframe
          style={{
            width: '100%',
            height: '100%',
            border: '1px',
            borderRadius: '8px',
            boxSizing: 'border-box',
          }}
          src="https://yandex.ru/maps-reviews-widget/164177238830?comments"
        />
      </div>
    </div>
    </div>
  );
}

export default FeedBack;
