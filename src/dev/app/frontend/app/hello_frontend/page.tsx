'use client'

import axios from "axios"
import { useEffect, useState } from "react"

type dataType = {
  name: string
}

export default function Page() {
  const [data, setData] = useState<dataType>({name: ""})

  useEffect(() => {
    axios.get('/api/hello')
    .then((res) => res.data)
    .then((data) => {
      setData(data)
    })
  }, [])

  return (
    <div>hello {data.name}</div>
  )
}