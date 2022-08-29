import { Avatar, Box, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Spacer } from "@chakra-ui/react"
import { useRecoilValue } from "recoil"
import { userState } from "../../state/atoms"
import { useApiHandlers } from "../../utils/hooks/useApiHandlers"

export const Header = () => {
  const {auth} = useApiHandlers()
  const { id } = useRecoilValue(userState)

  const logOutHandler = () => {
    auth(id, 'logout')
  }

  return(
    <Box
      boxShadow='2xl' 
      px='6' 
      py='3'
      roundedBottom='md'
    >
      <Flex minWidth='max-content' alignItems='center' gap='2'>
        <Box p='2'>
          <Heading size='md'>Trainer</Heading>
        </Box>
        <Spacer />
        <Box p='2'>
          <Menu>
            <MenuButton >
              <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
            </MenuButton>
            <MenuList>
              <MenuItem 
                _focus={{ bg: 'green.200' }} 
                _hover={{ bg: 'green.100' }}
                onClick={logOutHandler}
              >
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  )
}