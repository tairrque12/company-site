import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";



    //DEFINE VALIDATION RULES
    const schema = yup.object({
        firstName: yup.string().required("First Name Is Required"),
        lastName: yup.string().required("Last Name Is Required"),
        email: yup.string()
            .email('Please Enter A Valid Email')
            .required('Email Is Required'),
    })

    //DEFINE STRUCTURE OF FORM VALUES
    type FormValues = yup.InferType<typeof schema>;

    export function JobApplicationForm(){

// 3. Connect React Hook Form to our Yup schema
        const {
            register,
            handleSubmit,
            formState: {errors}
        } = useForm<FormValues>({
            resolver: yupResolver(schema)
        });

        // Temporary submission function
        const onSubmit = (data: FormValues) => {
            console.log(data);
        };


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Apply For This Job</h1>

            <div>
                <label htmlFor={'firstName'}>First Name</label>
                <input
                id={'firstName'}
                type={'text'}
                {...register('firstName')}
                />
                {errors.firstName && (
                    <p role={'alert'}>
                        {errors.firstName.message}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor={'lastName'}>Last Name</label>
                <input
                    id={'lastName'}
                    type={'text'}
                    {...register('lastName')}
                />
                {errors.lastName && (
                    <p>
                        {errors.lastName.message}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor={'preferredFirstName'}>Preferred First Name</label>
                <input
                    id={'preferredFirstName'}
                    type={'text'}
                    name={'preferredFirstName'}
                />
            </div>

            <div>
                <label htmlFor={'email'}>Email</label>
                <input
                    id={'email'}
                    type={'text'}
                    {...register('email')}
                />
                {errors.email && (
                    <p role={'alert'}>{errors.email.message}</p>
                )}
            </div>

            <div>
                <label htmlFor={'country'}>Country</label>
                <input
                    id={'country'}
                    type={'text'}
                    name={'country'}
                />
            </div>

            <div>
                <label htmlFor={'phone'}>Phone</label>
                <input
                    id={'phone'}
                    type={'text'}
                    name={'phone'}
                />
            </div>

            <div>
                <label htmlFor={'city'}>City</label>
                <input
                    id={'city'}
                    type={'text'}
                    name={'city'}
                />
            </div>

            <div>
                <label htmlFor={'linkedinUrl'}>Linkedin Url</label>
                <input
                    id={'linkedinUrl'}
                    type={'text'}
                    name={'linkedinUrl'}
                />
            </div>

            <div>
                <label htmlFor={'websiteUrl'}>Website Url</label>
                <input
                    id={'websiteUrl'}
                    type={'text'}
                    name={'websiteUrl'}
                />
            </div>

            <button type={'submit'}>
                Submit Application
            </button>

        </form>
    )
}