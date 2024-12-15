'use client'

import { useState } from "react"

export type dataType = {
  name: string
}

export default function Page() {
  const [data, setData] = useState<dataType>({name: '初期値'})

  const change = {name: '変更'}
  setData(change)

  return (
    <div>hello {data.name}!</div>
  )
}