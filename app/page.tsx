"use client"

import React, { useState, useEffect } from 'react'
import { ExternalLink, Mail, Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const ScribbleShape = ({ color }: { color: string }) => {
  const [randomValues, setRandomValues] = useState<any>(null)

  useEffect(() => {
    const shapes = [
      "M 0 10 A 10 10 0 1 0 20 10 A 10 10 0 1 0 0 10",
      "M 0 10 Q 5 0, 10 10 T 20 10",
      "M 0 10 L 5 0 L 10 20 L 15 0 L 20 10",
      "M 10 0 L 13 7 L 20 7 L 15 12 L 18 20 L 10 15 L 2 20 L 5 12 L 0 7 L 7 7 Z",
      "M 10 0 L 20 20 L 0 20 Z",
      "M 15 0 L 30 8 L 30 22 L 15 30 L 0 22 L 0 8 Z"
    ]

    setRandomValues({
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      size: Math.random() * 40 + 10,
      rotation: Math.random() * 360,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2
    })
  }, [])

  if (!randomValues) return null

  return (
    <svg
      className="absolute"
      style={{
        top: `${randomValues.y}%`,
        left: `${randomValues.x}%`,
        width: `${randomValues.size}px`,
        height: `${randomValues.size}px`,
        transform: `rotate(${randomValues.rotation}deg)`,
        animation: `scribbleAppear ${randomValues.duration}s ${randomValues.delay}s infinite`,
      }}
    >
      <path d={randomValues.shape} stroke={color} fill="none" strokeWidth="2">
        <animate
          attributeName="strokeDasharray"
          from="0 100"
          to="100 0"
          dur="4s"
          begin={`${randomValues.delay}s`}
          repeatCount="indefinite"
        />
      </path>
    </svg>
  )
}

const ScribbleEffect = () => {
  const [scribbles, setScribbles] = useState<Array<{ color: string }>>([])

  useEffect(() => {
    const gradientColors = ['#84cc16', '#22d3ee', '#facc15', '#ec4899', '#f97316']
    const newScribbles = Array.from({ length: 50 }, () => ({
      color: gradientColors[Math.floor(Math.random() * gradientColors.length)],
    }))
    setScribbles(newScribbles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {scribbles.map((scribble, index) => (
        <ScribbleShape key={index} color={scribble.color} />
      ))}
    </div>
  )
}

export default function Component() {
  const [isCopied, setIsCopied] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdOxEP0invMqDhB7dsDQu23TRL07mh2_-t1_ijkIXN9nIbV7Q/viewform"
  const contactEmail = "hello@gylesgyesie.com"

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail).then(() => {
      setIsCopied(true)
      toast.success('Email copied to clipboard!', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setTimeout(() => setIsCopied(false), 3000)
    }).catch(err => {
      console.error('Failed to copy text: ', err)
      toast.error('Failed to copy email. Please try again.', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    })
  }

  return (
    <div className="flex flex-col min-h-screen xl:h-screen bg-white text-foreground">
      <main className="flex-grow flex flex-col xl:flex-row relative xl:overflow-hidden">
        <div className="w-full xl:w-1/2 flex items-center justify-center p-4 xl:p-8 bg-white relative">
          <ScribbleEffect />
          <div className="w-full max-w-2xl relative z-20">
            <div className="absolute inset-0 bg-gradient-to-r from-lime-400 via-cyan-400 via-yellow-400 via-pink-500 to-orange-500 rounded-lg blur-[8px] opacity-75 animate-gradient-border"></div>
            <Card className="w-full bg-white shadow-lg flex flex-col relative z-20">
              <CardHeader className="pb-3 flex items-center justify-center">
                <CardTitle className="text-4xl md:text-5xl font-bold text-center text-black">ArtistConsent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-3 flex-grow overflow-y-auto flex flex-col justify-center">
                <div className="space-y-4">
                  <p className="text-gray-800">
                    In a world where digital technologies automate more of the creative process, it's essential for artists to have agency over their works and likeness. In other words, to stand out, their creative vision needs to be potent and authentic to who they are.
                  </p>
                  <p className="text-gray-800">
                    At ArtistConsent, we're building tools to help artists cut through the noise and share stories that resonate on a human level.
                  </p>
                </div>
                
                <hr className="border-gray-200" />
                
                <div className="text-center space-y-2">
                  <p className="text-xl font-semibold text-black">
                    It's Your Vision, Pure and Authentic!
                  </p>
                  <p className="text-gray-700">
                    Sign up to be the first to access our tools.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 mt-auto">
                <div className="w-full rounded-md p-[2px] bg-gradient-to-r from-lime-400 via-cyan-400 via-yellow-400 via-pink-500 to-orange-500 animate-gradient-border">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-gray-900 transition-colors duration-300" size="lg" onClick={() => window.open(googleFormUrl, '_blank', 'noopener,noreferrer')}>
                    Sign Up <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" className="w-full border-2 border-gray-300 hover:border-gray-400 transition-colors duration-200" size="lg" onClick={handleCopyEmail}>
                  {isCopied ? (
                    <>
                      Copied! <Check className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Contact Email <Mail className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="hidden xl:block w-1/2 relative">
          <div className="h-full">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-imageupscaler-UploadedFiles-67046d743e8fc0-27648919Processed-auto-2024-10-08-00_30_00-3HsTESgpgJvCHMCnKVGJfo4fHAP7lq.png"
              alt="Music genres and instruments illustration"
              className="w-full h-full object-cover"
            />
            <ScribbleEffect />
          </div>
        </div>
      </main>
      <div className="flex justify-center my-4 sm:hidden">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div 
                className="rounded-full p-[2px] cursor-pointer" 
                style={{
                  background: 'linear-gradient(90deg, #84cc16, #22d3ee, #facc15, #ec4899, #f97316)',
                  backgroundSize: '300% 300%',
                  animation: 'gradient-border 4s ease infinite'
                }}
                onClick={() => setShowPopup(true)}
              >
                <div className="text-sm font-semibold px-3 py-1 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-gray-900 transition-colors duration-300">
                  Committed to the 4Cs
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Learn more</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="hidden sm:block fixed bottom-12 right-4 z-30">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div 
                className="rounded-full p-[2px] cursor-pointer" 
                style={{
                  background: 'linear-gradient(90deg, #84cc16, #22d3ee, #facc15, #ec4899, #f97316)',
                  backgroundSize: '300% 300%',
                  animation: 'gradient-border 4s ease infinite'
                }}
                onClick={() => setShowPopup(true)}
              >
                <div className="text-sm font-semibold px-3 py-1 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-gray-900 transition-colors duration-300">
                  Committed to the 4Cs
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Learn more</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <footer className="bg-gray-50 text-gray-600 py-2 px-6 w-full">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} ArtistConsent LTD.</p>
          <p className="mt-1 sm:mt-0">
            We respect your privacy.{' '}
            <a
              href="#"
              className="text-xs font-normal underline hover:text-gray-800 transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setShowPrivacyPolicy(true);
              }}
            >
              Read our policy
            </a>
          </p>
        </div>
      </footer>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">ArtistConsent's Commitment to the 4Cs</h2>
            <p className="mb-4">
              At ArtistConsent, we are dedicated to protecting artists' rights and ensuring fair practices in the AI industry. Our commitment is built on four fundamental principles, known as the 4Cs:
            </p>
            <h3 className="text-xl font-semibold mb-2">1. Consent</h3>
            <p className="mb-4">
              We firmly believe that consent is paramount. Before including any artist's content in AI models or tools:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Explicit permission must be obtained from us and our artists.</li>
              <li>We advocate for an opt-in approach, rejecting the notion that artists must actively opt-out to protect their work.</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">2. Credit</h3>
            <p className="mb-4">
              Proper attribution is essential to recognizing artists' contributions:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Artists and rightsholders must receive due credit for their work.</li>
              <li>Any AI-generated output featuring an artist's work or style must be appropriately labeled and attributed.</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">3. Compensation</h3>
            <p className="mb-4">
              We stand for fair remuneration:
             
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>ArtistConsent and our represented artists must receive equitable compensation for the value we bring to AI services and features.</li>
              <li>Compensation should reflect the significance of the artist's contribution to the AI model or output.</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">4. Control</h3>
            <p className="mb-4">
              When rightsholders authorize the use of their content, they retain the right to set usage parameters:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Artists can specify how their work may be used within AI systems.</li>
              <li>If an AI-generated output misrepresents or potentially harms an artist's reputation, the artist reserves the right to request its removal.</li>
              <li>We support mechanisms that allow artists to maintain oversight of how their work is utilized in AI applications.</li>
            </ul>
            <p>
              By adhering to these 4Cs - Consent, Credit, Compensation, and Control - ArtistConsent aims to foster a respectful and mutually beneficial relationship between artists and the AI industry.
            </p>
          </div>
        </div>
      )}
      {showPrivacyPolicy && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[90vh] flex flex-col">
      <div className="p-6 flex-shrink-0">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Privacy Policy</h2>
          <button
            onClick={() => setShowPrivacyPolicy(false)}
            className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>
        <h3 className="text-xl font-semibold mt-4">ARTISTCONSENT LTD Privacy Policy</h3>
      </div>
      <ScrollArea className="flex-grow px-6 pb-6">
        <div className="space-y-4 text-sm">
                <p>
                  ARTISTCONSENT LTD ("we," "our," or "us") operates the website https://artistconsent.com/ (the "Site"). This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our Site, sign up for beta access, or receive updates from us.
                </p>
                <h3 className="text-lg font-semibold">1. Information We Collect</h3>
                <p>
                  When you sign up for beta access or interact with our Site, we may collect the following personal information:
                </p>
                <ul className="list-disc pl-6">
                  <li>Name</li>
                  <li>Email Address</li>
                </ul>
                <p>
                  We also collect non-personal data through basic analytics, such as:
                </p>
                <ul className="list-disc pl-6">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device type</li>
                  <li>Usage data (e.g., pages visited)</li>
                </ul>
                <h3 className="text-lg font-semibold">2. How We Use Your Information</h3>
                <p>
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc pl-6">
                  <li>To manage your sign-up for beta access to our application.</li>
                  <li>To communicate with you, including sending updates and notifications about the beta release and related features.</li>
                  <li>To improve our website and understand user interactions through basic analytics.</li>
                </ul>
                <h3 className="text-lg font-semibold">3. Cookies and Analytics</h3>
                <p>
                  We use cookies and similar technologies to enhance your experience and analyze how our website is used. These tools help us monitor website traffic and improve performance. You can adjust your browser settings to refuse cookies, but this may limit your experience on our Site.
                </p>
                <h3 className="text-lg font-semibold">4. Sharing Your Information</h3>
                <p>
                  We do not sell or share your personal information with third parties, except as necessary for:
                </p>
                <ul className="list-disc pl-6">
                  <li>Complying with legal obligations.</li>
                  <li>Protecting the rights and security of our company and users.</li>
                </ul>
                <p>
                  We may use third-party services for analytics, but they do not have access to your personal information.
                </p>
                <h3 className="text-lg font-semibold">5. Data Security</h3>
                <p>
                  We take the security of your personal information seriously. We implement reasonable security measures to protect your data. However, no online transmission is completely secure, and we cannot guarantee absolute security.
                </p>
                <h3 className="text-lg font-semibold">6. Your Rights</h3>
                <p>
                  You have the right to:
                </p>
                <ul className="list-disc pl-6">
                  <li>Access and update your personal information.</li>
                  <li>Opt-out of receiving email updates at any time by following the unsubscribe link in our emails.</li>
                </ul>
                <h3 className="text-lg font-semibold">7. Data Retention</h3>
                <p>
                  We retain your personal information for as long as necessary to provide you with beta access, updates, and services or as required by applicable law.
                </p>
                <h3 className="text-lg font-semibold">8. Changes to This Policy</h3>
                <p>
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we will notify you of significant changes via email.
                </p>
                <h3 className="text-lg font-semibold">9. Contact Us</h3>
                <p>
                  If you have any questions or concerns about this Privacy Policy or your personal information, please contact us at:
                </p>
                <p>
                  ARTISTCONSENT LTD<br />
                  20 Wenlock Road, London, England, N1 7GU<br />
                  Email: artistconsent2024@gmail.com
                </p>
              </div>
      </ScrollArea>
    </div>
  </div>
)}
      <ToastContainer />
      <style jsx>{`
        @keyframes gradient-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-border {
          animation: gradient-border 4s ease infinite;
          background-size: 300% 300%;
        }
        @keyframes scribbleAppear {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
