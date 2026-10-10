<<<<<<< HEAD
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

=======
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
>>>>>>> 31bd52d2744288ef5bea2b1c40185b0655ac316c
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
<<<<<<< HEAD
        target: 'http://localhost:8081',
=======
        target: 'https://scamshield-backend-2.onrender.com',
>>>>>>> 31bd52d2744288ef5bea2b1c40185b0655ac316c
        changeOrigin: true,
        secure: false,
      }
    }
  }
<<<<<<< HEAD
});
=======
})
>>>>>>> 31bd52d2744288ef5bea2b1c40185b0655ac316c
