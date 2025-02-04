/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import AnswersListItem from './AnswersListItem';
// import AddAnswer from './AddAnswer';

const Question = styled.h5`
display: inline-block;
color: darkslategray;
`;

const Button = styled.button`
background-color: transparent;
border: none;
font-weight: lighter;
font-size: 10px;
text-decoration: underline;
color: grey;
outline: none
`;

const Span = styled.span`
font-size: 10px;
font-weight: lighter;
color: grey;
`;

export default function QListItem(props) {
  const { question } = props;
  const { question_id, question_body, question_helpfulness } = question;

  const [answers, setAnswers] = useState([]);
  const [helpClick, setHelpClick] = useState(false);
  const [reportClick, setReportClick] = useState(false);
  const [reportStatus, setReportStatus] = useState('Report');

  useEffect(() => {
    axios.get(`/qa/questions/${question_id}/answers`)
      .then(({ data }) => {
        const { results } = data;
        setAnswers(results);
      }).catch((err) => {
        console.log('there was an error getting answers', err);
      });
  }, [question_id]);

  function updateHelpfulness(e) {
    e.preventDefault();

    axios.put(`/qa/questions/${question_id}/helpful`)
      .then(() => {
        console.log('NO CONTENT');
        // refresh();
      }).catch((err) => {
        console.log('error updating helpfulness', err);
      });
  }

  function reportQuestion(e) {
    e.preventDefault();

    axios.put(`qa/questions/${question_id}/report`)
      .then(() => {
        console.log('REPORTED');
        // refresh();
      }).catch((err) => {
        console.log('error reporting question', err);
      });
  }

  function answerRefresh() {
    axios.get(`/qa/questions/${question_id}/answers`)
      .then(({ data }) => {
        const { results } = data;
        setAnswers(results);
      }).catch((err) => {
        console.log('there was an error getting answers', err);
      });
  }

  return (
    <div className="question-layout">
      <div className="question">
        <Question>
          Q:
          {question_body}
        </Question>
        <Span>
          Helpful?
          {' '}
          <Button
            type="button"
            onClick={(e) => { updateHelpfulness(e); setHelpClick(true); }}
            disabled={helpClick === true}
          >
            Yes (
            {question_helpfulness}
            )
          </Button>
          <Button type="button">
            Add Answer
          </Button>
          {' '}
          <Button
            type="button"
            onClick={(e) => { reportQuestion(e); setReportClick(true); setReportStatus('Reported'); }}
            disabled={reportClick === true}
          >
            {reportStatus}
          </Button>
        </Span>
      </div>
      <div className="answer">
        {answers.map((answer) => (
          <AnswersListItem key={answer.answer_id} answer={answer} refresh={answerRefresh} />
        ))}
      </div>
    </div>
  );
}

QListItem.propTypes = {
  question: PropTypes.shape({
    question_id: PropTypes.number.isRequired,
    question_body: PropTypes.string.isRequired,
    question_date: PropTypes.string.isRequired,
    asker_name: PropTypes.string.isRequired,
    question_helpfulness: PropTypes.number.isRequired,
    reported: PropTypes.bool.isRequired,
  }).isRequired,
};
