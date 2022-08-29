import { Box, Center, Container, Flex, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useApiHandlers } from "../../utils/hooks/useApiHandlers"
import { getUser } from "../../utils/js/getUser"
import { FormikExample } from "../../components/Form/form"

export async function getServerSideProps(context: any) {
  const { data } = await getUser(context.req.cookies.sessionId)
  return {
    props: { user: data}, 
  }
}

const Auth = ({ user }: { user: any }) => {
  const router = useRouter()
  const {auth} = useApiHandlers()

  useEffect(() => {
    if(user) router.push('/')
  }, [router, user])

  const tabs = [
    {title: 'Log in', form: <FormikExample type='login' onSubmit={(data) => auth(data, 'login')} />},
    {title: 'Sign on', form: <FormikExample type='signon' onSubmit={(data) => auth(data, 'signon')} />}
  ]

  return (
    <Container maxW='1500px' padding='0'>
      <Flex>
        <Box h='100vh' w={{ md: '50%', xs: '10%' }} className="loginBg"></Box>
        <Center h='100vh' w={{ lg: '50%', xs: '100%' }} padding='0 100px'>
          <Tabs variant='soft-rounded' colorScheme='green' w='100%'>
            <TabList>
              {tabs.map((el, index) => (
                <Tab key={index}>{el.title}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {tabs.map((el, index) => (
                <TabPanel key={index}>{el.form}</TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Center>
      </Flex>

    </Container>

  )
}

export default Auth