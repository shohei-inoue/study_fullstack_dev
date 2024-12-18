'use client'

import axios from "axios"
import { useEffect, useState } from "react"

type dataType = {
  message: string
}

export default function Page() {
  const [data, setData] = useState<dataType>({message: ""})

  useEffect(() => {
    axios.get('/api/hello/backend')
    .then((res) => res.data)
    .then((data) => {
      setData(data)
    })
  }, [])

  return (
    <div>hello {data.message}!</div>
  )
}