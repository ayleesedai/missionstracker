import { useEffect, useState } from "react"
import { useCurrentMission } from "./useCurrentMission"
import { supabase } from "../supabase/supabaseClient"
import { useAuth } from "../supabase/AuthContext"
import { Button, TextField } from "@radix-ui/themes"

export default function CurrentMission() {
  const { user } = useAuth()
  const { currentMission, loading, error: loadError } = useCurrentMission()

  const [form, setForm] = useState({
    start: "",
    end: "",
    title: "",
    description: "",
  })

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Prefill the form when editing an existing mission
  useEffect(() => {
    if (currentMission) {
      setForm({
        start: currentMission.start_time,
        end: currentMission.end_time || "",
        title: currentMission.title,
        description: currentMission.description,
      })
    }
  }, [currentMission]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!form.title || !form.description || !form.start) {
      setError("Please fill all required fields.")
      return
    }

    if (currentMission) {
      const { error } = await supabase
        .from("mission")
        .update({
          title: form.title,
          description: form.description,
          start_time: form.start,
          end_time: form.end || null,
        })
        .eq("id", currentMission.id)

      if (error) {
        setError(error.message)
      } else {
        setSuccess("Mission updated.")
      }
    } else {
      const { error } = await supabase.from("mission").insert({
        title: form.title,
        description: form.description,
        start_time: form.start,
        end_time: form.end || null,
        user_uuid: user?.id,
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess("New mission created.")
      }
    }
  }

  if (loading) return <p>Loading...</p>
  if (!user) return <p>Please log in.</p>

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingTop: "1rem" }}>
      <TextField.Root
        size="3"
        type="datetime-local"
        name="start"
        value={form.start}
        onChange={handleChange}
      />

      <TextField.Root
        size="3"
        type="datetime-local"
        name="end"
        value={form.end}
        onChange={handleChange}
      />

      <TextField.Root
        size="3"
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <TextField.Root
        size="3"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <Button type="submit" size="3" color={currentMission ? "indigo" : "red"}>
        {currentMission ? "Update Mission" : "Create Mission"}
      </Button>

      {(error || loadError) && (
        <p className="text-red-600">{error || loadError}</p>
      )}
      {success && <p className="text-green-600">{success}</p>}
    </form>
  )
}
