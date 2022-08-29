export const getUser = async (sessionId: string) => {
  const res = await fetch('http://localhost:3000/api/auth', {
    headers: { sessionId }
  })
  return await res.json()
}

export const getUserDate = async(sessionId: string) => {
  const { data } = await getUser(sessionId)
  if(!data) {
    return {
      props: {
        user: null
      }
    }
  }
  return {
    props: { 
      user: {
        id: data._id,
        username: data.username,
        sessionId: sessionId
      }
    }, 
  }
}