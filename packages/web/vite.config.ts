import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()], // Add React plugin
  resolve: {
    alias: {
      '@shipping/shared': path.resolve(__dirname, '../shared/src'),
    },
  },
});
