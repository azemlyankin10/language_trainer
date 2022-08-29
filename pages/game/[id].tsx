import { useRouter } from "next/router"
import { useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { FleshCard } from "../../components/Games/FleshCard/FleshCard"
import { Layout } from "../../components/Layout/Layout"
import { userState, wordsCollectionState } from "../../state/atoms"
import { useApiHandlers } from "../../utils/hooks/useApiHandlers"
import { getUserDate } from "../../utils/js/getUser"

export async function getServerSideProps(context: any) {
  return await getUserDate(context.req.cookies.sessionId)
}

const GamePage = ({ user }: { user: any }) => {
  const router = useRouter()
  const [userDate, setUserDateState] = useRecoilState<any>(userState)
  const {getWordsCollection} = useApiHandlers()

  useEffect(() => {
    if(user){
      setUserDateState(user)
      getWordsCollection(user.id)
    } else {
      router.push('/auth')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if (!user) {
    return null
  }

  return (
    <Layout>
      <FleshCard />
    </Layout>
  )
}

export default GamePage