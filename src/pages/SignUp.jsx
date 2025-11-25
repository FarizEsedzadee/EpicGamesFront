import React from 'react'

import SignUpQuestions from '../components/SignUp/SignUpQuestions'
import SignUpInfoMessage from '../components/SignUp/SignupInfoMessage'
import SignupBirthdateForm from '../components/SignUp/SignupBirthdateForm'
import SignUpEmailForm from '@/components/SignUp/SignUpEmailForm'
import SignUpForm from '@/components/SignUp/SignUpForm'


export default function SignUp() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <SignUpForm />
        </div>
    )
}
