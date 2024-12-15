'use client'

import { useEffect, useState } from "react"

export type DataType = {
  name: string
}

export default function Page() {
  const [data, setData] = useState<DataType>({name: '変更'})

  useEffect(() => {
    const change = {name: "変更"}
    setData(change)
  }, [])

  return (
    <div>hello {data.name}!</div>
  )
}