import { Container, Spacer } from "@chakra-ui/react";
import React from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const Layout = ({ children }: {children: React.ReactNode}) => (
  <Container 
    maxW='1500px' 
    overflow='hidden'
    p='0'
    display='flex'
    flexDirection='column'
    minH='100vh'
    bg='gray.50'
  >
    <Header/>
    {children}
    <Spacer />
    <Footer />
  </Container>
)