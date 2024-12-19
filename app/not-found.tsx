export default function NotFound() {
	return (
		<main className='flex items-center justify-center min-h-screen bg-slate-900'>
			<div className='text-center'>
				<p className='text-4xl font-semibold text-gray-600'>404</p>
				<h1 className='mt-4 text-xl font-bold tracking-tight text-gray-100 sm:text-5xl'>
					Page not found
				</h1>
				<p className='mt-6 text-base leading-7 text-gray-600'>
					Sorry, we couldn&apos;t find the page you&apos;re looking
					for.
				</p>
				<div className='mt-10 flex items-center justify-center gap-x-6'>
					<a
						href='/authenticated/success'
						className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Go back home
					</a>
					<a href='/' className='text-sm font-semibold text-gray-100'>
						Contact support <span aria-hidden='true'>&rarr;</span>
					</a>
				</div>
			</div>
		</main>
	);
}
