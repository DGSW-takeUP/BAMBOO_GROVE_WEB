import React, { useState, useCallback, useEffect } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import 'containers/Bamboo/BambooContainer';
import style from './BambooItem.scss';
import PropTypes from 'prop-types';
import defaultProfileImage from '../../../assets/image/panda.jpg';
import Pagination from 'components/Common/Pagination';
import BammbooCommentTemplate from 'components/Bamboo/BambooItem/BambooComment/BambooCommentTemplate';
import { FaFacebookF } from 'react-icons/fa'; 
import { IoIosArrowDown } from 'react-icons/io';
import ImageIcon from 'components/Common/ImageIcon';
import { MdClear } from 'react-icons/md';
import SecureLS from 'secure-ls';
// import {
//   FaRegGrinBeam, // like
//   FaRegGrinHearts, // love
//   FaRegGrinSquintTears, // funny
//   FaRegSurprise, // cool
//   FaRegSadCry, // sad
//   FaRegAngry // angry
// } from 'react-icons/fa';
import BambooEmpathy from '../BambooEmpathy';

const cx = classnames.bind(style);

// eslint-disable-next-line react/prop-types
const BambooItem = ({ item, comment, writeBambooComment, commentSet, sortCategoryObj, isShowComment, isShowCloseComment, isEmpathy, setIsShowComment, getMoreComment, initialCommentData, commentData, userProfile, handleImageError, handleCloseComment, handleDeletePost, handleRequestEmpathy }) => {
  const [profileImages, setProfileImages] = useState([]);
  const [images, setImages] = useState([]);
  const [names, setNames] = useState([]);
  const { sortCategory, setSortCategory } = sortCategoryObj;

  /* 정렬 카테고리를 눌렀는지 true false */
  const [isClickedSortCategory, setIsClickedSortCategory] = useState(false);

  const handleCategory = useCallback(category => {
    setSortCategory(category);
    setIsClickedSortCategory(false);
  }, []);

  const ls = new SecureLS({ encodingType: 'aes' });
  const userInfo = ls.get('user-info');

  // eslint-disable-next-line react/prop-types
  const { idx, contents, count, joinDate, allowDate, picture, name, profileImage } = item;

  const joinDateFormat = moment(joinDate).format('YYYY-MM-DD HH:mm');
  const allowDateFormat =  moment(allowDate).format('YYYY-MM-DD HH:mm');

  const handleBambooImage = useCallback(async () => {
    // 프로필 이미지 설정
    if (profileImage) {
      setProfileImages(<img className="BambooCard-Top-ProfileImage" src={profileImage}/>);
    } else {
      setProfileImages(<img className="BambooCard-Top-ProfileImage" src={defaultProfileImage}/>);  
    }

    if (picture && picture.length !== 0) {
      const list  = [];

      for (let i = 0; i < picture.length; i++) {
        list.push(picture[i].url);
      }

      setImages(list);
    }

    if (name) {
      setNames(
        <div className="BambooCard-Top-profileContentsWrap-ProfileName">
          {name}
        </div>
      );
    } else {
      setNames(
        <div className="BambooCard-Top-profileContentsWrap-ProfileName">
          익명의 판다
        </div>
      );
    }
  });

  useEffect(() => {
    handleBambooImage();

    initialCommentData(idx);
  }, [sortCategory]);
  
  return (
    <div className="BambooCard">
      <div className="BambooCard-Top">
        {profileImages}
        <div className="BambooCard-Top-profileContentsWrap">
          {names}
          <div className="BambooCard-Top-profileContentsWrap-Subject">
              대나무 숲
          </div>
        </div>
        <div className="BambooCard-Top-dateWrap">
          <div className="BambooCard-Top-dateWrap-JoinDateStyle">
            제보 :
            {
              joinDateFormat
            }
          </div>
          <div className="BambooCard-Top-dateWrap-AllowDateStyle">
            승인 :
            {
              allowDateFormat
            }
          </div>
        </div>
        <a className="BambooCard-Top-FacebookLink" href="https://www.facebook.com/dgswbambooforest/" target="blank">
          <FaFacebookF className="BambooCard-Top-FacebookLinkImage"/>
        </a>
        {
          userInfo.auth === 0 ?
            <span className="BambooCard-Top-DeleteBtn" onClick={handleDeletePost}>
              <MdClear />
            </span> :
            <></>
        }
      </div>
      <div className="BambooCard-Contents">
        <Pagination images={images} />
        <div className="BambooCard-FontStyle">
          <pre className="BambooCard-FontStyle">
            {
              contents
            }
          </pre>
        </div>
        <div className="BambooCard-countFont">
          #대소고_대숲_{count + 1}번째 이야기
        </div>
      </div>
      <div className="BambooCard-commentDiv">
        <div className="BambooCard-commentDiv-contentsBox">
          <div className="BambooCard-commentDiv-contentsBox-top">
            <div className="BambooCard-commentDiv-contentsBox-top-empathy">
              <BambooEmpathy empathyCount={item.empathy === null ? 0 : item.empathy.empathyCount.empathyLike} empathyType={'like'} isEmpathy={isEmpathy} handleFunc={() => handleRequestEmpathy('like')} />
              <BambooEmpathy empathyCount={item.empathy === null ? 0 : item.empathy.empathyCount.empathyLove} empathyType={'love'} isEmpathy={isEmpathy} handleFunc={() => handleRequestEmpathy('love')} />
              <BambooEmpathy empathyCount={item.empathy === null ? 0 : item.empathy.empathyCount.empathyFunny} empathyType={'funny'} isEmpathy={isEmpathy} handleFunc={() => handleRequestEmpathy('funny')} />
              <BambooEmpathy empathyCount={item.empathy === null ? 0 : item.empathy.empathyCount.empathyCool} empathyType={'cool'} isEmpathy={isEmpathy} handleFunc={() => handleRequestEmpathy('cool')} />
              <BambooEmpathy empathyCount={item.empathy === null ? 0 : item.empathy.empathyCount.empathySad} empathyType={'sad'} isEmpathy={isEmpathy} handleFunc={() => handleRequestEmpathy('sad')} />
              <BambooEmpathy empathyCount={item.empathy === null ? 0 : item.empathy.empathyCount.empathyAngry} empathyType={'angry'} isEmpathy={isEmpathy} handleFunc={() => handleRequestEmpathy('angry')} />
            </div>
            <div className="BambooCard-commentDiv-contentsBox-top-sortCategory">
              <button className={cx('BambooCard-commentDiv-contentsBox-top-sortCategory-btn')} 
                onClick={() => setIsClickedSortCategory(!isClickedSortCategory)}
              >
                {sortCategory}
                <IoIosArrowDown className="down_icon"/>
              </button>
              <ul className={cx('BambooCard-commentDiv-contentsBox-top-sortCategory-ul', {'BambooCard-commentDiv-contentsBox-top-sortCategory-ul-hidden': !isClickedSortCategory})}>
                <li className={cx('BambooCard-commentDiv-contentsBox-top-sortCategory-ul-li', {'BambooCard-commentDiv-contentsBox-top-sortCategory-ul-li-clicked': sortCategory === '최신 댓글 순'})} onClick={() => handleCategory('최신 댓글 순')}>최신 댓글 순</li>
                <li className={cx('BambooCard-commentDiv-contentsBox-top-sortCategory-ul-li', {'BambooCard-commentDiv-contentsBox-top-sortCategory-ul-li-clicked': sortCategory === '오래된 댓글 순'})} onClick={() => handleCategory('오래된 댓글 순')}>오래된 댓글 순</li>
              </ul>
            </div>
          </div>
          <div className="BambooCard-commentDiv-contentsBox-commentInputWrap">
            <div className="BambooCard-commentDiv-contentsBox-commentInputWrap-profileImageDiv">
              <ImageIcon
                src={userProfile}
                onErrorFunc={handleImageError}
                observer={userProfile}
              />
            </div>
            <div className="BambooCard-commentDiv-contentsBox-commentInputWrap-inputDiv">
              <input className="BambooCard-commentDiv-contentsBox-commentInputWrap-inputDiv-input" type={'text'} value={comment} onChange={commentSet} autoComplete={'off'}/>
            </div>
            <div className="BambooCard-commentDiv-contentsBox-commentInputWrap-writeButtonDiv">
              <button className="BambooCard-commentDiv-contentsBox-commentInputWrap-writeButtonDiv-button"  onClick={() => writeBambooComment(idx)}>작성</button>
            </div>
          </div>
        </div>
      </div>
      {
        isShowComment ?  
          <BammbooCommentTemplate>
            {
              commentData
            }
          </BammbooCommentTemplate>
          : <></>
      }
      <div className="BambooCard-commentDiv-commentShowButtonDiv">
        {
          commentData.length === 0 ?
            <p className="BambooCard-commentDiv-empty">
              댓글이 없습니다.
            </p> :
            isShowCloseComment ?
              <p className="BambooCard-commentDiv-closeBtn" onClick={handleCloseComment}>
                댓글 닫기
              </p> :
              <p className="BambooCard-commentDiv-commentShowButtonDiv-fontStyle" onClick={() => {
                setIsShowComment(true);
                
                getMoreComment(idx);
              }}>
                댓글 보기
              </p>
        }
        
      </div>
    </div>
  );
};

BambooItem.propTypes = {
  item: PropTypes.object,
  sortCategoryObj: PropTypes.object,
  commentData: PropTypes.array,
  writeBambooComment: PropTypes.func,
  userProfile: PropTypes.string,
  handleImageError: PropTypes.func,
  handleRequestEmpathy: PropTypes.func
};

export default BambooItem;
