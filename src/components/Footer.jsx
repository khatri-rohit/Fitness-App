import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <footer className="mt-10 bg-gray-800 ">
                <div className="p-3 text-gray-200 w-full flex  justify-between items-center">
                    <img
                        href="https://flowbite.com"
                        src="https://flowbite.com/docs/images/logo.svg"
                        alt="Flowbite Logo"
                        name="Flowbite"
                    />
                    <div className='p-2'>
                        <Link className='mx-1 md:text-xl text-sm md:p-2' to="#">About</Link>
                        <Link className='mx-1 md:text-xl text-sm md:p-2' to="#">Privacy Policy</Link>
                        <Link className='mx-1 md:text-xl text-sm md:p-2' to="#">Licensing</Link>
                        <Link className='mx-1 md:text-xl text-sm md:p-2' to="#">Contact</Link>
                    </div>
                </div>
            </footer>
        </>
    )
};

export default Footer;
