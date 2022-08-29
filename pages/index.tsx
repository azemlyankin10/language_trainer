import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Layout } from '../components/Layout/Layout'
import { userState } from '../state/atoms'
import { getUserDate } from '../utils/js/getUser'


export async function getServerSideProps(context: any) {
  return await getUserDate(context.req.cookies.sessionId)
}

const Application = ({ user }: { user: any }) => {
  const router = useRouter()
  const [userDate, setUserDateState] = useRecoilState<any>(userState)

  useEffect(() => {
    if (!user) router.push('/auth')
    else setUserDateState(user)
  }, [router, setUserDateState, user])

  if (!user) {
    return null
  }
  
  return (
    <Layout>
      <Box p='40px 30px' h='100%'>
        <Heading size='3xl' mb='50px'>Choose your train!</Heading>
        <SimpleGrid columns={2} spacing={10}>
          <Box 
            as='button'
            // _hover={{  }}
            p='8' 
            shadow='md' 
            borderWidth='1px'
            onClick={() => {
              router.push(`/game/${'fleshcard'}`)
            }}
          >
            <Heading fontSize='2xl'>Flesh cards</Heading>
            <Text mt='4'>Flashcards are small note cards used for testing and improving memory through practiced information retrieval</Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Layout>
  )
}

export default Application
