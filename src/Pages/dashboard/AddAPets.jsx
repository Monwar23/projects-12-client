
import { useForm, Controller } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { axiosCommon } from '../../hooks/useAxiosCommon';

const AddAPets = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axiosCommon.get('/petCategory');
      return res.data
    }
  })

  const { register, handleSubmit, control, formState: { errors } } = useForm()

  const onSubmit = data => {
    console.log(data);
  };

  const categoryOptions = categories.map(category => ({
    value: category.category,
    label: category.category
  }));

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add a Pet</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Pet Image</label>
          <input 
            type="file" 
            {...register('petImageUrl', { required: true })} 
            className="mt-1 block w-full border border-pink-500 rounded-md shadow-sm p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
          {errors.petImageUrl && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pet Name</label>
          <input 
            type="text" 
            {...register('petName', { required: true })} 
            className="mt-1 block w-full border border-pink-500 rounded-md shadow-sm p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
          {errors.petName && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pet Age</label>
          <input 
            type="text" 
            {...register('petAge', { required: true })} 
            className="mt-1 block w-full border border-pink-500 rounded-md shadow-sm p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
          {errors.petAge && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pet Category</label>
          <Controller
            name="petCategory"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select 
                {...field}
                options={categoryOptions} 
                className="mt-1 focus:border-pink-500 border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
            )}
          />
          {errors.petCategory && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pet Location</label>
          <input 
            type="text" 
            {...register('petLocation', { required: true })} 
            className="mt-1 block w-full border border-pink-500 rounded-md shadow-sm p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
          {errors.petLocation && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pet Short Description</label>
          <textarea 
            {...register('petShortDescription', { required: true })} 
            className="mt-1 block w-full border border-pink-500 rounded-md shadow-sm p-2 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
          {errors.petShortDescription && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pet Long Description</label>
          <Controller
            name="petLongDescription"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ReactQuill 
                {...field} 
                className="mt-1 focus:border-pink-500 border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                theme="snow"
              />
            )}
          />
          {errors.petLongDescription && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
        <div className="text-center">
          <button type="submit" className="w-full btn btn-outline rounded-full border-b-4 text-pink-500 hover:bg-pink-500 hover:text-white hover:border-none">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddAPets;
