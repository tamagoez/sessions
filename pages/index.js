import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  function authpage() {
    console.log("Auth jump button clicked");
    router.push("/login");
  }

  return (
    <div>
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
    <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
      <header className="flex justify-between items-center border-b py-4 md:py-8 mb-8 md:mb-12 xl:mb-16">
        <!-- logo - start -->
        <a href="/" className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5" aria-label="logo">
          Sessions
        </a>
        <!-- logo - end -->

        <!-- nav - start -->
        <nav className="hidden lg:flex gap-12">
          <a href="#" className="text-indigo-500 text-lg font-semibold">Home</a>
          <a href="/login" className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100">Login</a>
          <a href="/signup" className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100">Sign Up</a>
          <a href="/about" className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100">About</a>
        </nav>
        <!-- nav - end -->

        <!-- buttons - start -->
        <!-- <a href="#" class="hidden lg:inline-block bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Contact Sales</a> -->

        <button type="button" className="inline-flex items-center lg:hidden bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 px-2.5 py-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>

          Menu
        </button>
        <!-- buttons - end -->
      </header>

      <section className="flex flex-col items-center">
        <!-- notice - start -->
        <div className="flex items-center bg-gray-50 text-gray-500 border rounded gap-2 p-2">
        <span className="badge badge-md">BETA</span>

          <span className="text-sm">Now developing!</span>
            <a href="#" className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 text-sm font-bold transition duration-100">More</a>
          </div>
          <!-- notice - end -->

          <div className="max-w-xl flex flex-col items-center text-center pt-8 lg:pt-32 pb-0 sm:pb-16 lg:pb-32">
            <p className="text-indigo-500 md:text-lg xl:text-xl font-semibold mb-4 md:mb-6">Very proud to introduce</p>

            <h1 className="text-black-800 text-4xl sm:text-5xl md:text-6xl font-bold mb-8 md:mb-12">Way to chat with your community.</h1>

            <p className="text-gray-500 xl:text-lg leading-relaxed mb-8 md:mb-12">Free, Forever. Only browser require.</p>

            <div className="w-full flex flex-col sm:flex-row sm:justify-center gap-2.5">
              <a href="/login" className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Start now</a>

              <a href="/about" className="inline-block bg-white hover:bg-gray-100 active:bg-gray-200 focus-visible:ring ring-indigo-300 border text-gray-500 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">About</a>
            </div>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
};

export default Home;
