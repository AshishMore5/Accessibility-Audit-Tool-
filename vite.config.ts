import { defineConfig } from 'vitest/config'; import react from '@vitejs/plugin-react';
export default defineConfig({ base:'/Accessibility-Audit-Tool-/', plugins:[react()], test:{ environment:'jsdom', setupFiles:'./src/setupTests.ts', globals:true } });
