// import { useRouteError } from "react-router-dom"

const ErrorPage = () => {
    // const err = useRouteError()
  return (
    <div className="flex flex-col justify-center min-h-screen gap-4 text-xl text-center text-stone-900 bg-gray-400">
        <h1>Ooops!</h1>
        <p>Sorry, an unexpected error has occured.</p>
        <p>We are working on it.</p>
        <p>
            <span>{404} page not found</span>
        </p>
    </div>
  )
}

export default ErrorPage