import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { templateName: string } }
) {
  try {
    const templateName = params.templateName
    
    // Map template names to config files
    const templateFiles: { [key: string]: string } = {
      'friends_star': 'template_config_friends_star.json'
    }
    
    const configFile = templateFiles[templateName]
    if (!configFile) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      )
    }
    
    // Read the template configuration file
    const configPath = join(process.cwd(), configFile)
    const configContent = readFileSync(configPath, 'utf8')
    const templateConfig = JSON.parse(configContent)
    
    return NextResponse.json(templateConfig)
    
  } catch (error) {
    console.error('Error loading template config:', error)
    return NextResponse.json(
      { error: 'Failed to load template configuration' },
      { status: 500 }
    )
  }
}