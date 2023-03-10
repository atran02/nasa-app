import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import Link from 'next/link'


export default function Home() {

  const [data, setData]= useState();

  const apiKey = "nw1fBvh8cxSVf2mDTeSvIzYu28fZtTPOkdDBQKT0"
  const url=`https://api.nasa.gov/techtransfer/patent/?q=10&engine&api_key=${apiKey}`

  const getTechTransferData = async ()=>{
    const res = await axios.get(url);
    const info = await res.data;
    console.log(info);
    setData(info);
  }

  useEffect(()=>{
    getTechTransferData();
  },[])

  return (
    <>
      <Head>
        <title>Nasa API | AT</title>
        <meta name="description" content="Advance dcd styling" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.nav}>
            <Link href={'/polychromatic'} className={styles.polyBtn}>Polychromatic</Link>
        </div>
        <div className={styles.imgGallery}>
          {
            data && data.results.map((tech, index)=>{
              return(
                <div key={index}>
                  {
                    tech && tech.map((t, ind)=> {
                      if(ind === 10){
                        return(
                          <div key={ind}>
                            <div className={styles.imgHover}></div>
                            <Image src={t} alt={t} width={200} height={200} className={styles.imgP1} unoptimized />
                          </div>
                        )
                      }
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </main>
    </>
  )
}
