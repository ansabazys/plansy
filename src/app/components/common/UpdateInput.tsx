"use client";

import { useProject } from "@/app/context/ProjectContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Task {}

export default function UpdateInput({
  projectId,
  id,
  data,
  action,
  type,
}: {
  projectId: string;
  id: string;
  data: Date | string;
  action: string;
  type: string;
}) {
  const { fetchData } = useProject();

  const [formData, setFormData] = useState("");

  const handleSubmit = async (e?: React.FormEvent, value?: string) => {
    if (e) e.preventDefault();

    console.log(value)
    console.log(formData)

    const result = await fetch(`/api/project/${projectId}`, {
      method: "PUT",
      body: JSON.stringify({
        formData: type == "date" ? value : formData,
        taskId: id,
        action,
      }),
    });
    fetchData();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData(e.target.value);
    if (type == "date") {
      handleSubmit(e, e.target.value);
    }
  };

  useEffect(() => {
    if (type === "date") {
      const jsDate = new Date(data);
      setFormData(jsDate.toISOString().split("T")[0]); // YYYY-MM-DD format
    } else {
      setFormData(String(data));
    }
  }, [data, type]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type={type}
        className="outline-0"
        defaultValue={formData}
        name=""
        id=""
        onChange={handleChange}
      />
    </form>
  );
}
