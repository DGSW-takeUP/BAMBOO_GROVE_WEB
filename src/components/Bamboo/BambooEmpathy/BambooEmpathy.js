import React from 'react';
import classnames from 'classnames/bind';
import PropTypes from 'prop-types';
import style from './BambooEmpathy.scss';
import LIKE_G from 'assets/image/emotion/like.gif';
import LIKE_P from 'assets/image/emotion/like.png';
import LOVE_G from 'assets/image/emotion/love.gif';
import LOVE_P from 'assets/image/emotion/love.png';
import FUNNY_G from 'assets/image/emotion/funny.gif';
import FUNNY_P from 'assets/image/emotion/funny.png';
import COOL_G from 'assets/image/emotion/cool.gif';
import COOL_P from 'assets/image/emotion/cool.png';
import SAD_G from 'assets/image/emotion/sad.gif';
import SAD_P from 'assets/image/emotion/sad.png';
import ANGRY_G from 'assets/image/emotion/angry.gif';
import ANGRY_P from 'assets/image/emotion/angry.png';

const cx = classnames.bind(style);

const BambooEmpathy = ({ empathyType, empathyCount, isEmpathy, handleFunc }) => {
  switch (empathyType) {
  case 'like' :
    return (
      <span className='BambooEmpathy'>
        <span className='BambooEmpathy-wrap'>
          <img
            src={LIKE_P}
            onMouseOver={event => event.currentTarget.src = LIKE_G}
            onMouseOut={event => event.currentTarget.src = LIKE_P}
            className={cx('BambooEmpathy-wrap-icon')}
            onClick={handleFunc}
          />
          <span className='BambooEmpathy-wrap-tooltip'>좋아요</span>
        </span>
        <span className={cx(
          'BambooEmpathy-count',
          { 'BambooEmpathy-count-none': empathyType !== isEmpathy }
        )}>{empathyCount}</span>
      </span>
    );
  case 'love' :
    return (
      <span className='BambooEmpathy'>
        <span className='BambooEmpathy-wrap'>
          <img
            src={LOVE_P}
            onMouseOver={event => event.currentTarget.src = LOVE_G}
            onMouseOut={event => event.currentTarget.src = LOVE_P}
            className={cx('BambooEmpathy-wrap-icon')}
            onClick={handleFunc}
          />
          <span className='BambooEmpathy-wrap-tooltip'>최고예요</span>
        </span>
        <span className={cx(
          'BambooEmpathy-count',
          { 'BambooEmpathy-count-none': empathyType !== isEmpathy }
        )}>{empathyCount}</span>
      </span>
    );
  case 'funny' :
    return (
      <span className='BambooEmpathy'>
        <span className='BambooEmpathy-wrap'>
          <img
            src={FUNNY_P}
            onMouseOver={event => event.currentTarget.src = FUNNY_G}
            onMouseOut={event => event.currentTarget.src = FUNNY_P}
            className={cx('BambooEmpathy-wrap-icon')}
            onClick={handleFunc}
          />
          <span className='BambooEmpathy-wrap-tooltip'>웃겨요</span>
        </span>
        <span className={cx(
          'BambooEmpathy-count',
          { 'BambooEmpathy-count-none': empathyType !== isEmpathy }
        )}>{empathyCount}</span>
      </span>
    );
  case 'cool' :
    return (
      <span className='BambooEmpathy'>
        <span className='BambooEmpathy-wrap'>
          <img
            src={COOL_P}
            onMouseOver={event => event.currentTarget.src = COOL_G}
            onMouseOut={event => event.currentTarget.src = COOL_P}
            className={cx('BambooEmpathy-wrap-icon')}
            onClick={handleFunc}
          />
          <span className='BambooEmpathy-wrap-tooltip'>멋져요</span>
        </span>
        <span className={cx(
          'BambooEmpathy-count',
          { 'BambooEmpathy-count-none': empathyType !== isEmpathy }
        )}>{empathyCount}</span>
      </span>
    );
  case 'sad' :
    return (
      <span className='BambooEmpathy'>
        <span className='BambooEmpathy-wrap'>
          <img
            src={SAD_P}
            onMouseOver={event => event.currentTarget.src = SAD_G}
            onMouseOut={event => event.currentTarget.src = SAD_P}
            className={cx('BambooEmpathy-wrap-icon')}
            onClick={handleFunc}
          />
          <span className='BambooEmpathy-wrap-tooltip'>슬퍼요</span>
        </span>
        <span className={cx(
          'BambooEmpathy-count',
          { 'BambooEmpathy-count-none': empathyType !== isEmpathy }
        )}>{empathyCount}</span>
      </span>
    );
  case 'angry' :
    return (
      <span className='BambooEmpathy'>
        <span className='BambooEmpathy-wrap'>
          <img
            src={ANGRY_P}
            onMouseOver={event => event.currentTarget.src = ANGRY_G}
            onMouseOut={event => event.currentTarget.src = ANGRY_P}
            className={cx('BambooEmpathy-wrap-icon')}
            onClick={handleFunc}
          />
          <span className='BambooEmpathy-wrap-tooltip'>화나요</span>
        </span>
        <span className={cx(
          'BambooEmpathy-count',
          { 'BambooEmpathy-count-none': empathyType !== isEmpathy }
        )}>{empathyCount}</span>
      </span>
    );
  }
};

BambooEmpathy.propTypes = {
  EmpathyIcon: PropTypes.any,
  empathyType: PropTypes.oneOf([
    'like',
    'love',
    'funny',
    'cool',
    'sad',
    'angry'
  ]),
  empathyCount: PropTypes.number,
  isEmpathy: PropTypes.oneOf([
    'like',
    'love',
    'funny',
    'cool',
    'sad',
    'angry',
    'none'
  ]),
  handleFunc: PropTypes.func
};

export default BambooEmpathy;
