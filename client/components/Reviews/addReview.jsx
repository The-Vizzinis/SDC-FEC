/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaStar } from 'react-icons/fa';

Modal.setAppElement('#app');
function AddReview() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [recommend, setIsRecommended] = useState(undefined);
  const [summary, setChangeSummary] = useState('');
  const [body, setChangeReview] = useState('');
  const [reviewerName, setNickname] = useState('');
  const [photos, setUploadPhoto] = useState(null);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [size, setSize] = useState(null);
  const [fit, setFit] = useState(null);
  const [comfort, setComfort] = useState(null);
  const [width, setWidth] = useState(null);
  const [length, setLength] = useState(null);
  const [qual, setQual] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setModalIsOpen(false);
  };
  const onPhotoUpload = (event) => {
    setUploadPhoto(URL.createObjectURL(event.target.files[0]));
  };

  const handleRating = () => {
    if (rating === 1) {
      return (<span>Poor</span>);
    } if (rating === 2) {
      return (<span>Fair</span>);
    } if (rating === 3) {
      return (<span>Average</span>);
    } if (rating === 4) {
      return (<span>Good</span>);
    } if (rating === 5) {
      return (<span>Great</span>);
    }
  };

  const handleSize = () => {
    if (size === 1) {
      return (<span>A size too small</span>);
    } if (size === 2) {
      return (<span>½ a size too small</span>);
    } if (size === 3) {
      return (<span>Perfect</span>);
    } if (size === 4) {
      return (<span>½ a size too big</span>);
    } if (size === 5) {
      return (<span>A size too wide</span>);
    }
  };

  const handleWidth = () => {
    if (width === 1) {
      return (<span>Too narrow</span>);
    } if (width === 2) {
      return (<span>Slightly narrow</span>);
    } if (width === 3) {
      return (<span>Perfect</span>);
    } if (width === 4) {
      return (<span>Slightly wide</span>);
    } if (width === 5) {
      return (<span>Too wide</span>);
    }
  };

  const handleComfort = () => {
    if (comfort === 1) {
      return (<span>Uncomfortable</span>);
    } if (comfort === 2) {
      return (<span>Slightly uncomfortable</span>);
    } if (comfort === 3) {
      return (<span>Ok</span>);
    } if (comfort === 4) {
      return (<span>Comfortable</span>);
    } if (comfort === 5) {
      return (<span>Perfect</span>);
    }
  };

  const handleQuality = () => {
    if (qual === 1) {
      return (<span>Poor</span>);
    } if (qual === 2) {
      return (<span>Below average</span>);
    } if (qual === 3) {
      return (<span>What I expected</span>);
    } if (qual === 4) {
      return (<span>Pretty great</span>);
    } if (qual === 5) {
      return (<span>Perfect</span>);
    }
  };

  const handleLength = () => {
    if (length === 1) {
      return (<span>Runs short</span>);
    } if (length === 2) {
      return (<span> Runs slightly short</span>);
    } if (length === 3) {
      return (<span>Perfect</span>);
    } if (length === 4) {
      return (<span>Runs slightly long</span>);
    } if (length === 5) {
      return (<span>Runs long</span>);
    }
  };

  const handleFit = () => {
    if (fit === 1) {
      return (<span>Runs tight</span>);
    } if (fit === 2) {
      return (<span> Runs slightly tight</span>);
    } if (fit === 3) {
      return (<span>Perfect</span>);
    } if (fit === 4) {
      return (<span>Runs slightly long</span>);
    } if (fit === 5) {
      return (<span>Runs long</span>);
    }
  };

  return (
    <div>
      <button type="button" onClick={() => setModalIsOpen(true)} style={{ margin: '1.5em', position: 'relative', left: '200px', bottom: '88px', fontSize: '20px' }}>
        Add Review +
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={
         {
           overlay: { backgroundColor: 'grey' },
           content: {
             color: 'teal', fontSize: '18px', textAlign: 'center', width: '900px', height: '500px',
           },
         }
        }
      >
        <form style={{ float: 'center' }}>
          <h2>Please Write Your Review!</h2>
          <div>
            <legend>How Much Would You Rate This Product? </legend>
            <div>
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      required
                      style={{ opacity: 0 }}
                      onClick={() => setRating(ratingValue)}
                    />
                    <FaStar
                      size={40}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                      color={ratingValue <= (hover || rating) ? '#ffc107' : 'lightgrey'}
                    />
                  </label>
                );
              })}
              <span style={{ padding: '2em' }}>{handleRating()}</span>
            </div>
          </div>
          <div style={{ padding: '1.5em' }}>
            <legend>Do You Recommend? </legend>
            <input
              required
              type="radio"
              id="yes"
              name="recommend"
              value="yes"
              onChange={() => setIsRecommended(true)}
            />
            <label htmlFor="yes" title="Recommended">
              Yes
            </label>
            <input
              type="radio"
              id="no"
              name="recommend"
              value="no"
              onChange={() => setIsRecommended(false)}
            />
            <label htmlFor="no" title="notRecommended">
              No
            </label>
          </div>
          <div style={{ margin: '2em' }}>
            <br />
            <legend> Size </legend>
            <br />
            <div>
              A size too small
              {[...Array(5)].map((star, i) => {
                const sizeValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="size"
                      value={sizeValue}
                      required
                      style={{ width: 60 }}
                      onClick={() => setSize(sizeValue)}
                    />
                  </label>
                );
              })}
              A size too big
              <span style={{ padding: '2em', color: 'black', fontSize: '24px' }}>{handleSize()}</span>
            </div>
          </div>
          <div style={{ margin: '2em' }}>
            <br />
            <legend> Width </legend>
            <br />
            <div>
              Too narrow
              {[...Array(5)].map((star, i) => {
                const widthValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="width"
                      value={widthValue}
                      required
                      style={{ width: 60 }}
                      onClick={() => setWidth(widthValue)}
                    />
                  </label>
                );
              })}
              Too wide
              <span style={{ padding: '2em', color: 'black', fontSize: '24px' }}>{handleWidth()}</span>
            </div>
          </div>
          <div style={{ margin: '2em' }}>
            <br />
            <legend> Comfort </legend>
            <br />
            <div>
              Uncomfortable
              {[...Array(5)].map((star, i) => {
                const comfortValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="comfort"
                      value={comfortValue}
                      required
                      style={{ width: 60 }}
                      onClick={() => setComfort(comfortValue)}
                    />
                  </label>
                );
              })}
              Perfect
              <span style={{ margin: '2em', border: '0.25 solid black', color: 'black', fontSize: '24px' }}>{handleComfort()}</span>
            </div>
          </div>
          <div style={{ margin: '2em' }}>
            <br />
            <legend> Length </legend>
            <br />
            <div>
              Runs short
              {[...Array(5)].map((star, i) => {
                const lengthValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="length"
                      value={lengthValue}
                      required
                      style={{ width: 60 }}
                      onClick={() => setLength(lengthValue)}
                    />
                  </label>
                );
              })}
              Runs long
              <span style={{ margin: '2em', border: '0.25 solid black', color: 'black', fontSize: '24px' }}>{handleLength()}</span>
            </div>
          </div>
          <div style={{ margin: '2em' }}>
            <br />
            <legend> Fit </legend>
            <br />
            <div>
              Runs tight
              {[...Array(5)].map((star, i) => {
                const fitValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="fit"
                      value={fitValue}
                      required
                      style={{ width: 60 }}
                      onClick={() => setFit(fitValue)}
                    />
                  </label>
                );
              })}
              Runs big
              <span style={{ margin: '2em', border: '0.25 solid black', color: 'black', fontSize: '24px' }}>{handleFit()}</span>
            </div>
          </div>
          <div style={{ margin: '2em' }}>
            <br />
            <legend> Quality </legend>
            <br />
            <div>
              Poor
              {[...Array(5)].map((star, i) => {
                const qualValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="qual"
                      value={qualValue}
                      required
                      style={{ width: 60 }}
                      onClick={() => setQual(qualValue)}
                    />
                  </label>
                );
              })}
              Perfect
              <span style={{ margin: '2em', color: 'black', fontSize: '24px' }}>{handleQuality()}</span>
            </div>
          </div>
          <div style={{ padding: '1.5em' }}>
            <label htmlFor="Summary" title="ReviewSummary">
              Review Summary
            </label>
            <textarea
              placeholder="Example: Best Purchase ever"
              maxLength="60"
              value={summary}
              onChange={(event) => setChangeSummary(event.target.value)}
            />
          </div>
          <div style={{ padding: '1.5em' }}>
            <label htmlFor="Review" title="ReviewBody">
              Review Body*
            </label>
            <textarea
              placeholder="Why did you like the product or not?"
              minLength={50}
              maxLength={1000}
              required
              rows="4"
              value={body}
              onChange={(event) => setChangeReview(event.target.value)}
            />
          </div>
          <div>
            <input
              type="file"
              name="photo"
              onChange={onPhotoUpload}
            />
            <img
              src={photos}
              height="50"
              width="50"
              alt="User uploaded"
            />
          </div>
          <div style={{ padding: '1.5em' }}>
            <label htmlFor="nickname" title="nickname">
              What Is Your Nickname?: *
            </label>
            <input
              type="textbox"
              placeholder="Example: jackson11!"
              required
              maxLength={60}
              value={reviewerName}
              onChange={(event) => setNickname(event.target.value)}
            />
            <p style={{ fontSize: '15px' }}>
              (For privacy reasons, do not use your full name or email address)
            </p>
          </div>
          <div style={{ padding: '1.5em' }}>
            <label htmlFor="email" title="email" required="required" maxLength="60">
              Email: *
            </label>
            <input
              type="email"
              placeholder="Example: jackson11@email.com"
            />
            <p style={{ fontSize: '15px' }}>
              (For authentication reasons, you will not be emailed)
            </p>
          </div>
          <button
            type="submit"
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            Submit Review
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default AddReview;
