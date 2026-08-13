// src/pages/LoginPage.jsx
import  { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('developer@enterprise.com');
  const [password, setPassword] = useState('password123');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Read location state passed from ProtectedRoute
  const from = location.state?.from?.pathname || '/checkout';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email);
      // Immediately navigate back to the guarded page (or /checkout)
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="py-5" style={{ maxWidth: '420px', margin: '0 auto' }}>
      <div className="card shadow border-0">
        <div className="card-body p-4">
          <h4 className="fw-bold mb-1 text-center">Sign In</h4>
          <p className="text-muted small text-center mb-4">
            Sign in to complete your checkout purchase
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-semibold">Email Address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-warning w-100 fw-bold py-2 shadow-sm">
              Sign In & Proceed →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}