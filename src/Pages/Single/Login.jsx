import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa6'
import UseAuth from '../../hooks/UseAuth'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'

const Login = () => {

    const navigate = useNavigate()
  const location = useLocation()

  const {
    setLoading,user,signIn,
    loading,
    signInWithGoogle,
    gitHubLogin,
    }=UseAuth()

    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[navigate,user])

    const handleSubmit = async e => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
    
        try {
          setLoading(true)
          // 1. sign in user
          await signIn(email, password)
          navigate(location?.state ? location.state : '/')
          toast.success('SignIn Successful')
        } catch (err) {
          // console.log(err)
          toast.error(err.message)
          setLoading(false)
        }
      }

       // handle google signin
       const handleGoogleSignIn = async () => {
        try {
          await signInWithGoogle()
    
          navigate(location?.state ? location.state : '/')
          toast.success('SignIn Successful')
        } catch (err) {
          // console.log(err)
          toast.error(err.message)
        }
      }

       // handle google signin
       const handleGithubSignIn = async () => {
        try {
          await gitHubLogin()
    
          navigate(location?.state ? location.state : '/')
          toast.success('SignIn Successful')
        } catch (err) {
          // console.log(err)
          toast.error(err.message)
        }
      }

      if(user || loading) return


  return (
   <div>
    <Helmet>
      <title>LovingPets | Login</title>
    </Helmet>
     <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className='space-y-6 '
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-pink-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='current-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-pink-500 bg-gray-200 text-gray-900'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='btn btn-outline border-b-4 text-pink-500 hover:bg-pink-500 hover:text-white hover:border-none w-full rounded-md py-3 '
            >
              Continue
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div className='flex justify-center my-3 gap-6 border py-2'>
            <button onClick={handleGoogleSignIn}><FcGoogle size={32}></FcGoogle></button>
            <button onClick={handleGithubSignIn}><FaGithub size={32}></FaGithub></button>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/signup'
            className='hover:underline hover:text-pink-500 text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
   </div>
  )
}

export default Login