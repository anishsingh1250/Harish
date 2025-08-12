#!/usr/bin/env node

const { spawn } = require('child_process')
const path = require('path')

console.log('🚀 Starting Transport ERP Development Server...')

// Kill any existing processes first
const { exec } = require('child_process')
exec('pkill -f "next dev" || true', () => {
  // Wait a moment then start the server
  setTimeout(() => {
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

    // Test the server after a delay
    setTimeout(() => {
      const http = require('http')
      const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/login',
        method: 'GET'
      }

      const req = http.request(options, (res) => {
        console.log(`✅ Server is responding: ${res.statusCode}`)
      })

      req.on('error', (err) => {
        console.log('⏳ Server starting up...')
      })

      req.end()
    }, 8000)

  }, 1000)
})