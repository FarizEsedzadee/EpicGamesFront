import React from 'react'
import LoginFirstScreen from '../components/SignIn/LoginFirstScreen';
import LoginPasswordForm from '@/components/SignIn/LoginPasswordForm';
import AlternativeCreateLink from '@/components/SignIn/AlternativeCreateLink';
import EmailLoginForm from '@/components/SignIn/EmailLoginForm';


export default function SignIn() {
  return (
    <div className="max-w-[560px] mt-[40px] mx-auto h-screen">
      <LoginPasswordForm />
    </div>
  )
}
