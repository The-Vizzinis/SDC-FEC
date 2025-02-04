/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Search from './Search';
import QListItem from './QListItem';
import AddQuestion from './AddQuestion';
import QuestionsAccordion from './QuestionsAccordion';

const Container = styled.div`
text-align: center;
width: auto;
font-family: 'Roboto', sans-serif;
`;

const Title = styled.h4`
font-weight: lighter;
font-size: 15px;
`;

const QuestionsList = styled.div`
height: 475px;
overflow: scroll;
`;

const MoreQuestions = styled.div`
display: inline-block;
`;

export default function Questions({ productOverviewId }) {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get(`/qa/questions/${productOverviewId}`)
      .then(({ data }) => {
        const { results } = data;
        setQuestions(results);
      }).catch((err) => {
        console.log('there was an error with the request', err);
      });
  }, [productOverviewId]);

  function handleSubmit(e) {
    e.preventDefault();

    setSearch('');
  }

  function submitRefresh() {
    axios.get(`/qa/questions/${productOverviewId}`)
      .then(({ data }) => {
        const { results } = data;
        setQuestions(results);
      }).catch((err) => {
        console.log('there was an error with the request', err);
      });
  }

  function QuestionsRender({ questions }) {
    if (questions.length >= 2) {
      return (
        questions.slice(0, 2).filter((question) => (
          question.question_body.toLowerCase().includes(search.substring(1).toLowerCase())
        )).map((result) => (
          <QListItem key={result.question_id} question={result} />
        ))
      );
    }
    return (
      questions.filter((question) => (
        question.question_body.toLowerCase().includes(search.substring(1).toLowerCase())
      )).map((result) => (
        <QListItem key={result.question_id} question={result} />
      ))
    );
  }

  function DisplayAccordion({ questions }) {
    if (questions.length > 2) {
      return (
        <QuestionsAccordion questions={questions.slice(2)} />
      );
    }
    return null;
  }

  return (

    <Container>
      <div>
        <Title>Questions &amp; Answers</Title>
        <Search
          string={search}
          submitSearch={handleSubmit}
          searchTerm={(e) => setSearch(e.target.value)}
        />
      </div>
      <QuestionsList className="Questions-list">
        <QuestionsRender questions={questions} />
      </QuestionsList>
      <MoreQuestions className="more-questions">
        <DisplayAccordion questions={questions} />
        {' '}
        <AddQuestion product={productOverviewId} refresh={submitRefresh} />
      </MoreQuestions>
    </Container>
  );
}

Questions.propTypes = {
  productOverviewId: PropTypes.number.isRequired,
};
