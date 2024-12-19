'use client'

import styles from "./products/styles.module.scss"
import React, { useState } from "react";

import {
  createTheme,
  AppBar,
  Box,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ThemeProvider,
  IconButton,
  Typography,
  Button,
  Drawer,
} from "@mui/material";

import { LogoutOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { GridMenuIcon } from "@mui/x-data-grid";

declare module "@mui/material/styles" {
  // 指定を単純にするためにモバイルとPCの2つに限定する
  interface BreacpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    mobile: true;
    desktop: true;
  }
}

const defaultTheme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      desktop: 600,
    },
  },
});

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  /* サイドバーの開閉を管理する */
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setOpen(open);
  };

  /* 各種画面への遷移を管理する */
  const router = useRouter();

  // ログアウト処理
  const handleLogout = () => {
    router.replace("/login")
  }

  /* 閉会対象となるサイドバー本体 */
  const list = () => (
    <Box sx={{ width: 240}}>
      <Toolbar />
      <Divider />
      <List>
        <ListItem component="a" href="/inventory/products" disablePadding>
          <ListItemButton>
            <ListItemText primary="商品一覧" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem component="a" href="/inventory/import_sales" disablePadding>
          <ListItemButton>
            <ListItemText primary="売上一括登録" />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </Box>
  )

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex"}}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton onClick={() => toggleDrawer(true)}>
              <GridMenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              在庫管理システム
            </Typography>
            <Button
              variant="contained"
              startIcon={<LogoutOutlined />}
              onClick={() => handleLogout()}
            >
              ログアウト
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer open={open} onClose={() => toggleDrawer(false)} anchor="left">
          {list()}
        </Drawer>
        <div className={styles.layout}>
          <header className={styles.header}>ヘッダー</header>
          <div className={styles.container}>
            <aside className={styles.navbar}>サイドバー</aside>
            <main className={styles.content}>
              <section>{children}</section>
            </main>
          </div>
          <footer className={styles.footer}>フッター</footer>
        </div>
      </Box>
    </ThemeProvider>
  )
}