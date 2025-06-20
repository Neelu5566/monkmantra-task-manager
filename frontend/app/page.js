'use client'
import { useEffect, useState } from "react"
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function Home() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")

  const fetchTasks = async () => {
    const res = await fetch(`${API_URL}/tasks`);
    const data = await res.json()
    setTasks(data)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const addTask = async () => {
    if (!title.trim()) return
    await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, status: "pending" }),
    })
    setTitle("")
    fetchTasks()
  }

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" })
    fetchTasks()
  }

  const toggleStatus = async (task) => {
    await fetch(`${API_URL}/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: task.title,
        status: task.status === "done" ? "pending" : "done",
      }),
    })
    fetchTasks()
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📝 Task Manager</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="New Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={addTask}>
          Add
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between p-2 border-b ${
              task.status === "done" ? "line-through text-gray-400" : ""
            }`}
          >
            <span onClick={() => toggleStatus(task)}>{task.title}</span>
            <button className="text-red-500" onClick={() => deleteTask(task.id)}>
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
