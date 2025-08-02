import { useEffect, useState } from "react"
import { useAuth } from "../supabase/AuthContext"
import { supabase } from "../supabase/supabaseClient"

type Mission = {
  id: number
  start_time: string
  end_time: string | null
  title: string
  description: string
  user_uuid: string
}

export function useCurrentMission() {
  const { user } = useAuth()

  const [loading, setLoading] = useState(true)
  const [currentMission, setCurrentMission] = useState<Mission | null>(null)

  useEffect(() => {
    const loadMissions = async () => {
      setLoading(true)

      const { data: openMission, error } = await supabase
        .from("mission")
        .select("*")
        .eq("user_uuid", user?.id)
        .is("end_time", null)
        .limit(1)
        .single()

      if (error) {
        setCurrentMission(null)
      } else {
        setCurrentMission(openMission)
      }

      setLoading(false)
    }

    if (user) {
      loadMissions()
    } else {
      setCurrentMission(null)
      setLoading(false)
    }
  }, [user])

  return { currentMission, loading }
}
