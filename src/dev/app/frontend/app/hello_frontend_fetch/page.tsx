'use client'

import { useEffect, useState } from "react"

type DataType = {
  name: string
}

export default function Page() {
  const [data, setData] = useState<DataType>({ name: "" })

  useEffect(() => {
    fetch('/api/hello')
    .then((res) => res.json())
    .then((data) => {
      setData(data)
    })
  }, [])

  return (
    <div>hello {data.name}</div>
  )
}