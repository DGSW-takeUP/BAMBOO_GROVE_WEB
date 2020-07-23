import React , { useState, useCallback, useEffect }from 'react';
import { inject,observer } from 'mobx-react';
import BambooItemComponent from 'components/Bamboo/BambooItem';
import PropTypes from 'prop-types';
import BambooCommentItem from 'components/Bamboo/BambooItem/BambooComment/BambooCommentItem';
import SecureLS from 'secure-ls';
import DEFAULT_PROFILE from 'assets/image/profile/profile.svg';
import ImageSrc from 'lib/Profile/ImageSrc';
import TokenVerification from 'lib/Token/TokenVerification';

const page = 1;

const BambooItem = ({ item, postLimit, store }) => {
  const [comment, setComment] = useState('');
  const [isShowComment, setIsShowComment] = useState(false);
  const [isShowCloseComment, setIsShowCloseComment] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [isEmpathy, setIsEmpathy] = useState('none');

  /* 댓글 정렬 state */
  const [sortCategory, setSortCategory] = useState('최신 댓글 순');

  const { requestEmpathy, postBambooComment, getBambooComment, deleteBambooComment, getBambooFeed } = store.bamboo;
  const { deleteBambooPost } = store.admin;
  const { modal } = store.dialog;
  const { getMyInfo } = store.member;
  const { isModal } = store.sign; // 로그인 후 사용자 프로필을 가져오기 위함 (* sign의 isModal)

  const ls = new SecureLS({ encodingType: 'aes' });
  const userInfo = ls.get('user-info');
  const src = userInfo.profileImage;
  const token = TokenVerification();
  const [userProfile, setUserProfile] = useState(ImageSrc(src, DEFAULT_PROFILE));

  const handleCloseComment = () => {
    setIsShowCloseComment(false);

    setIsShowComment(false);
  };

  const handleImageError = useCallback(e => {
    setUserProfile(DEFAULT_PROFILE);
  }, []);

  async function fetchData() {
    await getMyInfo();
  }

  const initialCommentData = useCallback(async (idx) => {
    const { data } = await getBambooComment(page, 5, idx);
    const sortedComments = data.comments;

    if (sortCategory === '최신 댓글 순') {
      sortedComments.sort((a, b) => { // 최신 댓글 순으로 정렬
        let aTime = new Date(a.writeDate);
        let bTime = new Date(b.writeDate);
  
        return bTime - aTime;
      });  
    } else {
      sortedComments.sort((a, b) => { // 오래된 댓글 순으로 정렬
        let aTime = new Date(a.writeDate);
        let bTime = new Date(b.writeDate);
  
        return aTime - bTime;
      });
    }
    
    const commentList = sortedComments.map((feed) => <BambooCommentItem key={feed.idx} item={feed} deleteComment={deleteComment}/>);

    setCommentData(commentList);
  }, [sortCategory]);

  const getMoreComment = useCallback(async (idx) => {
    const { data } = await getBambooComment(page, limit, idx);

    const nextData = await getBambooComment(page, limit + 5, idx);

    const sortedComments = data.comments;

    if (sortCategory === '최신 댓글 순') {
      sortedComments.sort((a, b) => { // 최신 댓글 순으로 정렬
        let aTime = new Date(a.writeDate);
        let bTime = new Date(b.writeDate);
  
        return bTime - aTime;
      });  
    } else {
      sortedComments.sort((a, b) => { // 오래된 댓글 순으로 정렬
        let aTime = new Date(a.writeDate);
        let bTime = new Date(b.writeDate);
  
        return aTime - bTime;
      });
    }

    const commentList = sortedComments.map((feed) => <BambooCommentItem key={feed.idx} item={feed} deleteComment={deleteComment}/>);

    if (nextData.data.comments.length === commentList.length) setIsShowCloseComment(true);

    setCommentData(commentList);

    setLimit(limit + 5);
  }, [sortCategory, limit]);

  const deleteComment = async (commentIdx, bambooIdx) => {
    await deleteBambooComment(commentIdx).
      then(async response => {
        await initialCommentData(bambooIdx);
      })
      .catch(error => {
        const { status } = error.response;

        if (status === 500) {
          modal({
            title: 'Error!',
            stateType: 'error',
            contents: '서버 에러! 조금만 기다려 주세요. (__)'
          });

          return;
        }
      });
  };

  const commentSet = (event) => {
    if (event.target.value.length > 500) {
      modal({
        stateType: 'basic',
        title: 'Warning!',
        contents: '내용은 500자 이내로 작성해주세요.'
      });

      return;
    }

    setComment(event.target.value);
  };

  const writeBambooComment = async (idx) => {
    const token = TokenVerification();

    if (token === 'empty') {
      console.log('object');

      await modal({
        stateType: 'warning',
        title: 'Warning!',
        contents: '로그인 후 작성 가능합니다.'
      });

      return;
    }


    if (comment.length === 0) {
      await modal({
        stateType: 'warning',
        title: 'Warning!',
        contents: '내용을 작성해주세요.'
      });

      return;
    }

    const data = {
      bambooIdx: idx,
      contents: comment,
    };

    await postBambooComment(data).
      then(async(response) => {
        await getMoreComment(idx);
        setIsShowCloseComment(false);
        setComment('');
      })
      .catch((error) => {
        const { status } = error.response;

        if (status === 400) {
          modal({
            title: 'Error!',
            stateType: 'error',
            contents: '양식이 맞지 않아요!'
          });

          return;
        }

        if (status === 500) {
          modal({
            title: 'Error!',
            stateType: 'error',
            contents: '서버 에러! 조금만 기다려 주세요. (__)'
          });

          return;
        }
      });
  };

  const handleDeletePost = () => {
    modal({
      title: '게시글을 삭제하시겠습니까?',
      contents: '삭제하시면 되돌릴 수 없습니다..',
      confirmFunc: async () => {
        await deleteBambooPost(item.idx)
          .then(async response => {
            await getBambooFeed(page, 5);

            window.scrollTo(0, 0);

            modal({
              title: 'Success!',
              stateType: 'success',
              contents: '게시글 삭제에 성공하였습니다.'
            });
          })
          .catch(error => {
            const { status } = error.response;

            if (status === 403) {
              modal({
                title: 'Error!',
                stateType: 'error',
                contents: '권한 없음!'
              });

              return;
            }

            if (status === 500) {
              modal({
                title: 'Error!',
                stateType: 'error',
                contents: '서버 에러!'
              });

              return;
            }
          });
      }
    });
  };

  const handleEmpathyDataSet = () => {
    setIsEmpathy('none');

    if (item.empathy === null || userInfo === null || token === 'empty') return;

    for(const index in item.empathy.empathyData) {
      if (item.empathy.empathyData[index].memberId === userInfo.memberId) {
        setIsEmpathy(item.empathy.empathyData[index].empathyType);

        return;
      }
    }
  };

  const handleRequestEmpathy = async type => {
    if (userInfo === null || token === 'empty') {
      modal({
        title: 'Warning',
        stateType: 'warning',
        contents: '로그인 후 공감을 시도해 주세요.'
      });
    }

    const request = {
      bambooIdx: item.idx,
      empathyType: type
    };

    await requestEmpathy(request)
      .then(async response => {
        await getBambooFeed(page, postLimit);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (token === 'empty') {
      localStorage.removeItem('soda-token');
      localStorage.removeItem('soda-reToken');
      sessionStorage.removeItem('soda-token');
      sessionStorage.removeItem('soda-reToken');
      ls.removeAll();
      setUserProfile(DEFAULT_PROFILE);
    } else {
      fetchData();
      setUserProfile(ImageSrc(src, DEFAULT_PROFILE));
    }
  }, [isModal]);

  useEffect(() => {
    if (commentData.length === 0) {
      setIsShowCloseComment(false);
      
      setIsShowComment(false);
    }
  }, [commentData]);

  useEffect(() => {
    handleEmpathyDataSet();
  }, [item.empathy]);

  return (
    <>
      <BambooItemComponent 
        token={token}
        item={item}
        comment={comment} 
        commentSet={commentSet} 
        sortCategoryObj={{sortCategory, setSortCategory}}
        writeBambooComment={writeBambooComment}
        isShowComment={isShowComment}
        isShowCloseComment={isShowCloseComment}
        isEmpathy={isEmpathy}
        setIsShowComment={setIsShowComment}
        initialCommentData={initialCommentData}
        getMoreComment={getMoreComment}
        commentData={commentData}
        deleteComment={deleteComment}
        userProfile={userProfile}
        handleImageError={handleImageError}
        handleCloseComment={handleCloseComment}
        handleDeletePost={handleDeletePost}
        handleRequestEmpathy={handleRequestEmpathy}
      />
    </>
  );
};

BambooItem.propTypes = {
  item: PropTypes.object,
  postLimit: PropTypes.number,
  store: PropTypes.object,
};

export default inject('store')(observer(BambooItem));
