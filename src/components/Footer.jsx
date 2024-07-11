import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <footer className="w-screen bg-gray-800">
                <div className="container mx-auto">
                    <div className="w-full text-center">
                        <div className="p-3 text-gray-200 w-full justify-between sm:flex sm:items-center sm:justify-between">
                            <img
                                href="https://flowbite.com"
                                src="https://flowbite.com/docs/images/logo.svg"
                                alt="Flowbite Logo"
                                name="Flowbite"
                            />
                            <div className=''>
                                <Link className='mx-1 text-xl p-2' to="#">About</Link>
                                <Link className='mx-1 text-xl p-2' to="#">Privacy Policy</Link>
                                <Link className='mx-1 text-xl p-2' to="#">Licensing</Link>
                                <Link className='mx-1 text-xl p-2' to="#">Contact</Link>
                            </div>
                        </div>
                        {/* <Footer.Divider /> */}
                        {/* <Footer.Copyright href="#" by="Flowbite™" year={2022} /> */}
                    </div>
                </div>
            </footer>
        </>
    )
};

export default Footer;
