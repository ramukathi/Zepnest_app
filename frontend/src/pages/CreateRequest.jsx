import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import api from '../api/axios';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import {
  FiUpload,
  FiCalendar,
  FiClock
} from 'react-icons/fi';

import { toast } from 'react-toastify';

const CATEGORIES = [
  'Plumbing',
  'Electrical',
  'Cleaning',
  'Carpentry',
  'Painting',
  'Pest Control',
  'AC/HVAC',
  'Appliance Repair',
  'Other'
];

const CreateRequest = () => {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      title:'',
      description:'',
      category:'',
      address:'',
      preferred_time:new Date()
    });

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState(null);

  const [error, setError] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

    setError('');
  };

  // HANDLE IMAGE

  const handleImageChange = (e) => {

    const file =
      e.target.files[0];

    if (file) {

      setImage(file);

      setPreview(
        URL.createObjectURL(file)
      );
    }
  };

  // SUBMIT

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError('');

    try {

      const form =
        new FormData();

      form.append(
        'title',
        formData.title
      );

      form.append(
        'description',
        formData.description
      );

      form.append(
        'category',
        formData.category
      );

      form.append(
        'address',
        formData.address
      );

      form.append(
        'preferred_time',
        formData.preferred_time
      );

      if (image) {

        form.append(
          'image',
          image
        );
      }

      const { data } =
        await api.post(
          '/requests',
          form,
          {
            headers:{
              'Content-Type':
                'multipart/form-data'
            }
          }
        );

      if (data.success) {

        toast.success(
          'Request created successfully'
        );

        setTimeout(() => {

          navigate('/requests');

        }, 1200);
      }

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message
        ||
        'Failed to create request.'
      );

      toast.error(
        'Failed to create request'
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="page-wrapper">

      <div
        className="container"
        style={{
          maxWidth:'750px'
        }}
      >

        {/* HEADER */}

        <div
          style={{
            marginBottom:'26px'
          }}
        >

          <h1
            style={{
              fontSize:'2rem',
              fontWeight:'800',
              color:'#111827',
              marginBottom:'6px'
            }}
          >
            Create New Request
          </h1>

          <p
            style={{
              color:'#6B7280'
            }}
          >
            Fill all details properly to book your service request.
          </p>

        </div>

        {/* CARD */}

        <div className="card">

          {error && (

            <div className="alert alert-error">

              {error}

            </div>

          )}

          <form
            onSubmit={handleSubmit}
          >

            {/* TITLE */}

            <div className="form-group">

              <label>
                Request Title *
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Fix leaking bathroom pipe"
                required
              />

            </div>

            {/* DESCRIPTION */}

            <div className="form-group">

              <label>
                Description *
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your issue clearly..."
                rows={5}
                required
              />

            </div>

            {/* CATEGORY */}

            <div className="form-group">

              <label>
                Category *
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Category
                </option>

                {CATEGORIES.map((cat) => (

                  <option
                    key={cat}
                    value={cat}
                  >
                    {cat}
                  </option>

                ))}

              </select>

            </div>

            {/* ADDRESS */}

            <div className="form-group">

              <label>
                Service Address *
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter complete address"
                required
              />

            </div>

            {/* DATE TIME */}

            <div className="form-group">

              <label>
                Preferred Date & Time *
              </label>

              <div
                style={{
                  position:'relative'
                }}
              >

                <DatePicker
                  selected={
                    formData.preferred_time
                  }
                  onChange={(date) =>
                    setFormData({
                      ...formData,
                      preferred_time:date
                    })
                  }
                  showTimeSelect
                  minDate={new Date()}
                  timeIntervals={30}
                  dateFormat="dd/MM/yyyy h:mm aa"
                  placeholderText="Select date and time"
                  className="search-input"
                />

                <FiCalendar
                  style={{
                    position:'absolute',
                    top:'18px',
                    right:'48px',
                    color:'#9CA3AF'
                  }}
                />

                <FiClock
                  style={{
                    position:'absolute',
                    top:'18px',
                    right:'18px',
                    color:'#9CA3AF'
                  }}
                />

              </div>

            </div>

            {/* IMAGE */}

            <div className="form-group">

              <label>
                Upload Image
              </label>

              <label
                style={{
                  border:'2px dashed #E5E7EB',
                  borderRadius:'16px',
                  padding:'28px',
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'center',
                  justifyContent:'center',
                  cursor:'pointer',
                  background:'#FFF7F2'
                }}
              >

                <FiUpload
                  size={34}
                  color="#E85D04"
                />

                <p
                  style={{
                    marginTop:'10px',
                    fontWeight:'600'
                  }}
                >
                  Click to upload image
                </p>

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={
                    handleImageChange
                  }
                />

              </label>

            </div>

            {/* PREVIEW */}

            {preview && (

              <div
                style={{
                  marginBottom:'24px'
                }}
              >

                <img
                  src={preview}
                  alt="Preview"
                  className="request-image"
                />

              </div>

            )}

            {/* BUTTONS */}

            <div
              style={{
                display:'flex',
                gap:'14px',
                marginTop:'10px'
              }}
            >

              <button
                type="button"
                className="btn btn-outline"
                onClick={() =>
                  navigate('/requests')
                }
                style={{
                  flex:1
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{
                  flex:2
                }}
              >

                {loading
                  ? 'Submitting...'
                  : 'Submit Request'}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default CreateRequest;