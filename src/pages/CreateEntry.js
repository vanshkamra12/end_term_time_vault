import { useState } from 'react';
import axios from 'axios';

function CreateEntry() {
  const [formData, setFormData] = useState({
    name: '',
    event: '',
    era: 'Ancient',
    significance: '',
    rating: 0,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.event) newErrors.event = 'Event is required';
    if (!formData.significance || formData.significance.length < 15)
      newErrors.significance = 'Significance must be at least 15 characters';
    if (formData.rating === 0) newErrors.rating = 'Please select a rating';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios.post('https://jsonplaceholder.typicode.com/posts', formData)
      .then(() => {
        setSubmitted(true);
        setFormData({ name: '', event: '', era: 'Ancient', significance: '', rating: 0 });
        setErrors({});
        setTimeout(() => setSubmitted(false), 3000);
      })
      .catch(error => console.error('Error submitting form:', error));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (rating) => {
    setFormData({ ...formData, rating });
  };

  return (
    <div className="create-entry">
      <h1 className="animated-heading">
        <span>Create</span> <span>Timeline</span> <span>Entry</span>
      </h1>
      {submitted && <p className="success">Entry submitted successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label>Event</label>
          <input
            type="text"
            name="event"
            value={formData.event}
            onChange={handleChange}
          />
          {errors.event && <p className="error">{errors.event}</p>}
        </div>
        <div className="form-group">
          <label>Era</label>
          <select
            name="era"
            value={formData.era}
            onChange={handleChange}
          >
            <option value="Ancient">Ancient</option>
            <option value="Medieval">Medieval</option>
            <option value="Future">Future</option>
          </select>
        </div>
        <div className="form-group">
          <label>Significance</label>
          <textarea
            name="significance"
            value={formData.significance}
            onChange={handleChange}
            rows="4"
          />
          {errors.significance && <p className="error">{errors.significance}</p>}
        </div>
        <div className="form-group">
          <label>Rating</label>
          <div className="rating">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => handleRating(star)}
                className={formData.rating >= star ? 'star active' : 'star'}
              >
                ★
              </button>
            ))}
          </div>
          {errors.rating && <p className="error">{errors.rating}</p>}
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default CreateEntry;