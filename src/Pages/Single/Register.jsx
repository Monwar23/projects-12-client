
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa6'
import UseAuth from '../../hooks/UseAuth'
import toast from 'react-hot-toast'
import { imageUpload } from '../../utilies'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'

const Register = () => {

    const navigate=useNavigate()
    const location=useLocation()

    const {
    setLoading,user,
    createUser,loading,
    signInWithGoogle,
    updateUserProfile,
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
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const image = form.image.files[0]

        if (
            !/(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)
        ) {
            toast.error(
                "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
            );
            return;
        }
    
        try {
          setLoading(true)
          // 1. Upload image and get image url
          const image_url = await imageUpload(image)
          console.log(image_url)
          //2. User Registration
          const result = await createUser(email, password)
          console.log(result)
    
          // 3. Save username and photo in firebase
          await updateUserProfile(name, image_url)
          navigate(location?.state ? location.state : '/')
          toast.success('Signup Successful')
        } catch (err) {
        //   console.log(err)
          toast.error(err.message)
        }
      }
    
      // handle google signin
      const handleGoogleSignIn = async () => {
        try {
          await signInWithGoogle()
    
          navigate(location?.state ? location.state : '/')
          toast.success('Signup Successful')
        } catch (err) {
          console.log(err)
          toast.error(err.message)
        }
      }

       // handle google signin
       const handleGithubSignIn = async () => {
        try {
          await gitHubLogin()
    
          navigate(location?.state ? location.state : '/')
          toast.success('Signup Successful')
        } catch (err) {
          console.log(err)
          toast.error(err.message)
        }
      }

      if(user || loading) return
    
    

  return (
   <div>
     <Helmet>
      <title>LovingPets | SignUp</title>
    </Helmet>
     <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to LovingPets</p>
        </div>
        <form onSubmit={handleSubmit}
          className='space-y-6 '
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-pink-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
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
                autoComplete='new-password'
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
              className='btn btn-outline border-b-4 text-pink-500 hover:bg-pink-500 hover:text-white hover:border-none w-full rounded-md py-3'
            >
              Continue
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div className='flex justify-center my-3 gap-6 border py-2'>
            <button onClick={handleGoogleSignIn}><FcGoogle size={32}></FcGoogle></button>
            <button onClick={handleGithubSignIn}><FaGithub size={32}></FaGithub></button>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-pink-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
   </div>
  )
}

export default Register