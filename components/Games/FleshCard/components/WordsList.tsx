import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box } from "@chakra-ui/react"

  // const words = [
  //   {title: 'Section 1 title', text: 'Lorem ipsum'},
  //   {title: 'Section 1 title', text: 'Lorem ipsum dolor sit'},
  // ]

type words = {
  words: { word: string, translate: string }[]
}
  
export const WordsList = ({ words }: words) => {

  return(
    <Accordion 
      defaultIndex={[0]} 
      allowMultiple 
      mb='2'
    >
      {words.map((el, index) => (
        <AccordionItem key={index}>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left'>{el.word}</Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>{el.translate}</AccordionPanel>
        </AccordionItem>
      ))}

    </Accordion>
  )
}