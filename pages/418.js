// https://wp-kyoto.net/nextjs-show-error-component-and-statuscode/
import DefaultErrorPage from 'next/error'
export default function Page() {
  return (
    <DefaultErrorPage statusCode={418} title="I'm a teapot" />
  )
}
