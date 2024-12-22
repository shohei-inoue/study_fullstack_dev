'use client'

import axios from "../../../pulgins/axios";
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Alert, AlertColor, Box, Button, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { GridAddIcon } from "@mui/x-data-grid"

type ProductDataProps = {
  id: number | null
  name: string
  price: number
  description: string
}

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState<Array<ProductDataProps>>([]);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>('success');
  const [message, setMessage] = useState('');
  const result = (severity: AlertColor, message: string) => {
    setOpen(true);
    setSeverity(severity);
    setMessage(message);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get('/api/product')
    .then((res) => res.data)
    .then((data) => {
      setData(data);
    })
  }, [open]);

  const [id, setId] = useState<number | null>(0);
  // submit時のactionを分岐させる
  const [action, setAction] = useState<string>("");

  const onSubmit = (event: any): void => {
    const data: ProductDataProps = {
      id: id,
      name: event.name,
      price: Number(event.price),
      description: event.description,
    };

    // ac知恩いよってhttpメソッドと使用するパラメータを切り替える
    if (action === "add") {
      handleAdd(data);
    } else if (action === "update") {
      if (data.id === null) {
        return;
      }
      handleEdit(data);
    } else if (action === "delete") {
      if (data.id === null) {
        return;
      }
      handleDelete(data.id);
    }
  }

  const handleShowNewRow = () => {
    // event.preventDefault();
    // setShownNewRow(true)
    setId(null);
    reset({
      name: "",
      price: "0",
      description: "",
    })
  }

  const handleAddCancel = () => {
    setId(0);
  }

  const handleAdd = (data: ProductDataProps) => {
    axios.post("api/inventory/products", data).then((response) => {
      result('success', '商品が登録されました');
    })
    setId(0);
  }

  const handleEditRow = (id: number | null) => {
    const selectedProduct = data.find(
      (v) => v.id === id
    ) as ProductDataProps
    setId(selectedProduct.id)
    reset({
      name: selectedProduct.name,
      price: selectedProduct.price,
      description: selectedProduct.description,
    })
  };

  const handleEditCancel = () => {
    setId(0);
  };

  const handleEdit = (data: ProductDataProps) => {
    axios.put(`api/inventory/products/${data.id}`, data).then((respose) => {
      result('success', '商品が更新されました');
    })
    setId(0);
  };

  const handleDelete = (id: number) => {
    axios.delete(`/api/inventory/products/${id}`).then((response) => {
      result('success', '商品が削除されました')
    })
    setId(0);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
      <Typography variant="h5">商品一覧</Typography>
      <Button
        variant="contained"
        startIcon={<GridAddIcon />}
        onClick={() => handleShowNewRow()}
      >
        商品を追加する
      </Button>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ height: 400, width: "100%" }}
      >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>商品ID</TableCell>
              <TableCell>商品名</TableCell>
              <TableCell>単価</TableCell>
              <TableCell>説明</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {id === null ? (
                <TableRow>
                  <TableCell></TableCell>
              <TableCell>
                <input type="text" id="name" {...register("name", {required: true, maxLength: 100})} />
                {errors.name && (
                  <div>100文字以内の商品名を入力してください</div>
                )}
              </TableCell>
              <TableCell>
                <input type="number" id="price" {...register("price", {required: true, maxLength: 100})} />
                {errors.price &&  (
                  <div>1から99999999の数値を入力してください</div>
                )}
              </TableCell>
              <TableCell>
                <input type="text" id="description" {...register("description")} />
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                <button type="button" onClick={() => handleAddCancel()}>キャンセル</button>
                <button type="submit" onClick={() => setAction("add")}>登録する</button>
              </TableCell>
                </TableRow>
              ) : "" }
              {data.map((data) => (
                id === data.id ? (
                  <TableRow key={data.id}>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>
                      <input type="text" id="name" {...register("name", { required: true, maxLength: 100 })} />
                      {errors.name && (
                        <div>100文字以内の商品名を入力してください</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <input type="number" id="price" {...register("price", {min: 1, max: 99999999})} />
                      {errors.price && (
                        <div>1から99999999の数値を入力してください</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <input type="text" id="description" {...register("description")} />
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <button type="button" onClick={() => handleEditCancel()}>キャンセル</button>
                      <button type="submit" onClick={() => setAction("update")}>更新する</button>
                      <button type="submit" onClick={() => setAction("delete")}>削除する</button>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={data.id}>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.price}</TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell><Link href={`/inventory/products/${data.id}`}>在庫処理</Link></TableCell>
                    <TableCell><button onClick={() => handleEditRow(data.id)}>更新・削除</button></TableCell>
                  </TableRow>
                )
              ))}
            </TableBody>
        </Table>
      </TableContainer>
      </Box>
    </>
  )
}