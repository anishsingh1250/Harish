#!/usr/bin/env node

const { spawn } = require('child_process')
const path = require('path')

console.log('🚀 Starting Transport ERP Development Server...')

// Set environment variables
process.env.NODE_ENV = 'development'
process.env.NEXT_PUBLIC_APP_ENV = 'development'

// Start Next.js dev server
const nextProcess = spawn('npx', ['next', 'dev', '--port', '5000', '--hostname', '0.0.0.0'], {
  cwd: process.cwd(),
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'development',
    FORCE_COLOR: '1'
  }
})

nextProcess.on('error', (error) => {
  console.error('❌ Failed to start development server:', error)
  process.exit(1)
})

nextProcess.on('exit', (code) => {
  console.log(`Development server exited with code ${code}`)
  process.exit(code)
})

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development server...')
  nextProcess.kill('SIGINT')
})

process.on('SIGTERM', () => {
  console.log('\n🛑 Terminating development server...')
  nextProcess.kill('SIGTERM')
})