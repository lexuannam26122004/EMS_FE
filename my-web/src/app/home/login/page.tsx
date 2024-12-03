
'use client'
import React, { useState } from 'react';
import { Box } from '@mui/material';

const LoginForm: React.FC = () => {
  const [hover, setHover] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <form
        action="/admin"
        method="post"
        style={{
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <input
          type="text"
          name="stk"
          id="stk"
          placeholder="Tên đăng nhập"
          autoComplete="username"
          required
          style={{
            width: '100%',
            padding: '15px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '18px',
            boxSizing: 'border-box',
          }}
        />
        <input
          type="password"
          name="pass"
          id="pass"
          placeholder="Mật khẩu"
          autoComplete="current-password"
          required
          style={{
            width: '100%',
            padding: '15px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '18px',
            boxSizing: 'border-box',
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: hover ? '#165dbb' : '#1877f2',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '18px',
            boxSizing: 'border-box',
          }}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        >
          Đăng nhập
        </button>
        <a
          href="#"
          style={{
            textDecoration: 'none',
            color: '#1877f2',
            marginTop: '10px',
            display: 'block',
            fontSize: '16px',
          }}
        >
          Quên mật khẩu?
        </a>
      </form>
    </Box>
  );
};

export default LoginForm;
