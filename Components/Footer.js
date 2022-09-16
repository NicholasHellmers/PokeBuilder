import React from 'react'
import Link from 'next/link'
import styles from '../styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer_wrapper}>
      <Link as={`https://www.linkedin.com/in/nicholas-hellmers/`} href="https://www.linkedin.com/in/nicholas-hellmers/" >Developed by Nicholas Hellmers </Link>
    </footer>
  )
}