import React from 'react'

import SignUpQuestions from '../components/SignUp/SignUpQuestions'
import SignUpInfoMessage from '../components/SignUp/SignupInfoMessage'


export default function SignUp() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
           <SignUpQuestions />
           <SignUpInfoMessage />
        </div>
    )
}
