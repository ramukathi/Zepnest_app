import { useState, useEffect } from 'react';

import {
  Link,
  useNavigate
} from 'react-router-dom';

import api from '../api/axios';

import {
  FiEdit,
  FiTrash2,
  FiSearch,
  FiCalendar,
  FiMapPin
} from 'react-icons/fi';

import { toast } from 'react-toastify';

const FILTERS = [
  'All',
  'Pending',
  'In Progress',
  'Completed'
];

const RequestList = () => {

  const navigate = useNavigate();

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [filter, setFilter] =
    useState('All');

  const [search, setSearch] =
    useState('');

  const [error, setError] =
    useState('');

  useEffect(() => {

    const fetchRequests = async () => {

      try {

        const { data } =
          await api.get('/requests');

        if (data.success) {

          setRequests(data.data || []);
        }

      } catch (err) {

        console.error(err);

        setError(
          'Failed to load requests.'
        );

      } finally {

        setLoading(false);
      }
    };

    fetchRequests();

  }, []);

  // DELETE

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        'Delete this request?'
      );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/requests/${id}`
      );

      setRequests((prev) =>
        prev.filter(
          (r) => r.id !== id
        )
      );

      toast.success(
        'Request deleted successfully'
      );

    } catch (err) {

      console.error(err);

      toast.error(
        'Failed to delete request'
      );
    }
  };

  // FILTER + SEARCH

  const filteredRequests =
    requests.filter((req) => {

      const matchesFilter =
        filter === 'All'
          ? true
          : req.status === filter;

      const matchesSearch =

        req.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        req.description
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        req.category
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        req.status
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        matchesFilter &&
        matchesSearch
      );
    });

  // STATUS BADGE

  const getStatusBadge = (status) => {

    const classes = {
      'Pending':
        'badge badge-pending',

      'In Progress':
        'badge badge-inprogress',

      'Completed':
        'badge badge-completed',

      'Cancelled':
        'badge badge-cancelled'
    };

    return (

      <span
        className={
          classes[status]
        }
      >
        {status}
      </span>
    );
  };

  // LOADING

  if (loading) {

    return (

      <div className="page-wrapper">

        <div className="container">

          <div className="spinner"></div>

        </div>

      </div>
    );
  }

  return (

    <div className="page-wrapper">

      <div className="container">

        {/* HEADER */}

        <div
          style={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            flexWrap:'wrap',
            gap:'16px',
            marginBottom:'28px'
          }}
        >

          <div>

            <h1
              style={{
                fontSize:'2rem',
                fontWeight:'800',
                color:'#111827',
                marginBottom:'6px'
              }}
            >
              My Requests
            </h1>

            <p
              style={{
                color:'#6B7280'
              }}
            >
              {requests.length}
              {' '}
              total requests
            </p>

          </div>

          <Link
            to="/create-request"
            className="btn btn-primary"
          >
            + New Request
          </Link>

        </div>

        {/* SEARCH */}

        <div
          style={{
            position:'relative',
            marginBottom:'20px'
          }}
        >

          <FiSearch
            style={{
              position:'absolute',
              top:'50%',
              left:'16px',
              transform:'translateY(-50%)',
              color:'#9CA3AF'
            }}
          />

          <input
            type="text"
            placeholder="Search by title, category, description or status..."
            className="search-input"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={{
              paddingLeft:'46px'
            }}
          />

        </div>

        {/* FILTERS */}

        <div
          className="filter-group"
          style={{
            marginBottom:'28px'
          }}
        >

          {FILTERS.map((item) => (

            <button
              key={item}
              className={
                filter === item
                  ? 'filter-btn active'
                  : 'filter-btn'
              }
              onClick={() =>
                setFilter(item)
              }
            >
              {item}
            </button>

          ))}

        </div>

        {/* ERROR */}

        {error && (

          <div className="alert alert-error">

            {error}

          </div>

        )}

        {/* EMPTY */}

        {filteredRequests.length === 0 ? (

          <div
            className="card"
            style={{
              textAlign:'center',
              padding:'60px 20px'
            }}
          >

            <h2
              style={{
                marginBottom:'10px'
              }}
            >
              No Requests Found
            </h2>

            <p
              style={{
                color:'#6B7280',
                marginBottom:'20px'
              }}
            >
              Try changing filters or create a new request.
            </p>

            <Link
              to="/create-request"
              className="btn btn-primary"
            >
              Create Request
            </Link>

          </div>

        ) : (

          <div className="request-grid">

            {filteredRequests.map((req) => (

              <div
                key={req.id}
                className="card"
                style={{
                  overflow:'hidden'
                }}
              >

                {/* IMAGE */}

                {req.image && (

                  <img
                    src={`http://localhost:5000/uploads/${req.image}`}
                    alt="Request"
                    className="request-image"
                  />

                )}

                <div
                  style={{
                    paddingTop:
                      req.image
                        ? '18px'
                        : '0'
                  }}
                >

                  {/* TOP */}

                  <div
                    style={{
                      display:'flex',
                      justifyContent:'space-between',
                      alignItems:'flex-start',
                      gap:'10px',
                      marginBottom:'14px'
                    }}
                  >

                    <div>

                      <h2
                        style={{
                          fontSize:'1.2rem',
                          marginBottom:'6px',
                          color:'#111827'
                        }}
                      >
                        {req.title}
                      </h2>

                      {getStatusBadge(
                        req.status
                      )}

                    </div>

                  </div>

                  {/* DESCRIPTION */}

                  <p
                    style={{
                      color:'#6B7280',
                      lineHeight:'1.6',
                      marginBottom:'18px'
                    }}
                  >
                    {req.description}
                  </p>

                  {/* DETAILS */}

                  <div
                    style={{
                      display:'flex',
                      flexDirection:'column',
                      gap:'10px',
                      marginBottom:'20px'
                    }}
                  >

                    <div
                      style={{
                        display:'flex',
                        alignItems:'center',
                        gap:'8px',
                        color:'#6B7280',
                        fontSize:'14px'
                      }}
                    >
                      <FiMapPin />

                      {req.address}
                    </div>

                    <div
                      style={{
                        display:'flex',
                        alignItems:'center',
                        gap:'8px',
                        color:'#6B7280',
                        fontSize:'14px'
                      }}
                    >
                      <FiCalendar />

                      {req.preferred_time
                        ? new Date(
                            req.preferred_time
                          ).toLocaleString()
                        : 'No preferred time'}
                    </div>

                  </div>

                  {/* CATEGORY */}

                  <div
                    style={{
                      marginBottom:'20px'
                    }}
                  >

                    <span
                      style={{
                        background:'#FFF1E6',
                        color:'#E85D04',
                        padding:'8px 14px',
                        borderRadius:'30px',
                        fontSize:'13px',
                        fontWeight:'700'
                      }}
                    >
                      {req.category}
                    </span>

                  </div>

                  {/* BUTTONS */}

                  <div
                    style={{
                      display:'flex',
                      gap:'12px'
                    }}
                  >

                    <button
                      onClick={() =>
                        navigate(
                          `/requests/${req.id}/edit`
                        )
                      }
                      className="btn btn-outline"
                      style={{
                        flex:1
                      }}
                    >
                      <FiEdit />

                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          req.id
                        )
                      }
                      className="btn btn-danger"
                      style={{
                        flex:1
                      }}
                    >
                      <FiTrash2 />

                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default RequestList;