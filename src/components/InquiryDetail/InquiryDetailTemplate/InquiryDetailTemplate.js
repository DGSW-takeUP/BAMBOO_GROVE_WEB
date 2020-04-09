import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import QIconImage from 'assets/image/q-character-alphabet-letter-32868.png';
import AIconImage from 'assets/image/AIcon.png';
import style from './InquiryDetailTemplate.scss';
import Pagination from 'components/Common/Pagination';
import moment from 'moment';
import Button from 'components/Common/Button';
import { typography } from 'styles/typography/typography_scheme.js';

const cx = classNames.bind(style);

const btnStyle = {
  width: '15%',
  height: '50%',
  margin: 'auto 0 auto auto',
  fontSize: typography.size.s2
};

const InquiryDetailTemplate = ({
  question,
  answer,
  userType,
  memberId,
  answerTitleObj,
  answerContentsObj,
  handleAnswer
}) => {
  const { answerTitle, setAnswerTitle } = answerTitleObj;
  const { answerContents, setAnswerContents } = answerContentsObj;

  console.log(question.isComplate);

  return (
    <div className={cx('InquiryDetailTemplate')}>
      <div className={cx('InquiryDetailTemplate-QuestionCatgory')}>
        <div className={cx('InquiryDetailTemplate-QuestionCatgory-Title')}>
          {'카테고리'}
        </div>
        <div className={cx('InquiryDetailTemplate-QuestionCatgory-Contents')}>
          {question.category}
        </div>
      </div>
      <div className={cx('InquiryDetailTemplate-Top')}>
        <img className={cx('InquiryDetailTemplate-Top-Icon')} src={QIconImage}/>
      </div>
      <div className={cx('InquiryDetailTemplate-QuestionCardDiv')}>
        <div className={cx('InquiryDetailTemplate-QuestionCardDiv-TitleBox')}>
          {
            question.isComplate === 0 && userType === 1 && memberId === question.memberId ?
              <input value={question.title} type={'text'} placeholder={'제목'} className={cx('InquiryDetailTemplate-input')} /> :
              <span className={cx('InquiryDetailTemplate-QuestionCardDiv-TitleBox-Title')}>
                {question.title}
              </span>
          }
          {
            question.isComplate === 0 && userType === 1 && memberId === question.memberId ?
              <Button loadingType={'text'} customStyle={btnStyle}>수정하기</Button> :
              (question.isComplate === 1 || question.isComplate === 0) && userType === 0 ?
                <Button loadingType={'text'} customStyle={btnStyle} appearance={'red'}>삭제하기</Button> :
                <></>
          }
        </div>
        <div className={cx('InquiryDetailTemplate-QuestionCardDiv-ContentsBox')}>
          <div className={cx('InquiryDetailTemplate-QuestionCardDiv-ContentsBox-Image')}>
            { 
              // isImages && <Pagination images={images}/>
            }
          </div>
          {
            question.isComplate === 0 && userType === 1 && memberId === question.memberId ?
              <textarea value={question.contents} type={'text'} placeholder={'답변 내용'} className={cx('InquiryDetailTemplate-textarea')} /> :
              <span className={cx('InquiryDetailTemplate-QuestionCardDiv-ContentsBox-Contents')}>
                {question.contents}
              </span>
          }
        </div>
        <div className={cx('InquiryDetailTemplate-QuestionCardDiv-ProfileBox')}>
          <span className={cx('InquiryDetailTemplate-QuestionCardDiv-ProfileBox-MemberId')}>
            {'작성자: ' + question.memberId }
          </span>
          <span className={cx('InquiryDetailTemplate-QuestionCardDiv-ProfileBox-Date')}>
            {'작성날짜: ' + moment.parseZone(question.joinDate).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        </div>
      </div>
      <div>
        <div className={cx('InquiryDetailTemplate-AnswerTop')}>
          <img className={cx('InquiryDetailTemplate-AnswerTop-Icon')} src={AIconImage}/>
        </div>
        <div className={cx('InquiryDetailTemplate-AnswerContentsCardDiv')}>
          {
            userType === 0 ?
              <>
                <div className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-TitleBox')}>
                  <input value={answerTitle} onChange={event => setAnswerTitle(event.target.value)} type={'text'} placeholder={'제목'} className={cx('InquiryDetailTemplate-input')} />
                  {
                    question.isComplate === 0 ?
                      <Button loadingType={'text'} handleFunction={handleAnswer} customStyle={btnStyle}>작성하기</Button> :
                      question.isComplate === 1 ?
                        <Button loadingType={'text'} customStyle={btnStyle}>수정하기</Button> :
                        <></>
                  }
                </div>
                <div className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-ContentsBox')}>
                  <textarea value={answerContents} onChange={event => setAnswerContents(event.target.value)} type={'text'} placeholder={'답변 내용'} className={cx('InquiryDetailTemplate-textarea')} />
                </div>
                <div className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-ProfileBox')}>
                  <span className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-ProfileBox-MemberId')}>
                    작성자 : {memberId}
                  </span>
                  <span className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-ProfileBox-Date')}>
                    작성날짜 : {moment().format('YYYY-MM-DD HH:mm:ss')}
                  </span>
                </div>
              </> :
              <>
                <div className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-TitleBox')}>
                  <span className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-TitleBox-Title')}>
                    {
                      answer !== null ?
                        answer.title :
                        '답변 대기 중'
                    }
                  </span>
                </div>
                <div className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-ContentsBox')}>
                  <span>
                    {
                      answer !== null ?
                        answer.contents :
                        '관리자로부터 작성된 답변이 없습니다. (조금만 기다려주세요!)'
                    }
                  </span>
                </div>
                <div className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-ProfileBox')}>
                  <span className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-ProfileBox-MemberId')}>
                    작성자 : 
                    {
                      answer !== null ?
                        answer.memberId :
                        ' 미정'
                    }
                  </span>
                  <span className={cx('InquiryDetailTemplate-AnswerContentsCardDiv-ProfileBox-Date')}>
                    작성날짜 :
                    {
                      answer !== null ?
                        moment.parseZone(answer.joinDate).format('YYYY-MM-DD HH:mm:ss') :
                        ' 진행 중'
                    }
                  </span>
                </div>
              </>
          }
        </div>
      </div>
    </div>
  );
};

InquiryDetailTemplate.propTypes = {
  question: PropTypes.object,
  answer: PropTypes.object,
  userType: PropTypes.number,
  memberId: PropTypes.string,
  answerTitleObj: PropTypes.object,
  answerContentsObj: PropTypes.object,
  handleAnswer: PropTypes.func
};

InquiryDetailTemplate.defaultProps = {
  question: {
    idx: 0,
    title: '',
    contents: '',
    memberId: '',
    isComplate: 0,
    joinDate: '',
    category: '',
  },
  answer: {
    idx: 0,
    title: '',
    contents: '',
    memberId: '',
    isComplate: 0,
    joinDate: '',
    category: '',
  }
};

export default InquiryDetailTemplate;
