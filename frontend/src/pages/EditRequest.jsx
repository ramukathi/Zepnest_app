// frontend/src/pages/EditRequest.jsx

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

const STATUSES = [
  'Pending',
  'In Progress',
  'Completed'
];

const EditRequest = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [status, setStatus] = useState('');

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ✅ Fixed useEffect
  useEffect(() => {

    const fetchRequest = async () => {

      try {

        const { data } =
          await api.get(`/requests/${id}`);

        console.log('Request:', data);

        if (data.success) {

          setRequest(data.data);

          setStatus(
            data.data?.status || 'Pending'
          );
        }

      } catch (err) {

        console.error(err);

        setError('Request not found.');

      } finally {

        setLoading(false);

      }
    };

    if (id) {
      fetchRequest();
    }

  }, [id]);

  // Update status
  const handleUpdate = async () => {

    setUpdating(true);

    setError('');
    setSuccess('');

    try {

      const { data } =
        await api.patch(
          `/requests/${id}/status`,
          { status }
        );

      if (data.success) {

        setSuccess(
          'Status updated successfully!'
        );

        // Redirect after success
        setTimeout(() => {

          navigate('/requests');

        }, 1500);
      }

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        'Update failed.'
      );

    } finally {

      setUpdating(false);

    }
  };

  // Loading
  if (loading) {

    return (

      <div className="page-wrapper">

        <div className="container">

          <div className="spinner"></div>

        </div>

      </div>
    );
  }

  // Request not found
  if (!request) {

    return (

      <div className="page-wrapper">

        <div className="container">

          <div className="alert alert-error">
            Request not found.
          </div>

        </div>

      </div>
    );
  }

  return (

    <div className="page-wrapper">

      <div
        className="container"
        style={{ maxWidth: '550px' }}
      >

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '1.6rem',
            color: '#1A1A2E',
            marginBottom: '24px'
          }}
        >
          Update Request Status
        </h1>

        <div className="card">

          {/* Request Info */}
          <div
            style={{
              marginBottom: '24px',
              padding: '16px',
              background: '#F8F9FA',
              borderRadius: '10px'
            }}
          >

            <h3
              style={{
                fontWeight: '700',
                color: '#1A1A2E',
                marginBottom: '6px'
              }}
            >
              {request.title || 'Untitled'}
            </h3>

            <p
              style={{
                color: '#6B7280',
                fontSize: '0.9rem',
                marginBottom: '4px'
              }}
            >
              {request.description ||
                'No description'}
            </p>

            <p
              style={{
                color: '#6B7280',
                fontSize: '0.85rem'
              }}
            >
              📦 {request.category || 'N/A'}
              {' • '}
              📍 {request.address || 'N/A'}
            </p>

          </div>

          {/* Error */}
          {error && (

            <div className="alert alert-error">
              {error}
            </div>

          )}

          {/* Success */}
          {success && (

            <div className="alert alert-success">
              {success}
            </div>

          )}

          {/* Select */}
          <div className="form-group">

            <label>
              Update Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >

              {STATUSES.map((s) => (

                <option
                  key={s}
                  value={s}
                >
                  {s}
                </option>

              ))}

            </select>

          </div>

          {/* Status Flow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '20px',
              flexWrap: 'wrap'
            }}
          >

            {STATUSES.slice(0, 3).map(
              (s, i) => (

                <span
                  key={s}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >

                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      background:
                        status === s
                          ? '#E8520A'
                          : '#F3F4F6',
                      color:
                        status === s
                          ? 'white'
                          : '#6B7280'
                    }}
                  >
                    {s}
                  </span>

                  {i < 2 && (

                    <span
                      style={{
                        color: '#9CA3AF',
                        fontSize: '12px'
                      }}
                    >
                      →
                    </span>

                  )}

                </span>

              )
            )}

          </div>

          {/* Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '12px'
            }}
          >

            <button
              className="btn btn-outline"
              onClick={() =>
                navigate('/requests')
              }
              style={{
                flex: 1,
                padding: '12px'
              }}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
              onClick={handleUpdate}
              disabled={
                updating ||
                status === request.status
              }
              style={{
                flex: 2,
                padding: '12px'
              }}
            >

              {updating
                ? 'Updating...'
                : 'Update Status'}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default EditRequest;