// import { useRouteError } from "react-router-dom"

import { Link } from "react-router-dom"

const ErrorPage = () => {
    // const err = useRouteError()
  return (
    <div className="flex flex-col justify-center min-h-screen gap-4 text-xl text-center text-stone-900 bg-sky-100">
        <h1>Ooops!</h1>
        <p>Sorry, an unexpected error has occured.</p>
        <p>We are working on it.</p>
        <p>
            <span>{404} page not found</span>
        </p>
        <Link  className=" max-w-sm mx-auto capitalize bg-orange-200 p-2 rounded-md shadow hover:bg-orange-400" to={''}>Back to home page</Link>
    </div>
  )
}

export default ErrorPage