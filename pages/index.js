import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import axios from 'axios'

export default function Home({versionsList}) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon Team Builder</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.main}>

        <div className={styles.game_options_wrapper}>
          { versionsList.map( v => (
            <div key={v.versionName}>
              <Link as={`build/${v.versionName}`} href="build/[version]" >
                <a>
                  <div style={{backgroundImage: `url("images/versions/` + v.versionName + `.jpg")` }} className={styles.game_options}></div>
                </a>
              </Link>
            </div>
          )) }
        </div>
        
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const res = await axios.get("https://pokeapi.co/api/v2/version-group?limit=11")
  const versionsList = await res.data.results.map(p => ({versionName: p.name}))
  return {
    props: {
      versionsList,
    },
    revalidate: 1,
  }
}
