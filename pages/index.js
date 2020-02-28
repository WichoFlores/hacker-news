import 'isomorphic-fetch'
import Error from 'next/error'
import StoryList from '../components/StoryList'
import Layout from '../components/Layout'
import Link from 'next/link'
import { useEffect } from 'react'

const Index = ({ stories, page }) => {
  
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js")
        .then(registration => {
          console.log("service worker registration successful", registration)
        })
        .catch(error => {
          console.log("service worker registration error", error)
        })
    }
  }, [])

  if (!stories.length) {
    return <Error statusCode={503} />
  }

  return(
    <Layout title="Hacker Next" description="A Hacker News clone made with Next.js">
      
      <StoryList stories={stories} />
      <footer>
        <Link href={`/?page=${page + 1}`}>
            <a>
              Next Page ({page + 1})
            </a>
          </Link>
      </footer>
      <style jsx>{`
        footer {
          padding: 1em;
        }

        footer a {
          font-weight: bold;
          color: blue;
          text-decoration: none;
        }
      `}</style>
    </Layout>
  )
}

Index.getInitialProps = async ({ req, res, query }) => {
  let json = []
  let page

  try {
    page = Number(query.page) || 1
    const res = await fetch(`http://node-hnapi.herokuapp.com/news?page=${page}`)
    json = await res.json()
  } catch (e) {
    console.log(e)
  }

  return {
    stories: json,
    page
  }
} 

export default Index