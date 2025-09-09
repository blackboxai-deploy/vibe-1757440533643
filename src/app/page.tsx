'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

const creditPackages = [
  {
    name: 'Starter',
    credits: 10,
    price: 9.99,
    description: 'Perfect for testing and small projects',
    features: ['10 AI video generations', 'Standard quality', 'Email support', '30-day history']
  },
  {
    name: 'Pro',
    credits: 50,
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    description: 'Great for content creators',
    features: ['50 AI video generations', 'HD quality', 'Priority support', '90-day history'],
    popular: true
  },
  {
    name: 'Business',
    credits: 100,
    price: 69.99,
    originalPrice: 99.99,
    discount: 30,
    description: 'Ideal for businesses',
    features: ['100 AI video generations', '4K quality', '24/7 support', 'Unlimited history']
  },
  {
    name: 'Enterprise',
    credits: 500,
    price: 299.99,
    originalPrice: 499.99,
    discount: 40,
    description: 'For large scale operations',
    features: ['500 AI video generations', '4K+ quality', 'Dedicated support', 'Custom integrations']
  }
]

const videoDurations = [
  { label: 'Short (30s)', value: '30', credits: 1 },
  { label: 'Standard (60s)', value: '60', credits: 2 },
  { label: 'Extended (120s)', value: '120', credits: 4 },
]

export default function HomePage() {
  const [prompt, setPrompt] = useState('')
  const [duration, setDuration] = useState('30')
  const [isGenerating, setIsGenerating] = useState(false)

  const selectedDuration = videoDurations.find(d => d.value === duration)
  const creditsRequired = selectedDuration?.credits || 1

  const generateVideo = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a video description')
      return
    }

    if (prompt.length < 10) {
      toast.error('Please provide a more detailed description (at least 10 characters)')
      return
    }

    setIsGenerating(true)
    toast.success(`Video generation started! Using ${creditsRequired} credits.`)

    try {
      // Simulate video generation
      await new Promise(resolve => setTimeout(resolve, 3000))
      toast.success('Video generated successfully!')
      setPrompt('')
    } catch (error) {
      toast.error('Failed to generate video')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">SKV</span>
          </div>
          <span className="text-purple-300 font-semibold">SKV Global AI Video Generator</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
          Create Stunning
          <br />
          AI Videos
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Professional AI-powered video generation platform. Transform your ideas into cinematic videos 
          with our advanced credit-based system.
        </p>
      </div>

      {/* Video Creation Section */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Create Your AI Video</CardTitle>
          <CardDescription className="text-gray-400">
            Generate professional videos using advanced AI models. Credits will be deducted based on video duration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Video Duration Selection */}
          <div className="space-y-2">
            <Label className="text-gray-300">Video Duration</Label>
            <Select value={duration} onValueChange={setDuration} disabled={isGenerating}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {videoDurations.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-white">
                    <div className="flex items-center justify-between w-full">
                      <span>{option.label}</span>
                      <span className="ml-4 text-purple-400">{option.credits} credits</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Prompt Input */}
          <div className="space-y-2">
            <Label htmlFor="prompt" className="text-gray-300">
              Video Description
            </Label>
            <Textarea
              id="prompt"
              placeholder="Describe your video in detail... For example: 'A cinematic shot of a sunrise over mountains, with golden light reflecting off a pristine lake. Camera slowly pans across the landscape as morning mist rolls over the water.'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value.substring(0, 500))}
              className="min-h-[120px] bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 resize-none"
              disabled={isGenerating}
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">
                {prompt.length < 10 ? 'Minimum 10 characters required' : 'Good description length'}
              </span>
              <span className={`${prompt.length > 450 ? 'text-yellow-400' : 'text-gray-400'}`}>
                {prompt.length}/500
              </span>
            </div>
          </div>

          {/* Credit Cost Display */}
          <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-purple-300 font-semibold">Generation Cost</p>
                <p className="text-gray-400 text-sm">
                  {selectedDuration?.label} video will use {creditsRequired} credits
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-400">{creditsRequired}</div>
                <div className="text-xs text-gray-400">Credits</div>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={generateVideo}
            disabled={isGenerating || prompt.length < 10}
            className={`w-full font-semibold py-4 text-lg ${
              prompt.length >= 10
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                : 'bg-gray-700 cursor-not-allowed'
            } text-white`}
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Generating Video... ({creditsRequired} credits)
              </>
            ) : prompt.length < 10 ? (
              'Enter Video Description'
            ) : (
              `Generate Video (${creditsRequired} credits)`
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Pricing Section */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your Credit Package
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Flexible pricing designed for creators, businesses, and enterprises. Start with any package and upgrade anytime.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creditPackages.map((pkg, index) => (
            <Card 
              key={index} 
              className={`relative bg-gray-800 border-gray-700 hover:border-purple-500/50 transition-all duration-200 ${
                pkg.popular ? 'border-purple-500 scale-105' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold py-1 px-3 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-white text-xl">{pkg.name}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-white">${pkg.price}</span>
                    {pkg.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">${pkg.originalPrice}</span>
                    )}
                  </div>
                  {pkg.discount && (
                    <div className="text-green-400 text-sm font-semibold">
                      Save {pkg.discount}%
                    </div>
                  )}
                  <div className="text-purple-400 font-semibold">
                    {pkg.credits} Credits
                  </div>
                </div>
                <CardDescription className="text-gray-400">
                  {pkg.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-300">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    pkg.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  } text-white font-semibold`}
                  onClick={() => toast.success(`Selected ${pkg.name} package!`)}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: 'AI-Powered Generation',
            description: 'Advanced AI models create stunning, professional-quality videos from your text descriptions.',
            gradient: 'from-purple-500 to-pink-500'
          },
          {
            title: 'Credit-Based System',
            description: 'Flexible pricing with credit packages. Pay only for what you use with transparent pricing.',
            gradient: 'from-blue-500 to-purple-500'
          },
          {
            title: 'Professional Quality',
            description: 'Enterprise-grade video generation with 4K support and cinematic quality output.',
            gradient: 'from-green-500 to-blue-500'
          }
        ].map((feature, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700 hover:border-purple-500/50 transition-colors">
            <CardHeader>
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4`}>
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <CardTitle className="text-white">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}