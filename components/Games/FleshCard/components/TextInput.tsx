import { AddIcon } from "@chakra-ui/icons"
import { Flex, IconButton, Input, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { userState } from "../../../../state/atoms"
import { useApiHandlers } from "../../../../utils/hooks/useApiHandlers"

export const TextInput = () => {
  const { id } = useRecoilValue(userState)
  const [word, setWord] = useState('')
  const [translate, setTranslate] = useState('')
  const {addNewWord} = useApiHandlers()

  const onSubmit = async () => {  // TODO: request 
    // const res = await fetch('http://localhost:3000/api/words', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ word, translate, userId: id })
    // })
    addNewWord(word, translate, id)
  }

  return (
    <Flex>
      <VStack spacing={0}>
        <Input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          borderBottomRadius='0'
          color='teal'
          height='auto'
          placeholder='word'
          borderRightRadius='0'
          _placeholder={{ color: 'inherit' }}
        />
        <Input
          value={translate}
          onChange={(e) => setTranslate(e.target.value)}
          borderTopRadius='0'
          color='teal'
          height='auto'
          placeholder='translate'
          borderRightRadius='0'
          _placeholder={{ color: 'inherit' }}
        />
      </VStack>

      <IconButton
        colorScheme='teal'
        borderLeftRadius='0'
        aria-label='Call Segun'
        size='100px'
        px='12px'
        icon={<AddIcon />}
        onClick={onSubmit}
      />
    </Flex>
  )
}