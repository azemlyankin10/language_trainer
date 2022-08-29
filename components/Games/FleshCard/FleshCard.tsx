import { Box, Container, Grid, GridItem, SimpleGrid, Stack } from "@chakra-ui/react"
import { useRecoilValue } from "recoil"
import { wordsCollectionState } from "../../../state/atoms"
import { CardsList } from "./components/CardList/CardsList"
import { TextInput } from "./components/TextInput"
import { WordsList } from "./components/WordsList"
export const FleshCard = () => {
  const words = useRecoilValue(wordsCollectionState)

  return (
    <Grid templateColumns='repeat(5, 1fr)' gap={6} py='12' px='30px'>
      <GridItem 
        h='100%'
        colSpan={1}
        overflowY='scroll'
      >
        <WordsList words={words}/>
        <TextInput />
      </GridItem>

      <GridItem colSpan={4}>
        <CardsList words={words}/>
      </GridItem>
    </Grid>
  )
}