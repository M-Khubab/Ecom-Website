"use client"
import Header from "@/component/Header";
import "./globals.css";
import Footer from "@/component/Footer";
import store from "../redux/store"
import { Provider } from "react-redux";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
    <html lang="en">
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
    </Provider>
  );
}
